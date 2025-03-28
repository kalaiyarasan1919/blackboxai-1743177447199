import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';
import { 
  faFolder, 
  faCheckCircle, 
  faSyncAlt, 
  faExclamation 
} from '@fortawesome/free-solid-svg-icons';

library.add(faFolder, faCheckCircle, faSyncAlt, faExclamation);

const StatsCard = ({ title, value, icon, color }) => {
  const colorClasses = {
    primary: 'bg-primary-100 text-primary-600',
    green: 'bg-green-100 text-green-600',
    yellow: 'bg-yellow-100 text-yellow-600',
    red: 'bg-red-100 text-red-600'
  };

  const iconMap = {
    folder: faFolder,
    'check-circle': faCheckCircle,
    refresh: faSyncAlt,
    exclamation: faExclamation
  };

  return (
    <div className="bg-white overflow-hidden shadow rounded-lg">
      <div className="p-5">
        <div className="flex items-center">
          <div className={`flex-shrink-0 h-12 w-12 rounded-full ${colorClasses[color]} flex items-center justify-center`}>
            <FontAwesomeIcon icon={iconMap[icon]} className="h-5 w-5" />
          </div>
          <div className="ml-5 w-0 flex-1">
            <dl>
              <dt className="text-sm font-medium text-gray-500 truncate">
                {title}
              </dt>
              <dd>
                <div className="text-lg font-medium text-gray-900">
                  {value}
                </div>
              </dd>
            </dl>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StatsCard;