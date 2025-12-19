import React from 'react';

const QuickActionsBar: React.FC = () => {
  const actions = [
    {
      id: '1',
      label: 'New Workflow',
      icon: '✨',
      color: 'bg-blue-600 hover:bg-blue-700',
    },
    {
      id: '2',
      label: 'Connect App',
      icon: '🔌',
      color: 'bg-green-600 hover:bg-green-700',
    },
    {
      id: '3',
      label: 'View History',
      icon: '📜',
      color: 'bg-purple-600 hover:bg-purple-700',
    },
  ];

  return (
    <div className="fixed bottom-8 right-8 flex flex-col space-y-3">
      {actions.map((action) => (
        <button
          key={action.id}
          className={`${action.color} text-white px-6 py-3 rounded-full shadow-lg hover:shadow-xl transition-all flex items-center space-x-2 group`}
          title={action.label}
        >
          <span className="text-xl">{action.icon}</span>
          <span className="font-medium hidden group-hover:inline-block">
            {action.label}
          </span>
        </button>
      ))}
    </div>
  );
};

export default QuickActionsBar;
