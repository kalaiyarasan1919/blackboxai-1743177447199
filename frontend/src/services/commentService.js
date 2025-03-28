import api from './api';

const fetchComments = async (taskId) => {
  try {
    const response = await api.get(`/tasks/${taskId}/comments`);
    return response.data;
  } catch (err) {
    throw new Error(err.response?.data?.msg || 'Failed to fetch comments');
  }
};

const createComment = async (taskId, content, isAnonymous = false) => {
  try {
    const response = await api.post(`/tasks/${taskId}/comments`, { 
      content,
      isAnonymous 
    });
    return response.data;
  } catch (err) {
    throw new Error(err.response?.data?.msg || 'Failed to create comment');
  }
};

const deleteComment = async (commentId) => {
  try {
    await api.delete(`/comments/${commentId}`);
  } catch (err) {
    throw new Error(err.response?.data?.msg || 'Failed to delete comment');
  }
};

export { fetchComments, createComment, deleteComment };