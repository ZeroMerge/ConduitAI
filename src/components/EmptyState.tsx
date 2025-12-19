import React from 'react';

interface EmptyStateProps {
  onGetStarted: () => void;
}

const EmptyState: React.FC<EmptyStateProps> = ({ onGetStarted }) => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-purple-50">
      <div className="text-center px-4 max-w-2xl">
        {/* Illustration */}
        <div className="mb-8">
          <div className="text-9xl mb-4">🚀</div>
          <div className="flex justify-center space-x-4 text-5xl">
            <span className="animate-bounce" style={{ animationDelay: '0s' }}>⚡</span>
            <span className="animate-bounce" style={{ animationDelay: '0.2s' }}>✨</span>
            <span className="animate-bounce" style={{ animationDelay: '0.4s' }}>🎯</span>
          </div>
        </div>

        {/* Content */}
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          Start by building your first workflow
        </h1>
        <p className="text-xl text-gray-600 mb-8">
          Automate your tasks and save hours every week
        </p>

        {/* Example */}
        <div className="bg-white rounded-lg shadow-lg p-6 mb-8 border-2 border-blue-200">
          <p className="text-lg text-gray-700 mb-2">
            <span className="font-semibold text-blue-600">Try this:</span>
          </p>
          <p className="text-gray-600 italic">
            "When I get a new client booking..."
          </p>
        </div>

        {/* CTA Button */}
        <button
          onClick={onGetStarted}
          className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-4 rounded-full text-lg font-semibold hover:from-blue-700 hover:to-purple-700 shadow-lg hover:shadow-xl transition-all transform hover:scale-105"
        >
          Create Your First Workflow
        </button>

        {/* Additional Info */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6 text-left">
          <div className="bg-white rounded-lg p-4 shadow-sm">
            <div className="text-3xl mb-2">🔌</div>
            <h3 className="font-semibold text-gray-900 mb-1">Connect Apps</h3>
            <p className="text-sm text-gray-600">Link your favorite tools in seconds</p>
          </div>
          <div className="bg-white rounded-lg p-4 shadow-sm">
            <div className="text-3xl mb-2">🤖</div>
            <h3 className="font-semibold text-gray-900 mb-1">Describe in Plain English</h3>
            <p className="text-sm text-gray-600">No coding required, just tell us what you need</p>
          </div>
          <div className="bg-white rounded-lg p-4 shadow-sm">
            <div className="text-3xl mb-2">⚡</div>
            <h3 className="font-semibold text-gray-900 mb-1">Automate Everything</h3>
            <p className="text-sm text-gray-600">Let AI handle the repetitive tasks</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmptyState;
