function UserDetailsModal({ user, onClose, onAction }) {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-gray-800 rounded-lg p-6 max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold text-white">User Details</h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-white text-2xl"
          >
            ×
          </button>
        </div>
        
        <div className="space-y-4">
          <div className="flex items-center space-x-4">
            <div className="w-16 h-16 bg-gray-600 rounded-full flex items-center justify-center">
              <span className="text-white font-bold text-2xl">{user.name.charAt(0)}</span>
            </div>
            <div>
              <h3 className="text-white font-semibold text-xl">{user.name}</h3>
              <p className="text-gray-300">{user.email}</p>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-gray-700 p-4 rounded-lg">
              <h4 className="text-white font-semibold mb-2">Account Information</h4>
              <div className="space-y-2 text-sm">
                <div><span className="text-gray-400">Status:</span> <span className="text-white">{user.status}</span></div>
                <div><span className="text-gray-400">Join Date:</span> <span className="text-white">{user.joinDate}</span></div>
                <div><span className="text-gray-400">Availability:</span> <span className="text-white">{user.availability}</span></div>
                <div><span className="text-gray-400">Rating:</span> <span className="text-white">⭐ {user.rating}</span></div>
              </div>
            </div>
            
            <div className="bg-gray-700 p-4 rounded-lg">
              <h4 className="text-white font-semibold mb-2">Activity</h4>
              <div className="space-y-2 text-sm">
                <div><span className="text-gray-400">Total Requests:</span> <span className="text-white">{user.totalRequests}</span></div>
                <div><span className="text-gray-400">Completed Swaps:</span> <span className="text-white">{user.completedSwaps}</span></div>
                <div><span className="text-gray-400">Success Rate:</span> <span className="text-white">{user.totalRequests > 0 ? ((user.completedSwaps / user.totalRequests) * 100).toFixed(1) : 0}%</span></div>
              </div>
            </div>
          </div>
          
          <div className="bg-gray-700 p-4 rounded-lg">
            <h4 className="text-white font-semibold mb-2">Skills</h4>
            <div className="space-y-2">
              <div><span className="text-gray-400">Offers:</span> <span className="text-blue-400">{user.skillsOffered}</span></div>
              <div><span className="text-gray-400">Wants:</span> <span className="text-green-400">{user.skillsWanted}</span></div>
            </div>
          </div>
          
          <div className="flex flex-wrap gap-2 pt-4">
            {user.status === 'active' ? (
              <button
                onClick={() => onAction(user, 'suspend')}
                className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700"
              >
                Suspend User
              </button>
            ) : (
              <button
                onClick={() => onAction(user, 'activate')}
                className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700"
              >
                Activate User
              </button>
            )}
            <button
              onClick={() => onAction(user, 'delete')}
              className="px-4 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-700"
            >
              Delete User
            </button>
            <button
              onClick={onClose}
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
} 


export default UserDetailsModal;