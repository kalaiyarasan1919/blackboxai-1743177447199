import React, { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { fetchTasks } from '../services/taskService';
import { setTasks } from '../store/taskSlice';
import { fetchComments } from '../services/commentService';
import { setComments } from '../store/commentSlice';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrash, faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import CommentList from '../components/CommentList';

const TaskDetail = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { tasks } = useSelector((state) => state.tasks);
  const { user } = useSelector((state) => state.auth);
  const task = tasks.find(t => t._id === id);

  useEffect(() => {
    const loadData = async () => {
      try {
        const tasksData = await fetchTasks();
        dispatch(setTasks(tasksData));
        
        const commentsData = await fetchComments(id);
        dispatch(setComments({ taskId: id, comments: commentsData }));
      } catch (err) {
        console.error('Failed to load task data:', err);
      }
    };

    if (!task) {
      loadData();
    } else {
      fetchComments(id).then(comments => {
        dispatch(setComments({ taskId: id, comments }));
      });
    }
  }, [dispatch, id, task]);

  if (!task) return <div className="text-center py-8">Loading task...</div>;

  return (
    <div className="px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-6">
        <Link 
          to={task.project ? `/projects/${task.project}` : '/tasks'} 
          className="inline-flex items-center text-primary-600 hover:text-primary-800"
        >
          <FontAwesomeIcon icon={faArrowLeft} className="mr-2" />
          Back to {task.project ? 'Project' : 'Tasks'}
        </Link>
      </div>

      <div className="bg-white shadow overflow-hidden sm:rounded-lg">
        <div className="px-4 py-5 sm:px-6 border-b border-gray-200">
          <div className="flex justify-between items-start">
            <div>
              <h1 className="text-xl font-bold text-gray-900">{task.title}</h1>
              <p className="mt-1 text-sm text-gray-500">
                Created on {new Date(task.createdAt).toLocaleDateString()}
              </p>
            </div>
            {(user._id === task.createdBy._id || user.role === 'admin') && (
              <div className="flex space-x-3">
                <Link
                  to={`/tasks/${task._id}/edit`}
                  className="btn-secondary inline-flex items-center px-3 py-1.5"
                >
                  <FontAwesomeIcon icon={faEdit} className="mr-2" />
                  Edit
                </Link>
                <button
                  className="inline-flex items-center px-3 py-1.5 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-red-600 hover:bg-red-700"
                >
                  <FontAwesomeIcon icon={faTrash} className="mr-2" />
                  Delete
                </button>
              </div>
            )}
          </div>
        </div>

        <div className="px-4 py-5 sm:p-6">
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
            <div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">Details</h3>
              <p className="text-gray-700">{task.description || 'No description provided'}</p>
            </div>

            <div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">Task Information</h3>
              <div className="space-y-2">
                <p>
                  <span className="font-medium">Status:</span> 
                  <span className={`ml-2 px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                    task.status === 'completed' 
                      ? 'bg-green-100 text-green-800' 
                      : task.status === 'in_progress' 
                        ? 'bg-blue-100 text-blue-800' 
                        : 'bg-yellow-100 text-yellow-800'
                  }`}>
                    {task.status.replace('_', ' ')}
                  </span>
                </p>
                <p>
                  <span className="font-medium">Priority:</span> 
                  <span className={`ml-2 px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                    task.priority === 'high' 
                      ? 'bg-orange-100 text-orange-800' 
                      : task.priority === 'critical' 
                        ? 'bg-red-100 text-red-800' 
                        : task.priority === 'low'
                          ? 'bg-blue-100 text-blue-800'
                          : 'bg-yellow-100 text-yellow-800'
                  }`}>
                    {task.priority}
                  </span>
                </p>
                {task.assignedTo && (
                  <p>
                    <span className="font-medium">Assigned To:</span> 
                    <span className="ml-2">{task.assignedTo.name}</span>
                  </p>
                )}
                {task.dueDate && (
                  <p>
                    <span className="font-medium">Due Date:</span> 
                    <span className="ml-2">{new Date(task.dueDate).toLocaleDateString()}</span>
                  </p>
                )}
              </div>
            </div>
          </div>

          <CommentList taskId={task._id} />
        </div>
      </div>
    </div>
  );
};

export default TaskDetail;