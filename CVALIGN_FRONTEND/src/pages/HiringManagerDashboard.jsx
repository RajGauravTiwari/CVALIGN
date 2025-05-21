import React, { useState } from "react";

export default function HiringManagerDashboard() {
  const [jobRole, setJobRole] = useState("");
  const [jobDesc, setJobDesc] = useState("");
  const [email, setEmail] = useState("");
  const [file, setFile] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("job_role", jobRole);
    formData.append("job_description", jobDesc);
    formData.append("uploader_email", email);
    formData.append("file", file);

    try {
      const res = await fetch("http://localhost:8000/upload/", {
        method: "POST",
        body: formData,
      });

      if (!res.ok) throw new Error("Upload failed");

      alert("✅ Successfully uploaded!");
      setJobRole("");
      setJobDesc("");
      setEmail("");
      setFile(null);
    } catch (error) {
      alert("❌ Upload failed. Please try again.");
      console.error("Upload error:", error);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 to-gray-800 text-white p-6">
      <div className="max-w-3xl mx-auto bg-white text-gray-900 rounded-2xl shadow-2xl p-8 mt-10">
        <h2 className="text-3xl font-bold mb-6 text-center">Hiring Manager Dashboard</h2>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block mb-1 font-semibold">Job Role</label>
            <input
              type="text"
              placeholder="e.g. Frontend Developer"
              value={jobRole}
              onChange={(e) => setJobRole(e.target.value)}
              className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500"
              required
            />
          </div>

          <div>
            <label className="block mb-1 font-semibold">Job Description</label>
            <textarea
              placeholder="Enter the role-specific requirements and skills..."
              value={jobDesc}
              onChange={(e) => setJobDesc(e.target.value)}
              rows={5}
              className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500"
              required
            ></textarea>
          </div>

          <div>
            <label className="block mb-1 font-semibold">Your Email</label>
            <input
              type="email"
              placeholder="hiringmanager@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500"
              required
            />
          </div>

          <div>
            <label className="block mb-1 font-semibold">Upload Candidate CV</label>
            <input
              type="file"
              accept=".pdf,.doc,.docx"
              onChange={(e) => setFile(e.target.files[0])}
              className="w-full px-4 py-2 rounded-lg bg-gray-100"
              required
            />
            {file && (
              <p className="text-sm text-gray-600 mt-1">Selected: {file.name}</p>
            )}
          </div>

          <button
            type="submit"
            className="w-full bg-emerald-600 text-black text-xl font-bold py-3 rounded-lg border border-black shadow-md"
          >
            Upload CV
          </button>
        </form>
      </div>
    </div>
  );
}
