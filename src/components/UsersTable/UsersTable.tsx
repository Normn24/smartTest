import React, { useEffect, useState } from 'react';
import { fetchUsers, filterUsers } from '../../redux/usersSlice/userSlice';
import { useAppDispatch, useAppSelector } from '../../hooks/useAppDispatch';

function UserTable() {
  const dispatch = useAppDispatch();  
  const users = useAppSelector((state) => state.users.filteredUsers);
  const status = useAppSelector((state) => state.users.status);

  const [filters, setFilters] = useState({
    name: '',
    username: '',
    email: '',
    phone: '',
  });

  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchUsers());  
    }
  }, [status, dispatch]);

  useEffect(() => {
    dispatch(filterUsers(filters));
  }, [filters, dispatch]);

  const handleFilterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFilters({
      ...filters,
      [name]: value,
    });
  };

  return (
    <div>
      <h1>User Management Table</h1>
      <div>
        <input name="name" placeholder="Filter by Name" onChange={handleFilterChange} />
        <input name="username" placeholder="Filter by Username" onChange={handleFilterChange} />
        <input name="email" placeholder="Filter by Email" onChange={handleFilterChange} />
        <input name="phone" placeholder="Filter by Phone" onChange={handleFilterChange} />
      </div>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Username</th>
            <th>Email</th>
            <th>Phone</th>
          </tr>
        </thead>
        <tbody>
          {users.map(user => (
            <tr key={user.id}>
              <td>{user.name}</td>
              <td>{user.username}</td>
              <td>{user.email}</td>
              <td>{user.phone}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UserTable;
