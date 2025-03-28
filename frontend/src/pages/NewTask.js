import React from 'react';
import TaskForm from '../components/TaskForm';

const NewTask = () => {
  return (
    <div>
      <TaskForm editMode={false} />
    </div>
  );
};

export default NewTask;