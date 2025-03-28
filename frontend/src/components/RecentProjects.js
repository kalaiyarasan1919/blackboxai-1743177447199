import React from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFolder } from '@fortawesome/free-solid-svg-icons';

const RecentProjects = ({ projects }) => {
  return (
    <div className="bg-white shadow overflow-hidden sm:rounded-lg">
      <div className="px-4 py-5 sm:px-6 border-b border-gray-200">
        <h3 className="text-lg leading-6 font-medium text-gray-900">
          Recent Projects
        </h3>
      </div>
      <ul className="divide-y divide-gray-200">
        {projects.length > 0 ? (
          projects.map((project) => (
            <li key={project._id}>
              <Link 
                to={`/projects/${project._id}`}
                className="block hover:bg-gray-50"
              >
                <div className="px-4 py-4 sm:px-6">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <FontAwesomeIcon 
                        icon={faFolder} 
                        className="h-5 w-5 text-primary-500 mr-3" 
                      />
                      <p className="text-sm font-medium text-primary-600 truncate">
                        {project.name}
                      </p>
                    </div>
                    <div className="ml-2 flex-shrink-0 flex">
                      <p className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                        {project.status.replace('_', ' ')}
                      </p>
                    </div>
                  </div>
                  <div className="mt-2 sm:flex sm:justify-between">
                    <div className="sm:flex">
                      <p className="flex items-center text-sm text-gray-500">
                        {project.description || 'No description'}
                      </p>
                    </div>
                    <div className="mt-2 flex items-center text-sm text-gray-500 sm:mt-0">
                      <p>
                        Due: {new Date(project.endDate).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                </div>
              </Link>
            </li>
          ))
        ) : (
          <li className="px-4 py-4 sm:px-6">
            <p className="text-sm text-gray-500">No projects found</p>
          </li>
        )}
      </ul>
      <div className="px-4 py-4 sm:px-6 border-t border-gray-200">
        <Link
          to="/projects"
          className="text-sm font-medium text-primary-600 hover:text-primary-500"
        >
          View all projects
        </Link>
      </div>
    </div>
  );
};

export default RecentProjects;