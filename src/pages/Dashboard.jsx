import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import TaskList from '../components/TaskList';
import TaskForm from '../components/TaskForm';

function Dashboard() {
  const [tasks, setTasks] = useState([]);
  const [editingTask, setEditingTask] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const token = localStorage.getItem('token');
        const res = await axios.get('https://taskmanagernoter.onrender.com/tasks', {
          headers: { Authorization: `Bearer ${token}` },
        });
        setTasks(res.data);
      } catch (err) {
        if (err.response?.status === 401 || err.response?.status === 403) {
          localStorage.removeItem('token');
          navigate('/login');
        }
      }
    };
    fetchTasks();
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  return (
    <div>
      <div className="p-4 bg-blue-500 text-white flex justify-between">
        <h1 className="text-xl font-bold">Task Manager</h1>
        <button onClick={handleLogout} className="bg-red-500 p-2">
          Logout
        </button>
      </div>
      <TaskForm task={editingTask} setTasks={setTasks} setEditingTask={setEditingTask} />
      <TaskList tasks={tasks} setEditingTask={setEditingTask} />
    </div>
  );
}

export default Dashboard;