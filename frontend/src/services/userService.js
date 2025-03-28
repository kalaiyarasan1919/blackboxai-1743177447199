import api from './api';

const fetchUsers = async () => {
  try {
    const response = await api.get('/users');
    return response.data;
  } catch (err) {
    throw new Error(err.response?.data?.msg || 'Failed to fetch users');
  }
};

export { fetchUsers };