# Arquitetura do LS Framework

## Visão Geral

O LS Framework é uma estrutura completa para desenvolvimento rápido de aplicações web, implementando os padrões mais eficientes para sistemas empresariais.

## Estrutura do Projeto

```
ls-framework/
├── backend/          # API REST com Node.js + Express + Prisma
├── frontend/         # SPA com React + Vite
├── shared/           # Constantes e utilitários compartilhados
├── docs/            # Documentação
├── scripts/         # Scripts de automação
└── infra/           # Infraestrutura (Docker, etc.)
```

## Backend

### Tecnologias

- **Node.js** com **Express.js** para API REST
- **Prisma ORM** para banco de dados PostgreSQL
- **JWT** para autenticação
- **bcrypt** para hash de senhas
- **Joi** para validação
- **CORS**, **Helmet**, **Rate Limiting** para segurança

### Padrões Implementados

- **Arquitetura em Camadas**: Controller → Service → Repository
- **CRUD Genérico**: Base classes para operações comuns
- **Multi-tenancy**: Isolamento por tenant
- **RBAC**: Controle de acesso baseado em roles e permissões
- **Middleware Pattern**: Autenticação, autorização, tenant
- **Error Handling**: Tratamento padronizado de erros
- **Logging**: Logs estruturados
- **Soft Delete**: Exclusão lógica

### Estrutura de Módulos

Cada módulo segue o padrão:

```
modules/
└── [module]/
    ├── [module]Controller.js    # HTTP handlers
    ├── [module]Service.js       # Business logic
    ├── [module]Repository.js    # Data access (via BaseRepository)
    ├── [module]Validation.js    # Input validation
    └── [module]Routes.js        # Express routes
```

## Frontend

### Tecnologias

- **React** com **React Router** para SPA
- **Axios** para chamadas HTTP
- **React Hook Form** para formulários
- **Yup** para validação
- **CSS Modules** para estilos

### Padrões Implementados

- **Component-Based Architecture**: Reutilização máxima
- **Layout System**: Diferentes layouts por contexto
- **Service Layer**: Abstração de API
- **State Management**: Local state com hooks
- **Responsive Design**: Mobile-first

## Multi-tenancy

O framework suporta multi-tenancy através de:

- Header `x-tenant-id` para identificar o tenant
- Filtros automáticos em queries
- Isolamento de dados por tenant
- Configuração flexível

## Segurança

- Autenticação JWT
- Autorização baseada em roles/permissões
- Rate limiting
- CORS configurado
- Headers de segurança (Helmet)
- Sanitização de inputs
- Logs de auditoria

## Desenvolvimento

### Scripts Disponíveis

- `npm run dev:backend` - Inicia backend em modo dev
- `npm run dev:frontend` - Inicia frontend em modo dev
- `npm run build:frontend` - Build de produção
- `npm run generate` - Gera cliente Prisma
- `npm run migrate` - Aplica migrações do banco

### Geração de Módulos

Use o script `scripts/generate-module.sh` para criar novos módulos CRUD automaticamente.

### Criação de Projetos

Use `scripts/create-project.sh` para criar novos projetos baseados no framework.
