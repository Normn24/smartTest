import React, { useEffect, useState } from 'react';
import { fetchUsers, filterUsers } from '../../redux/usersSlice/userSlice';
import { useAppDispatch, useAppSelector } from '../../hooks/useAppDispatch';
import {
  TextField,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Container,
  Box,
  Typography,
} from '@mui/material';

function UsersTable() {
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
    <Container>
      <Box sx={{ display: 'flex', gap: 2, margin: "24px 0" }}>
        <TextField
          name="name"
          label="Filter by Name"
          variant="outlined"
          fullWidth
          onChange={handleFilterChange}
        />
        <TextField
          name="username"
          label="Filter by Username"
          variant="outlined"
          fullWidth
          onChange={handleFilterChange}
        />
        <TextField
          name="email"
          label="Filter by Email"
          variant="outlined"
          fullWidth
          onChange={handleFilterChange}
        />
        <TextField
          name="phone"
          label="Filter by Phone"
          variant="outlined"
          fullWidth
          onChange={handleFilterChange}
        />
      </Box>
      <TableContainer component={Paper} elevation={6}>
        <Table >
          <TableHead>
            <TableRow sx={{bgcolor: "#000"}}>
              <TableCell sx={{ width: "200px", color: "#ffff", fontWeight: 700}}>Name</TableCell>
              <TableCell sx={{ width: "200px", color: "#ffff", fontWeight: 700}}>Username</TableCell>
              <TableCell sx={{ width: "200px", color: "#ffff", fontWeight: 700}}>Email</TableCell>
              <TableCell sx={{ width: "200px", color: "#ffff", fontWeight: 700}}>Phone</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>

            {users.length ? 
              users.map((user) => (
                <TableRow key={user.id}>
                  <TableCell>{user.name}</TableCell>
                  <TableCell>{user.username}</TableCell>
                  <TableCell>{user.email}</TableCell>
                  <TableCell>{user.phone}</TableCell>
                </TableRow>
              )) : 
              <TableRow >
                <TableCell colSpan={4}> 
                  <Typography sx={{ textAlign: "center" }} component="p">
                    OOPS, THERE`S NOTHING TO SHOW HERE
                    <br />
                    There are 0 items which will match the filters you have applied above
                  </Typography>
                </TableCell>
              </TableRow>
            }

          </TableBody>
        </Table>
      </TableContainer>
    </Container>
  );
};

export default UsersTable;
