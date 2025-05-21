import React, { useState, useEffect } from "react";
import PdfViewer from "./PdfViewer";

export default function AdminDashboard() {
  const [jobRoles, setJobRoles] = useState([]);
  const [uploads, setUploads] = useState([]);
  const [selectedPdfUrl, setSelectedPdfUrl] = useState(null);

  useEffect(() => {
    const fetchJobRoles = async () => {
      try {
        const res = await fetch("http://localhost:8000/job_roles/");
        const roles = await res.json();
        setJobRoles(roles);
      } catch (error) {
        console.error("Failed to fetch job roles:", error);
      }
    };

    const fetchUploads = async () => {
      try {
        const res = await fetch("http://localhost:8000/uploads/");
        const data = await res.json();
        setUploads(data);
      } catch (error) {
        console.error("Failed to fetch uploads:", error);
      }
    };

    fetchJobRoles();
    fetchUploads();
  }, []);

  const groupedUploads = jobRoles.reduce((acc, role) => {
    acc[role] = uploads.filter((upload) => upload.job_role === role);
    return acc;
  }, {});

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-800 to-gray-900 text-white p-6">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl font-bold text-center mb-10">Admin Dashboard</h1>

        {jobRoles.length === 0 ? (
          <p className="text-center text-gray-300">No job roles available yet.</p>
        ) : (
          jobRoles.map((role) => (
            <div key={role} className="mb-10 bg-white text-gray-900 rounded-2xl shadow-lg p-6">
              <h2 className="text-2xl font-bold text-indigo-700 mb-4">{role}</h2>

              {groupedUploads[role].length === 0 ? (
                <p className="text-gray-600">No uploads for this job role yet.</p>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full table-auto text-left border-collapse">
                    <thead className="bg-indigo-600 text-white rounded-lg">
                      <tr>
                        <th className="px-4 py-2">Uploader Email</th>
                        <th className="px-4 py-2">Job Description</th>
                        <th className="px-4 py-2">File</th>
                      </tr>
                    </thead>
                    <tbody>
                      {groupedUploads[role].map((upload) => (
                        <tr key={upload.id} className="border-b hover:bg-gray-100">
                          <td className="px-4 py-2">{upload.uploader_email}</td>
                          <td className="px-4 py-2 text-sm text-gray-700">
                            {upload.job_description.length > 100
                              ? upload.job_description.slice(0, 100) + "..."
                              : upload.job_description}
                          </td>
                          <td className="px-4 py-2">
                            <button
                              onClick={() => setSelectedPdfUrl(upload.file_url)}
                              className="text-blue-600 hover:underline"
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
            </div>
          ))
        )}

        {/* Show PDF viewer modal */}
        {selectedPdfUrl && (
          <PdfViewer fileUrl={selectedPdfUrl} onClose={() => setSelectedPdfUrl(null)} />
        )}
      </div>
    </div>
  );
}
