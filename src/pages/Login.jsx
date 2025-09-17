import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import AuthForm from '../components/AuthForm';

function Login() {
  const navigate = useNavigate();
  const [error, setError] = useState('');

  const handleSubmit = async ({ username, password, setError }) => {
    try {
      const res = await axios.post('https://taskmanagernoter.onrender.com/login', {
        username,
        password,
      });
      localStorage.setItem('token', res.data.token);
      navigate('/dashboard');
    } catch (err) {
      setError('Invalid username or password');
    }
  };

  return (
    <div>
      <AuthForm title="Login" onSubmit={handleSubmit} />
      <div className="w-full max-w-sm mx-auto mt-4 text-center">
        <p>
          Don't have an account?{' '}
          <Link to="/register" className="text-blue-500">
            Sign Up
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Login;