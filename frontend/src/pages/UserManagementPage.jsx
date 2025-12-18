import { useState, useEffect } from 'react';
import Table from '../components/Table.jsx';
import Button from '../components/Button.jsx';
import { getUsers } from '../services/userService.js';

const UserManagementPage = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadUsers();
  }, []);

  const loadUsers = async () => {
    try {
      const response = await getUsers();
      setUsers(response.data.data);
    } catch (error) {
      console.error('Failed to load users', error);
    } finally {
      setLoading(false);
    }
  };

  const columns = [
    { key: 'name', label: 'Name' },
    { key: 'email', label: 'Email' },
    { key: 'isActive', label: 'Active' },
    { key: 'createdAt', label: 'Created' }
  ];

  return (
    <div className="user-management-page">
      <div className="page-header">
        <h1>User Management</h1>
        <Button>Add User</Button>
      </div>
      {loading ? (
        <div>Loading...</div>
      ) : (
        <Table data={users} columns={columns} />
      )}
    </div>
  );
};

export default UserManagementPage;