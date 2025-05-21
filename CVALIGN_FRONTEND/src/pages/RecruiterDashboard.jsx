import React, { useState, useEffect } from "react";
import PdfViewer from "./PdfViewer";

export default function RecruiterDashboard() {
  const [jobRoles, setJobRoles] = useState([]);
  const [selectedRole, setSelectedRole] = useState("");
  const [cvData, setCvData] = useState([]);
  const [selectedPdfUrl, setSelectedPdfUrl] = useState(null);

  useEffect(() => {
    const fetchJobRoles = async () => {
      try {
        const res = await fetch("http://localhost:8000/job_roles/");
        const data = await res.json();
        setJobRoles(data);
      } catch (error) {
        console.error("Error fetching job roles:", error);
      }
    };
    fetchJobRoles();
  }, []);

  useEffect(() => {
    if (!selectedRole) {
      setCvData([]);
      return;
    }

    const fetchCVs = async () => {
      try {
        const res = await fetch(`http://localhost:8000/scores/?job_role=${selectedRole}`);
        const data = await res.json();
        setCvData(data);
      } catch (error) {
        console.error("Error fetching CVs:", error);
      }
    };

    fetchCVs();
  }, [selectedRole]);

  const getScoreColor = (score) => {
    if (score >= 80) return "bg-green-600";
    if (score >= 60) return "bg-yellow-500";
    return "bg-red-500";
  };

  return (
    <div className="min-h-screen bg-gradient-to-tr from-gray-900 to-slate-800 text-white p-6">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl font-bold text-center mb-8">Recruiter Dashboard</h1>

        {/* Role selection */}
        <div className="mb-8">
          <label className="block text-lg font-semibold mb-2">Select Job Role</label>
          <select
            value={selectedRole}
            onChange={(e) => setSelectedRole(e.target.value)}
            className="w-full max-w-sm px-4 py-2 rounded-lg text-black border border-gray-300"
          >
            <option value="">-- Choose a Role --</option>
            {jobRoles.map((role) => (
              <option key={role} value={role}>
                {role}
              </option>
            ))}
          </select>
        </div>

        {/* CV Table */}
        {selectedRole && (
          <>
            <h2 className="text-2xl font-semibold mb-4">
              Candidates for: <span className="text-indigo-400">{selectedRole}</span>
            </h2>

            {cvData.length === 0 ? (
              <p className="text-gray-300">No CVs found for this role yet.</p>
            ) : (
              <div className="overflow-x-auto rounded-xl shadow-lg">
                <table className="w-full table-auto bg-white text-gray-900 rounded-xl">
                  <thead className="bg-indigo-600 text-white">
                    <tr>
                      <th className="px-4 py-2 text-left">Uploader Email</th>
                      <th className="px-4 py-2">Score</th>
                      <th className="px-4 py-2 text-left">Feedback</th>
                      <th className="px-4 py-2">CV Link</th>
                    </tr>
                  </thead>
                  <tbody>
                    {cvData.map((cv) => (
                      <tr key={cv.id} className="border-b">
                        <td className="px-4 py-3">{cv.uploader_email}</td>
                        <td className="px-4 py-3 text-center">
                          <span
                            className={`text-white px-3 py-1 rounded-full font-semibold ${getScoreColor(
                              cv.score
                            )}`}
                          >
                            {cv.score}
                          </span>
                        </td>
                        <td className="px-4 py-3">{cv.feedback}</td>
                        <td className="px-4 py-3 text-center">
                          <button
                            onClick={() => setSelectedPdfUrl(cv.file_url)}
                            className="text-indigo-600 font-semibold underline hover:text-indigo-800"
                          >
                            View CV
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </>
        )}

        {/* Show PDF viewer modal */}
        {selectedPdfUrl && (
          <PdfViewer fileUrl={selectedPdfUrl} onClose={() => setSelectedPdfUrl(null)} />
        )}
      </div>
    </div>
  );
}
