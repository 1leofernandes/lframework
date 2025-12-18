# Fluxo de Autenticação

## Visão Geral

O sistema implementa autenticação baseada em JWT com suporte a multi-tenancy e controle de acesso baseado em roles e permissões.

## Fluxo de Login

1. **Cliente** envia credenciais (email, senha) + tenant-id
2. **Backend** valida credenciais no banco
3. **Backend** gera JWT token com payload:
   ```json
   {
     "id": "user-uuid",
     "email": "user@example.com",
     "tenantId": "tenant-uuid"
   }
   ```
4. **Cliente** armazena token no localStorage
5. **Cliente** inclui token em todas as requisições subsequentes

## Middleware de Autenticação

### authenticate

- Verifica presença do token no header `Authorization: Bearer <token>`
- Decodifica e valida JWT
- Busca usuário no banco
- Anexa `req.user` à requisição

### tenantMiddleware

- Extrai `x-tenant-id` do header
- Valida existência do tenant
- Anexa `req.tenant` à requisição

### authorize

- Verifica se usuário possui roles necessárias
- Bloqueia acesso se não autorizado

## Estrutura de Dados

### User

```javascript
{
  id: String,
  email: String (unique),
  password: String (hashed),
  name: String,
  isActive: Boolean,
  tenantId: String,
  roles: UserRole[]
}
```

### Role

```javascript
{
  id: String,
  name: String,
  description: String,
  tenantId: String,
  permissions: RolePermission[]
}
```

### Permission

```javascript
{
  id: String,
  name: String (e.g., "user:create"),
  description: String,
  resource: String,
  action: String
}
```

## Endpoints de Autenticação

### POST /api/users/login

**Request:**

```json
{
  "email": "admin@example.com",
  "password": "password123"
}
```

**Response:**

```json
{
  "success": true,
  "data": {
    "user": {
      "id": "user-uuid",
      "email": "admin@example.com",
      "name": "Admin User"
    },
    "token": "jwt-token-here"
  }
}
```

## Controle de Acesso

### Roles Predefinidos

- `super_admin`: Acesso total
- `admin`: Administração do tenant
- `user`: Usuário padrão
- `cliente`: Acesso limitado ao portal cliente

### Permissões por Recurso

- `user:*`: Gerenciamento de usuários
- `role:*`: Gerenciamento de roles
- `permission:*`: Visualização de permissões
- `tenant:*`: Gerenciamento de tenants

## Segurança

- **Hash de Senha**: bcrypt com 12 rounds
- **JWT Expiration**: 7 dias
- **Rate Limiting**: 100 req/15min por IP
- **CORS**: Configurado para origens específicas
- **Headers de Segurança**: Helmet.js

## Logout

- Remoção do token do localStorage
- Redirecionamento para página de login
- Token permanece válido até expirar (não há blacklist)

## Refresh Token (Futuro)

Para implementar refresh tokens:

1. Adicionar campo `refreshToken` na tabela User
2. Endpoint `/api/auth/refresh`
3. Lógica de rotação de tokens
