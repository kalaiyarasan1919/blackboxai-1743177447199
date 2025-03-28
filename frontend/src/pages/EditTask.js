import React from 'react';
import TaskForm from '../components/TaskForm';

const EditTask = () => {
  return (
    <div>
      <TaskForm editMode={true} />
    </div>
  );
};

export default EditTask;