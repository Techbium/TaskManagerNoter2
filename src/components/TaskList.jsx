function TaskList({ tasks, setEditingTask }) {
  const statuses = ['To Do', 'In Progress', 'Done'];

  return (
    <div className="p-4">
      {statuses.map((status) => (
        <div key={status} className="mb-6">
          <h3 className="text-lg font-bold">{status}</h3>
          {tasks
            .filter((task) => task.status === status)
            .map((task) => (
              <div
                key={task.id}
                className="p-2 bg-white border mb-2 cursor-pointer"
                onClick={() => setEditingTask(task)}
              >
                <h4>{task.title}</h4>
                <p>{task.description || 'No description'}</p>
              </div>
            ))}
        </div>
      ))}
    </div>
  );
}

export default TaskList;