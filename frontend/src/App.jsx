import { Routes, Route } from 'react-router-dom';
import AuthLayout from './layouts/AuthLayout.jsx';
import AdminLayout from './layouts/AdminLayout.jsx';
import PublicLayout from './layouts/PublicLayout.jsx';
import ClienteLayout from './layouts/ClienteLayout.jsx';
import LoginPage from './pages/LoginPage.jsx';
import DashboardPage from './pages/DashboardPage.jsx';
import UserManagementPage from './pages/UserManagementPage.jsx';

function App() {
  return (
    <Routes>
      <Route path="/" element={<PublicLayout />}>
        <Route index element={<div>Welcome to LS Framework</div>} />
      </Route>

      <Route path="/auth" element={<AuthLayout />}>
        <Route path="login" element={<LoginPage />} />
      </Route>

      <Route path="/admin" element={<AdminLayout />}>
        <Route index element={<DashboardPage />} />
        <Route path="users" element={<UserManagementPage />} />
      </Route>

      <Route path="/cliente" element={<ClienteLayout />}>
        <Route index element={<div>Cliente Dashboard</div>} />
      </Route>
    </Routes>
  );
}

export default App;