export default function WorkflowBuilder() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Workflow Builder</h1>
        <p className="mt-2 text-gray-600">
          Create and manage your automation workflows
        </p>
      </div>

      <div className="bg-white p-8 rounded-lg border border-gray-200 shadow-sm text-center">
        <div className="max-w-md mx-auto">
          <h2 className="text-xl font-semibold text-gray-900 mb-2">Build Your First Workflow</h2>
          <p className="text-gray-600 mb-6">
            Describe what you want to automate in plain English, and our AI will help you build it.
          </p>
          <button className="px-6 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors">
            Create Workflow
          </button>
        </div>
      </div>
    </div>
  );
}
