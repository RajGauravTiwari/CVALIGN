import { Link } from 'react-router-dom';

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center text-center bg-gray-100">
      <h1 className="text-4xl font-bold mb-4">CV Evaluator</h1>
      <p className="mb-6 text-lg">Smart CV screening using AI.</p>
      <div className="space-x-4">
        <Link to="/recruiter-form" className="bg-blue-600 text-white px-4 py-2 rounded">Job Role Form</Link>
        <Link to="/upload" className="bg-green-600 text-white px-4 py-2 rounded">Upload CV</Link>
        <Link to="/dashboard" className="bg-purple-600 text-white px-4 py-2 rounded">Dashboard</Link>
      </div>
    </div>
  );
}
