# Guia de Deploy

## Pré-requisitos

- Node.js 18+
- PostgreSQL 13+
- Docker (opcional)
- PM2 (produção)

## Configuração do Ambiente

### 1. Banco de Dados

```bash
# Criar banco PostgreSQL
createdb ls_framework_prod

# Configurar variáveis de ambiente
cp backend/.env.example backend/.env
# Editar DATABASE_URL com credenciais de produção
```

### 2. Build do Frontend

```bash
cd frontend
npm run build
# Arquivos de produção em dist/
```

### 3. Build do Backend

```bash
cd backend
npm run generate  # Gerar Prisma client
npm run migrate   # Aplicar migrações
```

## Opções de Deploy

### Docker (Recomendado)

#### Dockerfile Backend

```dockerfile
FROM node:18-alpine

WORKDIR /app

COPY package*.json ./
RUN npm ci --only=production

COPY . .

RUN npm run generate

EXPOSE 3000

CMD ["npm", "start"]
```

#### Docker Compose

```yaml
version: "3.8"

services:
  db:
    image: postgres:13
    environment:
      POSTGRES_DB: ls_framework
      POSTGRES_USER: user
      POSTGRES_PASSWORD: password
    volumes:
      - postgres_data:/var/lib/postgresql/data

  backend:
    build: ./backend
    ports:
      - "3000:3000"
    environment:
      - DATABASE_URL=postgresql://user:password@db:5432/ls_framework
      - NODE_ENV=production
    depends_on:
      - db

  frontend:
    build: ./frontend
    ports:
      - "80:80"
```

### PM2 (Servidor Tradicional)

#### Instalação

```bash
npm install -g pm2
```

#### Configuração PM2

```json
// ecosystem.config.js
module.exports = {
  apps: [{
    name: 'ls-framework-backend',
    script: 'backend/src/server.js',
    instances: 'max',
    exec_mode: 'cluster',
    env: {
      NODE_ENV: 'production',
      PORT: 3000
    }
  }]
};
```

#### Comandos PM2

```bash
pm2 start ecosystem.config.js
pm2 restart ls-framework-backend
pm2 logs ls-framework-backend
pm2 monit
```

### Nginx (Reverse Proxy)

```nginx
server {
    listen 80;
    server_name your-domain.com;

    # Frontend
    location / {
        root /path/to/frontend/dist;
        try_files $uri $uri/ /index.html;
    }

    # Backend API
    location /api {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_cache_bypass $http_upgrade;
    }
}
```

## Variáveis de Ambiente Produção

```env
NODE_ENV=production
PORT=3000
DATABASE_URL=postgresql://user:password@host:5432/dbname
JWT_SECRET=your-super-secure-jwt-secret-here
JWT_EXPIRES_IN=7d
BCRYPT_ROUNDS=12
CORS_ORIGIN=https://your-domain.com
```

## Checklist de Deploy

- [ ] Banco de dados configurado e acessível
- [ ] Variáveis de ambiente definidas
- [ ] Frontend buildado
- [ ] Backend dependencies instaladas
- [ ] Prisma client gerado
- [ ] Migrações aplicadas
- [ ] Seed data executada (se necessário)
- [ ] Servidor iniciado
- [ ] Reverse proxy configurado
- [ ] SSL configurado
- [ ] Logs monitorados
- [ ] Backup automático configurado

## Monitoramento

### Logs

```bash
# Backend logs
pm2 logs ls-framework-backend

# Nginx logs
tail -f /var/log/nginx/access.log
tail -f /var/log/nginx/error.log
```

### Health Checks

```bash
# Health endpoint
curl http://localhost:3000/health

# Database connection
curl http://localhost:3000/api/health/db
```

### Métricas

- PM2 monit para CPU/Memory
- Nginx access logs para requests
- Database monitoring (pg_stat_statements)

## Rollback

```bash
# Parar aplicação
pm2 stop ls-framework-backend

# Reverter código
git checkout previous-commit

# Reinstalar dependências
npm install

# Reiniciar
pm2 restart ls-framework-backend
```

## Segurança em Produção

- [ ] Firewall configurado
- [ ] SSL/TLS habilitado
- [ ] Headers de segurança ativos
- [ ] Rate limiting ativo
- [ ] Database credentials seguros
- [ ] JWT secret forte
- [ ] Logs não expõem dados sensíveis
- [ ] Backups automáticos
- [ ] Failover configurado (se aplicável)
