import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  projects: [],
  loading: false,
  error: null
};

const projectSlice = createSlice({
  name: 'projects',
  initialState,
  reducers: {
    setProjects: (state, action) => {
      state.projects = action.payload;
      state.loading = false;
      state.error = null;
    },
    addProject: (state, action) => {
      state.projects.push(action.payload);
    },
    updateProject: (state, action) => {
      const index = state.projects.findIndex(p => p._id === action.payload._id);
      if (index !== -1) {
        state.projects[index] = action.payload;
      }
    },
    removeProject: (state, action) => {
      state.projects = state.projects.filter(p => p._id !== action.payload);
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
  setProjects, 
  addProject, 
  updateProject, 
  removeProject,
  setLoading,
  setError
} = projectSlice.actions;

export default projectSlice.reducer;