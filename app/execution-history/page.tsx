export default function ExecutionHistory() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Execution History</h1>
        <p className="mt-2 text-gray-600">
          View the history of your workflow executions
        </p>
      </div>

      <div className="bg-white p-8 rounded-lg border border-gray-200 shadow-sm text-center">
        <div className="max-w-md mx-auto">
          <h2 className="text-xl font-semibold text-gray-900 mb-2">No Executions Yet</h2>
          <p className="text-gray-600">
            Once you create and run workflows, their execution history will appear here.
          </p>
        </div>
      </div>
    </div>
  );
}
