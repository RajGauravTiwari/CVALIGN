import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const roles = ['Admin', 'Recruiter', 'Hiring Manager'];

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [role, setRole] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email || !role) return alert('Please enter email and select a role.');

    localStorage.setItem('userRole', role);
    localStorage.setItem('userEmail', email);

    switch (role) {
      case 'Admin':
        navigate('/admin-dashboard');
        break;
      case 'Recruiter':
        navigate('/recruiter-dashboard');
        break;
      case 'Hiring Manager':
        navigate('/hiring-manager-dashboard');
        break;
      default:
        navigate('/login');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-600 to-indigo-700 flex flex-col">
      {/* Header */}
      <header className="text-white p-8 text-center shadow-md">
        <h1 className="text-5xl font-extrabold tracking-tight mb-2">CVAlign</h1>
        <p className="text-lg max-w-2xl mx-auto">
          Streamlining recruitment by intelligently evaluating CVs against job roles using
          AI-powered insights.
        </p>
      </header>

      {/* Main Content */}
      <main className="flex-grow flex items-center justify-center px-4">
        <form
          onSubmit={handleSubmit}
          className="bg-white rounded-xl shadow-xl p-8 max-w-md w-full space-y-6"
        >
          <h2 className="text-3xl font-bold text-center text-gray-800">Sign In</h2>

          <div>
            <label htmlFor="email" className="block text-gray-700 font-semibold mb-2">
              Email Address
            </label>
            <input
              id="email"
              type="email"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
              required
            />
          </div>

          <div>
            <label htmlFor="role" className="block text-gray-700 font-semibold mb-2">
              Select Role
            </label>
            <select
              id="role"
              value={role}
              onChange={(e) => setRole(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
              required
            >
              <option value="">Choose your role</option>
              {roles.map((r) => (
                <option key={r} value={r}>
                  {r}
                </option>
              ))}
            </select>
          </div>

          <button
            type="submit"
            className="w-full bg-indigo-600 text-white py-3 rounded-lg font-semibold hover:bg-indigo-700 transition"
          >
            Login
          </button>
        </form>
      </main>

      {/* Footer */}
      <footer className="text-center text-white py-4 bg-indigo-800 shadow-inner">
        Created by Raj &nbsp; | &nbsp; © 2025 CVAlign
      </footer>
    </div>
  );
}
