import { useState, useEffect } from 'react';
import axios from 'axios';

function TaskForm({ task, setTasks, setEditingTask }) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [status, setStatus] = useState('To Do');
  const [error, setError] = useState('');

  useEffect(() => {
    if (task) {
      setTitle(task.title);
      setDescription(task.description || '');
      setStatus(task.status);
    } else {
      setTitle('');
      setDescription('');
      setStatus('To Do');
    }
  }, [task]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      const token = localStorage.getItem('token');
      if (task) {
        // Update task
        const res = await axios.put(
          `https://taskmanagernoter.onrender.com/tasks/${task.id}`,
          { title, description, status },
          { headers: { Authorization: `Bearer ${token}` } }
        );
        setTasks((prev) => prev.map((t) => (t.id === task.id ? res.data : t)));
      } else {
        // Create task
        const res = await axios.post(
          'https://taskmanagernoter.onrender.com/tasks',
          { title, description, status },
          { headers: { Authorization: `Bearer ${token}` } }
        );
        setTasks((prev) => [...prev, res.data]);
      }
      setEditingTask(null); // Clear form
    } catch (err) {
      setError('Failed to save task');
    }
  };

  const handleDelete = async () => {
    if (!task) return;
    try {
      const token = localStorage.getItem('token');
      await axios.delete(`https://taskmanagernoter.onrender.com/tasks/${task.id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setTasks((prev) => prev.filter((t) => t.id !== task.id));
      setEditingTask(null);
    } catch (err) {
      setError('Failed to delete task');
    }
  };

  return (
    <div className="w-full max-w-sm mx-auto p-4 bg-white border">
      <h3 className="text-lg font-bold">{task ? 'Edit Task' : 'New Task'}</h3>
      {error && <p className="text-red-500">{error}</p>}
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block">Title</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full p-2 border"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block">Description</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full p-2 border"
          />
        </div>
        <div className="mb-4">
          <label className="block">Status</label>
          <select
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            className="w-full p-2 border"
          >
            <option>To Do</option>
            <option>In Progress</option>
            <option>Done</option>
          </select>
        </div>
        <div className="flex gap-2">
          <button type="submit" className="bg-blue-500 text-white p-2">
            Save
          </button>
          {task && (
            <button
              type="button"
              onClick={handleDelete}
              className="bg-red-500 text-white p-2"
            >
              Delete
            </button>
          )}
          <button
            type="button"
            onClick={() => setEditingTask(null)}
            className="bg-gray-500 text-white p-2"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}

export default TaskForm;