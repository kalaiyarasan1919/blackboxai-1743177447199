import React from 'react';
import { useSelector } from 'react-redux';
import TaskList from '../components/TaskList';

const Tasks = () => {
  const { tasks } = useSelector(state => state.task);

  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-bold text-gray-800">All Tasks</h1>
      <div className="bg-white rounded-lg shadow p-4">
        <TaskList tasks={tasks} />
      </div>
    </div>
  );
};

export default Tasks;