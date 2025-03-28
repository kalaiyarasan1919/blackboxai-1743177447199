import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { fetchProjects } from '../services/projectService';
import { setProjects } from '../store/projectSlice';
import { fetchTasks } from '../services/taskService';
import { setTasks } from '../store/taskSlice';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrash, faPlus, faUsers, faCalendarAlt } from '@fortawesome/free-solid-svg-icons';
import TaskList from '../components/TaskList';

const ProjectDetail = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { projects } = useSelector((state) => state.projects);
  const { tasks } = useSelector((state) => state.tasks);
  const { user } = useSelector((state) => state.auth);
  const [activeTab, setActiveTab] = useState('tasks');

  const project = projects.find(p => p._id === id);
  const projectTasks = tasks.filter(t => t.project === id);

  useEffect(() => {
    const loadData = async () => {
      try {
        const projectsData = await fetchProjects();
        dispatch(setProjects(projectsData));
        
        const tasksData = await fetchTasks();
        dispatch(setTasks(tasksData));
      } catch (err) {
        console.error('Failed to load project data:', err);
      }
    };
    
    if (!project || tasks.length === 0) {
      loadData();
    }
  }, [dispatch, project, tasks.length]);

  if (!project) return <div className="text-center py-8">Loading project...</div>;

  return (
    <div className="px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <div className="flex justify-between items-start">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">{project.name}</h1>
            <p className="mt-1 text-sm text-gray-500">
              Created on {new Date(project.createdAt).toLocaleDateString()}
            </p>
          </div>
          {(user.role === 'admin' || user.role === 'team_leader') && (
            <div className="flex space-x-3">
              <Link
                to={`/projects/${project._id}/edit`}
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

        <div className="mt-6 border-t border-gray-200 pt-6">
          <p className="text-gray-700">{project.description || 'No description provided'}</p>
          
          <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-3">
            <div className="flex items-center">
              <FontAwesomeIcon icon={faUsers} className="text-gray-400 mr-2" />
              <span className="text-sm text-gray-500">
                {project.teamMembers.length} team members
              </span>
            </div>
            <div className="flex items-center">
              <FontAwesomeIcon icon={faCalendarAlt} className="text-gray-400 mr-2" />
              <span className="text-sm text-gray-500">
                {project.endDate 
                  ? `Due ${new Date(project.endDate).toLocaleDateString()}` 
                  : 'No due date'}
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className="border-b border-gray-200">
        <nav className="-mb-px flex space-x-8">
          <button
            onClick={() => setActiveTab('tasks')}
            className={`${activeTab === 'tasks' ? 'border-primary-500 text-primary-600' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'} whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm`}
          >
            Tasks
          </button>
          <button
            onClick={() => setActiveTab('team')}
            className={`${activeTab === 'team' ? 'border-primary-500 text-primary-600' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'} whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm`}
          >
            Team
          </button>
          <button
            onClick={() => setActiveTab('files')}
            className={`${activeTab === 'files' ? 'border-primary-500 text-primary-600' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'} whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm`}
          >
            Files
          </button>
        </nav>
      </div>

      <div className="mt-6">
        {activeTab === 'tasks' && (
          <div>
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-medium text-gray-900">Tasks</h2>
              <Link
                to={`/projects/${project._id}/tasks/new`}
                className="btn-primary inline-flex items-center px-3 py-1.5"
              >
                <FontAwesomeIcon icon={faPlus} className="mr-2" />
                Add Task
              </Link>
            </div>
            <TaskList tasks={projectTasks} />
          </div>
        )}

        {activeTab === 'team' && (
          <div>
            <h2 className="text-lg font-medium text-gray-900 mb-4">Team Members</h2>
            {/* Team member list will be implemented here */}
          </div>
        )}

        {activeTab === 'files' && (
          <div>
            <h2 className="text-lg font-medium text-gray-900 mb-4">Files</h2>
            {/* File list will be implemented here */}
          </div>
        )}
      </div>
    </div>
  );
};

export default ProjectDetail;