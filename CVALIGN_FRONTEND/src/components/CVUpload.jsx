import { useState } from 'react';

export default function CVUpload() {
  const [file, setFile] = useState(null);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!file) return alert('Please upload a file.');
    console.log('File uploaded:', file);
    alert(`File "${file.name}" uploaded (stub)`);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <input
        type="file"
        accept=".pdf,.doc,.docx"
        onChange={handleFileChange}
        className="w-full border border-gray-300 p-2 rounded"
      />
      <button type="submit" className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700">Upload</button>
    </form>
  );
}
