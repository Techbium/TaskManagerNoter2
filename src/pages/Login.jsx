import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
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

  return <AuthForm title="Login" onSubmit={handleSubmit} />;
}

export default Login;