import { configureStore } from '@reduxjs/toolkit';
import authReducer from './authSlice';
import projectReducer from './projectSlice';
import taskReducer from './taskSlice';

export default configureStore({
  reducer: {
    auth: authReducer,
    projects: projectReducer,
    tasks: taskReducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false
    })
});