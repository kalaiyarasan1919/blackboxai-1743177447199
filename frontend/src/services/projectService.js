import api from './api';

const fetchProjects = async () => {
  try {
    const response = await api.get('/projects');
    return response.data;
  } catch (err) {
    throw new Error(err.response?.data?.msg || 'Failed to fetch projects');
  }
};

const createProject = async (projectData) => {
  try {
    const response = await api.post('/projects', projectData);
    return response.data;
  } catch (err) {
    throw new Error(err.response?.data?.msg || 'Failed to create project');
  }
};

const updateProject = async (id, projectData) => {
  try {
    const response = await api.put(`/projects/${id}`, projectData);
    return response.data;
  } catch (err) {
    throw new Error(err.response?.data?.msg || 'Failed to update project');
  }
};

const deleteProject = async (id) => {
  try {
    await api.delete(`/projects/${id}`);
  } catch (err) {
    throw new Error(err.response?.data?.msg || 'Failed to delete project');
  }
};

export { fetchProjects, createProject, updateProject, deleteProject };