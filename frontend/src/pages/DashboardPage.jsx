const DashboardPage = () => {
  return (
    <div className="dashboard-page">
      <h1>Admin Dashboard</h1>
      <div className="dashboard-stats">
        <div className="stat-card">
          <h3>Total Users</h3>
          <p>0</p>
        </div>
        <div className="stat-card">
          <h3>Active Sessions</h3>
          <p>0</p>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;