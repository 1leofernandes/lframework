# Convenções do LS Framework

## Nomenclatura

### Arquivos

- **PascalCase** para classes: `UserController.js`, `AuthService.js`
- **camelCase** para funções e variáveis: `getUserById`, `userRepository`
- **kebab-case** para nomes de módulos/pastas: `user-management`, `auth-flow`

### Banco de Dados

- **snake_case** para tabelas: `user_roles`, `role_permissions`
- **camelCase** para campos: `createdAt`, `isActive`
- **Foreign keys**: `tenantId`, `userId`

### API Endpoints

- **Plural** para recursos: `/api/users`, `/api/roles`
- **HTTP Methods** padrão:
  - `GET /resource` - Listar
  - `GET /resource/:id` - Obter por ID
  - `POST /resource` - Criar
  - `PUT /resource/:id` - Atualizar
  - `DELETE /resource/:id` - Deletar

## Estrutura de Código

### Backend

#### Controllers

```javascript
class UserController extends BaseController {
  constructor() {
    const service = new UserService();
    super(service);
  }

  // Custom methods only
  async login(req, res, next) {
    // Implementation
  }
}
```

#### Services

```javascript
class UserService extends BaseService {
  constructor() {
    const repository = new BaseRepository("User");
    const validation = new BaseValidation(userValidation);
    super(repository, validation);
  }

  // Business logic methods
  async login(email, password, tenant) {
    // Implementation
  }
}
```

#### Repositories

- Usar apenas BaseRepository para operações CRUD
- Custom queries apenas quando necessário

#### Validation

```javascript
const userValidation = {
  create: Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().min(6).required(),
    name: Joi.string().min(2).required(),
  }),
  update: Joi.object({
    name: Joi.string().min(2),
    isActive: Joi.boolean(),
  }),
};
```

### Frontend

#### Components

```jsx
const UserForm = ({ user, onSubmit }) => {
  const [formData, setFormData] = useState(user || {});

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return <form onSubmit={handleSubmit}>{/* Form fields */}</form>;
};
```

#### Services

```javascript
export const getUsers = async (params = {}) => {
  const response = await api.get("/users", { params });
  return response.data;
};
```

#### Pages

- Uma página por arquivo
- Usar layouts apropriados
- Manter lógica mínima, delegar para hooks/services

## Padrões de Commit

```
feat: add user authentication
fix: resolve login validation bug
docs: update API documentation
style: format code with prettier
refactor: simplify user service logic
test: add unit tests for user controller
chore: update dependencies
```

## Tratamento de Erros

### Backend

- Usar classes de erro específicas: `NotFoundError`, `ValidationError`, `AuthError`
- Middleware global de erro para formatação consistente
- Logs estruturados com contexto

### Frontend

- Try/catch em todas as chamadas assíncronas
- Exibir mensagens de erro amigáveis
- Loading states para UX

## Testes

### Backend

- **Jest** para testes unitários
- **Supertest** para testes de API
- Cobertura mínima de 80%
- Testes para services e controllers

### Frontend

- **Jest** + **React Testing Library**
- Testes para componentes e hooks
- Mock de API calls

## Performance

- **Lazy loading** para rotas do frontend
- **Pagination** obrigatória para listagens
- **Database indexes** para queries frequentes
- **Caching** quando apropriado
- **Bundle splitting** para reduzir tamanho inicial

## Segurança

- **Input validation** em todas as entradas
- **SQL injection prevention** via ORM
- **XSS prevention** via sanitização
- **CSRF protection** quando necessário
- **Rate limiting** ativo
- **Logs de auditoria** para ações sensíveis

## Documentação

- **README.md** em português para projetos brasileiros
- **JSDoc** para funções complexas
- **API documentation** com exemplos
- **Architecture docs** atualizados
- **Changelogs** para releases
