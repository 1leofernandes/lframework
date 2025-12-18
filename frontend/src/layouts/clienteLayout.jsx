import { Outlet } from 'react-router-dom';

const ClienteLayout = () => {
  return (
    <div className="cliente-layout">
      <header className="cliente-header">
        <h1>Cliente Portal</h1>
      </header>
      <main className="cliente-content">
        <Outlet />
      </main>
    </div>
  );
};

export default ClienteLayout;
