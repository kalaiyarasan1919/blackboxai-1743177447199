import React from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faCircle,
  faCheckCircle,
  faExclamationCircle,
  faUser
} from '@fortawesome/free-solid-svg-icons';

const statusIcons = {
  todo: faCircle,
  in_progress: faCircle,
  review: faExclamationCircle,
  completed: faCheckCircle
};

const statusColors = {
  todo: 'text-gray-400',
  in_progress: 'text-blue-500',
  review: 'text-yellow-500',
  completed: 'text-green-500'
};

const priorityColors = {
  low: 'bg-blue-100 text-blue-800',
  medium: 'bg-yellow-100 text-yellow-800',
  high: 'bg-orange-100 text-orange-800',
  critical: 'bg-red-100 text-red-800'
};

const TaskList = ({ tasks }) => {
  if (tasks.length === 0) {
    return (
      <div className="text-center py-8 text-gray-500">
        No tasks found for this project
      </div>
    );
  }

  return (
    <div className="bg-white shadow overflow-hidden sm:rounded-md">
      <ul className="divide-y divide-gray-200">
        {tasks.map((task) => (
          <li key={task._id}>
            <Link 
              to={`/tasks/${task._id}`} 
              className="block hover:bg-gray-50"
            >
              <div className="px-4 py-4 sm:px-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <FontAwesomeIcon 
                      icon={statusIcons[task.status]} 
                      className={`${statusColors[task.status]} mr-3`} 
                    />
                    <p className="text-sm font-medium text-primary-600 truncate">
                      {task.title}
                    </p>
                  </div>
                  <div className="ml-2 flex-shrink-0 flex">
                    <p className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${priorityColors[task.priority]}`}>
                      {task.priority}
                    </p>
                  </div>
                </div>
                <div className="mt-2 sm:flex sm:justify-between">
                  <div className="sm:flex">
                    <p className="flex items-center text-sm text-gray-500">
                      {task.description || 'No description'}
                    </p>
                  </div>
                  <div className="mt-2 flex items-center text-sm text-gray-500 sm:mt-0">
                    {task.dueDate && (
                      <p>
                        Due: {new Date(task.dueDate).toLocaleDateString()}
                      </p>
                    )}
                    {task.assignedTo && (
                      <div className="ml-3 flex-shrink-0 flex">
                        <FontAwesomeIcon 
                          icon={faUser} 
                          className="h-4 w-4 text-gray-400 mr-1" 
                        />
                        <span>{task.assignedTo.name}</span>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TaskList;