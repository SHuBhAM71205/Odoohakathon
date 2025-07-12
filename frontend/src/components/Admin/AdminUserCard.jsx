<<<<<<< HEAD
import React from 'react'

export default function AdminUserCard({ user, onAction }) {
  const statusColors = {
    active: 'bg-green-500',
    suspended: 'bg-red-500',
    pending: 'bg-yellow-500'
  };

  return (
    <div className="bg-gray-700 rounded-lg p-4 mx-2 mb-2 shadow-md">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
        <div className="flex items-center space-x-4 mb-4 md:mb-0">
          <div className="w-12 h-12 bg-gray-600 rounded-full flex items-center justify-center">
            <span className="text-white font-bold text-lg">{user.name.charAt(0)}</span>
          </div>
          <div>
            <h3 className="text-white font-semibold text-lg">{user.name}</h3>
            <p className="text-gray-300 text-sm">{user.email}</p>
            <div className="flex items-center space-x-2 mt-1">
              <span className={`px-2 py-1 rounded-full text-xs text-white ${statusColors[user.status]}`}>
                {user.status.charAt(0).toUpperCase() + user.status.slice(1)}
              </span>
              <span className="text-gray-400 text-xs">Joined: {user.joinDate}</span>
            </div>
          </div>
        </div>
        
        <div className="flex flex-col md:flex-row items-start md:items-center space-y-2 md:space-y-0 md:space-x-4">
          <div className="text-sm text-gray-300">
            <div>Offers: <span className="text-blue-400">{user.skillsOffered}</span></div>
            <div>Wants: <span className="text-green-400">{user.skillsWanted}</span></div>
            <div>Rating: <span className="text-yellow-400">⭐ {user.rating}</span></div>
          </div>
          
          <div className="text-sm text-gray-300">
            <div>Requests: {user.totalRequests}</div>
            <div>Completed: {user.completedSwaps}</div>
            <div>Availability: {user.availability}</div>
          </div>
          
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => onAction(user, 'view')}
              className="px-3 py-1 bg-blue-600 text-white rounded-md hover:bg-blue-700 text-sm"
            >
              View
            </button>
            {user.status === 'active' ? (
              <button
                onClick={() => onAction(user, 'suspend')}
                className="px-3 py-1 bg-red-600 text-white rounded-md hover:bg-red-700 text-sm"
              >
                Suspend
              </button>
            ) : (
              <button
                onClick={() => onAction(user, 'activate')}
                className="px-3 py-1 bg-green-600 text-white rounded-md hover:bg-green-700 text-sm"
              >
                Activate
              </button>
            )}
            <button
              onClick={() => onAction(user, 'delete')}
              className="px-3 py-1 bg-gray-600 text-white rounded-md hover:bg-gray-700 text-sm"
            >
              Delete
            </button>
          </div>
        </div>
      </div>
    </div>
  );
=======
import React from 'react'

export default function AdminUserCard({ user, onAction }) {
  const statusColors = {
    active: 'bg-green-500',
    suspended: 'bg-red-500',
    pending: 'bg-yellow-500'
  };

  return (
    <div className="bg-gray-700 rounded-lg p-4 mx-2 mb-2 shadow-md">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
        <div className="flex items-center space-x-4 mb-4 md:mb-0">
          <div className="w-12 h-12 bg-gray-600 rounded-full flex items-center justify-center">
            <span className="text-white font-bold text-lg">{user.name.charAt(0)}</span>
          </div>
          <div>
            <h3 className="text-white font-semibold text-lg">{user.name}</h3>
            <p className="text-gray-300 text-sm">{user.email}</p>
            <div className="flex items-center space-x-2 mt-1">
              <span className={`px-2 py-1 rounded-full text-xs text-white ${statusColors[user.status]}`}>
                {user.status.charAt(0).toUpperCase() + user.status.slice(1)}
              </span>
              <span className="text-gray-400 text-xs">Joined: {user.joinDate}</span>
            </div>
          </div>
        </div>
        
        <div className="flex flex-col md:flex-row items-start md:items-center space-y-2 md:space-y-0 md:space-x-4">
          <div className="text-sm text-gray-300">
            <div>Offers: <span className="text-blue-400">{user.skillsOffered}</span></div>
            <div>Wants: <span className="text-green-400">{user.skillsWanted}</span></div>
            <div>Rating: <span className="text-yellow-400">⭐ {user.rating}</span></div>
          </div>
          
          <div className="text-sm text-gray-300">
            <div>Requests: {user.totalRequests}</div>
            <div>Completed: {user.completedSwaps}</div>
            <div>Availability: {user.availability}</div>
          </div>
          
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => onAction(user, 'view')}
              className="px-3 py-1 bg-blue-600 text-white rounded-md hover:bg-blue-700 text-sm"
            >
              View
            </button>
            {user.status === 'active' ? (
              <button
                onClick={() => onAction(user, 'suspend')}
                className="px-3 py-1 bg-red-600 text-white rounded-md hover:bg-red-700 text-sm"
              >
                Suspend
              </button>
            ) : (
              <button
                onClick={() => onAction(user, 'activate')}
                className="px-3 py-1 bg-green-600 text-white rounded-md hover:bg-green-700 text-sm"
              >
                Activate
              </button>
            )}
            <button
              onClick={() => onAction(user, 'delete')}
              className="px-3 py-1 bg-gray-600 text-white rounded-md hover:bg-gray-700 text-sm"
            >
              Delete
            </button>
          </div>
        </div>
      </div>
    </div>
  );
>>>>>>> c02fd4fcf823458862d463d0bf1d1e478d28bffa
}