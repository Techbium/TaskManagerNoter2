import { useState } from 'react';
import { useNavigate, Link} from 'react-router-dom';
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

  
  return (
    <div>
      <AuthForm title="Register" onSubmit={handleSubmit} />;
      <div className="w-full max-w-sm mx-auto mt-4 text-center">
        <p>
          Don't have an account?{' '}
          <Link to="/login" className="text-blue-500">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Register;