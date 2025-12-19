import React from 'react';

const EmptyState: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center py-12 px-4">
      <div className="text-center max-w-md">
        {/* Illustration */}
        <div className="mb-6 text-8xl">
          🚀
        </div>
        
        <h2 className="text-2xl font-bold text-gray-900 mb-3">
          Start by building your first workflow
        </h2>
        
        <p className="text-gray-600 mb-6">
          Connect your apps and automate repetitive tasks with just a few clicks.
        </p>
        
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
          <p className="text-blue-800 text-sm">
            <strong>Try:</strong> "When I get a new client booking..."
          </p>
        </div>
        
        <button className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors">
          Create Your First Workflow
        </button>
      </div>
    </div>
  );
};

export default EmptyState;
