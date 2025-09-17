import { useState } from 'react';

function AuthForm({ title, onSubmit }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');
    onSubmit({ username, password, setError });
  };

  return (
    <div className="w-full max-w-sm mx-auto mt-10 p-4 bg-white border">
      <h2 className="text-xl font-bold text-center">{title}</h2>
      {error && <p className="text-red-500 text-center">{error}</p>}
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block">Username</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="w-full p-2 border"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block">Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-2 border"
            required
          />
        </div>
        <button type="submit" className="w-full bg-blue-500 text-white p-2">
          {title}
        </button>
      </form>
    </div>
  );
}

export default AuthForm;