import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/store';
import { fetchUsers, filterUsers } from '../../redux/usersSlice/userSlice';
import { useAppDispatch } from '../../hooks/useAppDispatch';

const UserTable: React.FC = () => {
  const dispatch = useAppDispatch();  // Используем кастомный хук
  const users = useSelector((state: RootState) => state.users.filteredUsers);
  const status = useSelector((state: RootState) => state.users.status);

  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchUsers());  // Теперь dispatch работает корректно
    }
  }, [status, dispatch]);

  const handleFilterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    dispatch(filterUsers({ [name]: value }));
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
