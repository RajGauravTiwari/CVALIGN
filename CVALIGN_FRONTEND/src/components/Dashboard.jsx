// Static data for now
const candidates = [
  { name: 'Alice Johnson', score: 92, strengths: 'Relevant skills', weaknesses: 'Less leadership experience' },
  { name: 'Bob Smith', score: 78, strengths: 'Team experience', weaknesses: 'Lacks domain expertise' },
  { name: 'Charlie Lee', score: 85, strengths: 'Good communication', weaknesses: 'No past projects listed' },
];

export default function Dashboard() {
  return (
    <div className="grid gap-4">
      {candidates.map((c, i) => (
        <div key={i} className="border p-4 rounded-lg shadow bg-white">
          <h3 className="text-xl font-semibold">{c.name}</h3>
          <p>Score: <strong>{c.score}</strong></p>
          <p><strong>Strengths:</strong> {c.strengths}</p>
          <p><strong>Weaknesses:</strong> {c.weaknesses}</p>
        </div>
      ))}
    </div>
  );
}
