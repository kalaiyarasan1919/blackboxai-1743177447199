import api from './api';

const loginUser = async (credentials) => {
  try {
    const response = await api.post('/auth/login', credentials);
    return {
      user: response.data.user,
      token: response.data.token
    };
  } catch (err) {
    throw new Error(err.response?.data?.msg || 'Login failed');
  }
};

const registerUser = async (userData) => {
  try {
    const response = await api.post('/auth/register', userData);
    return {
      user: response.data.user,
      token: response.data.token
    };
  } catch (err) {
    throw new Error(err.response?.data?.msg || 'Registration failed');
  }
};

const logoutUser = async () => {
  // Add any logout logic if needed (token invalidation, etc.)
  return Promise.resolve();
};

export { loginUser, registerUser, logoutUser };
