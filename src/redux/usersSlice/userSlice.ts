import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

interface User {
  id: number;
  name: string;
  username: string;
  email: string;
  phone: string;
}

interface UsersState {
  users: User[];
  filteredUsers: User[];
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
}

const initialState: UsersState = {
  users: [],
  filteredUsers: [],
  status: 'idle',
  error: null,
};

export const fetchUsers = createAsyncThunk('users/fetchUsers', async () => {
  const response = await axios.get('https://jsonplaceholder.typicode.com/users');
  return response.data;
});

const userSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    filterUsers: (state, action) => {
      const { name = '', username = '', email = '', phone = '' } = action.payload;
      return {
        ...state,
        filteredUsers: [...state.users].filter(user =>
          user.name.toLowerCase().includes(name.toLowerCase()) &&
          user.username.toLowerCase().includes(username.toLowerCase()) &&
          user.email.toLowerCase().includes(email.toLowerCase()) &&
          user.phone.includes(phone)
        )
     };
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUsers.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.users = action.payload;
        state.filteredUsers = action.payload;
      })
      .addCase(fetchUsers.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message!;
      });
  },
});

export const { filterUsers } = userSlice.actions;

export default userSlice.reducer;