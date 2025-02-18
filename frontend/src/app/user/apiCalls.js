import axios from 'axios';
import { USER_STATUS } from '../../constants/constsnt';

const userFormatter = (userData) => {
  return {
    id: userData.id,
    firstName: userData.first_name,
    lastName: userData.last_name, 
    email: userData.email,
    status: userData.status?.toUpperCase() || USER_STATUS.ACTIVE,
  };
};

export const getUsers = async (filters = {}) => {
  try {
    const { status = 'all', page = 1, limit = 10 } = filters;
    let url = `/users?page=${page}&limit=${limit}`;
    
    if (status !== 'all') {
      url += `&status=${status}`;
    }

    const response = await axios.get(url);
    if (response.data?.status && response.data?.data) {
      return {
        users: response.data.data.users.map(user => userFormatter(user)),
        totalPages: response.data.data.totalPages,
        currentPage: response.data.data.currentPage,
        totalUsers: response.data.data.total
      };
    }
    return null;
  } catch (error) {
    console.error('Error fetching users:', error.response || error);
    return null;
  }
};

export const getUserById = async (id) => {
  try {
    const response = await axios.get(`/users/${id}`);
    if (response.data?.status && response.data?.data) {
      return userFormatter(response.data.data);
    }
  } catch (error) {
    console.error('Error fetching user:', error.response || error);
  }
};

export const createUser = async (user) => {
  try {
    const response = await axios.post('/users', {
      first_name: user.first_name,
      last_name: user.last_name,
      email: user.email,
      status: user.status || 'active'
    });
    
    if (response.data?.status && response.data?.data) {
      return userFormatter(response.data.data);
    }
  } catch (error) {
    console.error('Error creating user:', error.response || error);
  }
};

export const updateUser = async (id, user) => {
  try {
    const response = await axios.put(`/users/${id}`, {
      first_name: user.first_name,
      last_name: user.last_name,
      status: user.status.toLowerCase()
    });
    
    if (response.data?.status) {
      return response.data.data;
    }
    return null;
  } catch (error) {
    console.error('Error updating user:', error.response || error);
  }
};

export const deleteUser = async (id) => {
  try {
    const response = await axios.delete(`/users/${id}`);
    return response.data?.status || false;
  } catch (error) {
    console.error('Error deleting user:', error.response || error);
    return false;
  }
};
