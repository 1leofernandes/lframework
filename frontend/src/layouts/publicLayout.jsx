import { Outlet } from 'react-router-dom';

const PublicLayout = () => {
  return (
    <div className="public-layout">
      <header className="public-header">
        <h1>LS Framework</h1>
        <nav>
          <a href="/auth/login">Login</a>
        </nav>
      </header>
      <main className="public-content">
        <Outlet />
      </main>
    </div>
  );
};

export default PublicLayout;
