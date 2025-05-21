import { useState } from 'react';

export default function RoleForm() {
  const [form, setForm] = useState({
    title: '',
    requiredSkills: '',
    preferredExperience: '',
    traits: ''
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Job Role Submitted:', form);
    alert('Form submitted (stub)!');
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <input
        type="text"
        name="title"
        placeholder="Job Title"
        value={form.title}
        onChange={handleChange}
        className="w-full border border-gray-300 p-2 rounded"
        required
      />
      <textarea
        name="requiredSkills"
        placeholder="Required Skills"
        value={form.requiredSkills}
        onChange={handleChange}
        className="w-full border border-gray-300 p-2 rounded"
        rows={3}
        required
      />
      <textarea
        name="preferredExperience"
        placeholder="Preferred Experience"
        value={form.preferredExperience}
        onChange={handleChange}
        className="w-full border border-gray-300 p-2 rounded"
        rows={3}
      />
      <textarea
        name="traits"
        placeholder="Preferred Traits"
        value={form.traits}
        onChange={handleChange}
        className="w-full border border-gray-300 p-2 rounded"
        rows={2}
      />
      <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">Submit</button>
    </form>
  );
}
