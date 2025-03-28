import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  comments: {},
  loading: false,
  error: null
};

const commentSlice = createSlice({
  name: 'comments',
  initialState,
  reducers: {
    setComments: (state, action) => {
      const { taskId, comments } = action.payload;
      state.comments[taskId] = comments;
      state.loading = false;
      state.error = null;
    },
    addComment: (state, action) => {
      const { taskId, comment } = action.payload;
      if (!state.comments[taskId]) {
        state.comments[taskId] = [];
      }
      state.comments[taskId].push(comment);
    },
    removeComment: (state, action) => {
      const { taskId, commentId } = action.payload;
      state.comments[taskId] = state.comments[taskId].filter(
        comment => comment._id !== commentId
      );
    },
    setLoading: (state) => {
      state.loading = true;
      state.error = null;
    },
    setError: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    }
  }
});

export const { 
  setComments, 
  addComment, 
  removeComment,
  setLoading,
  setError
} = commentSlice.actions;

export default commentSlice.reducer;