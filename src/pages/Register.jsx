import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import AuthForm from '../components/AuthForm';

function Register() {
  const navigate = useNavigate();
  const [error, setError] = useState('');

  const handleSubmit = async ({ username, password, setError }) => {
    try {
      await axios.post('https://taskmanagernoter.onrender.com/register', {
        username,
        password,
      });
      navigate('/login');
    } catch (err) {
      setError('Username taken or invalid input');
    }
  };

  return <AuthForm title="Register" onSubmit={handleSubmit} />;
}

export default Register;