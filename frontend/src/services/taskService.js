import api from './api';

const fetchTasks = async () => {
  try {
    const response = await api.get('/tasks');
    return response.data;
  } catch (err) {
    throw new Error(err.response?.data?.msg || 'Failed to fetch tasks');
  }
};

const createTask = async (taskData) => {
  try {
    const response = await api.post('/tasks', taskData);
    return response.data;
  } catch (err) {
    throw new Error(err.response?.data?.msg || 'Failed to create task');
  }
};

const updateTask = async (id, taskData) => {
  try {
    const response = await api.put(`/tasks/${id}`, taskData);
    return response.data;
  } catch (err) {
    throw new Error(err.response?.data?.msg || 'Failed to update task');
  }
};

const deleteTask = async (id) => {
  try {
    await api.delete(`/tasks/${id}`);
  } catch (err) {
    throw new Error(err.response?.data?.msg || 'Failed to delete task');
  }
};

export { fetchTasks, createTask, updateTask, deleteTask };