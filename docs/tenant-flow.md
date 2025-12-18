# Fluxo Multi-tenant

## Visão Geral

O LS Framework implementa multi-tenancy para isolamento completo de dados entre diferentes organizações/clientes.

## Arquitetura

### Database Level

- **Shared Database, Separate Schemas**: Cada tenant tem seu próprio schema
- **Row Level Security**: Políticas RLS no PostgreSQL
- **Tenant Context**: Middleware injeta contexto do tenant

### Application Level

- **Tenant Middleware**: Identifica tenant por header
- **Scoped Queries**: Todas as queries filtram por tenant
- **Shared Resources**: Alguns dados são globais (permissions)

## Fluxo de Requisições

1. **Cliente** envia `x-tenant-id` no header
2. **Middleware** valida tenant e injeta `req.tenant`
3. **Services** aplicam filtro `tenantId` automaticamente
4. **Database** retorna apenas dados do tenant

## Estrutura de Dados

### Tenant (Global)

```javascript
{
  id: String,        // UUID
  name: String,      // Nome da organização
  domain: String,    // Domínio único
  createdAt: Date,
  updatedAt: Date
}
```

### Dados Isolados por Tenant

- Users
- Roles
- Audit Logs
- Custom entities

### Dados Globais

- Permissions (catálogo fixo)
- System settings

## Middleware Tenant

```javascript
const tenantMiddleware = async (req, res, next) => {
  const tenantId = req.headers["x-tenant-id"];

  if (!tenantId) {
    return next(new Error("Tenant not specified"));
  }

  const tenant = await prisma.tenant.findUnique({
    where: { id: tenantId },
  });

  if (!tenant) {
    return next(new Error("Tenant not found"));
  }

  req.tenant = tenant;
  next();
};
```

## Base Repository com Tenant

```javascript
class BaseRepository {
  async getAll(filters = {}, pagination, tenant) {
    const where = { ...filters };

    // Aplicar filtro de tenant se não for tabela global
    if (tenant && this.modelName !== "Tenant") {
      where.tenantId = tenant.id;
    }

    return await this.model.findMany({
      where,
      skip: pagination.skip,
      take: pagination.limit,
    });
  }
}
```

## Frontend Multi-tenant

### Seleção de Tenant

```jsx
const TenantSelector = () => {
  const [tenants, setTenants] = useState([]);

  useEffect(() => {
    // Buscar tenants disponíveis para o usuário
    const fetchTenants = async () => {
      const response = await api.get("/tenants");
      setTenants(response.data.data);
    };
    fetchTenants();
  }, []);

  const selectTenant = (tenantId) => {
    localStorage.setItem("tenantId", tenantId);
    window.location.reload(); // Recarregar com novo tenant
  };

  return (
    <select onChange={(e) => selectTenant(e.target.value)}>
      {tenants.map((tenant) => (
        <option key={tenant.id} value={tenant.id}>
          {tenant.name}
        </option>
      ))}
    </select>
  );
};
```

### API Client com Tenant

```javascript
// Interceptor adiciona tenant automaticamente
api.interceptors.request.use((config) => {
  const tenantId = localStorage.getItem("tenantId");
  if (tenantId) {
    config.headers["x-tenant-id"] = tenantId;
  }
  return config;
});
```

## Gerenciamento de Tenants

### Criação de Tenant

```javascript
POST /api/tenants
{
  "name": "Empresa ABC",
  "domain": "abc.com"
}
```

### Usuários por Tenant

- Super admin pode criar tenants
- Admin do tenant gerencia usuários locais
- Usuários são scoped ao tenant

## Migrações Multi-tenant

### Estratégia

1. **Schema Migration**: Aplicar mudanças em todos os schemas
2. **Data Migration**: Migrar dados por tenant
3. **Validation**: Verificar integridade por tenant

### Script de Migração

```javascript
const migrateTenants = async () => {
  const tenants = await prisma.tenant.findMany();

  for (const tenant of tenants) {
    // Aplicar migração específica do tenant
    await prisma.$executeRaw`
      SET search_path TO tenant_${tenant.id};
      -- Migration SQL here
    `;
  }
};
```

## Segurança Multi-tenant

### Isolamento

- **Database Level**: RLS policies
- **Application Level**: Filtros obrigatórios
- **API Level**: Tenant validation

### Prevenção de Bypass

- Middleware sempre ativo em rotas protegidas
- Validação de ownership em updates
- Logs de auditoria por tenant

## Performance

### Otimizações

- **Connection Pooling** por tenant
- **Query Caching** scoped por tenant
- **Indexes** em tenantId
- **Partitioning** para tabelas grandes

### Monitoramento

- Queries por tenant
- Uso de recursos por tenant
- Performance por tenant

## Limitações

- **Complexidade**: Maior complexidade arquitetural
- **Performance**: Overhead em queries
- **Migrações**: Mais complexas
- **Debugging**: Contexto adicional necessário

## Alternativas

### Single Tenant por Database

- Isolamento completo
- Backup/restauração mais simples
- Performance consistente
- Custos de infraestrutura maiores

### Row Level Security (Atual)

- Compartilhamento de recursos
- Custos menores
- Consultas mais complexas
- Risco de vazamento de dados
