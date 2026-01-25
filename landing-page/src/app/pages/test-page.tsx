export default function TestPage() {
  return (
    <div className="min-h-screen bg-white text-black p-8">
      <h1 className="text-4xl font-bold mb-4">DevOS CLI</h1>
      <p className="text-xl mb-4">One command-line to manage your entire dev life.</p>
      <div className="bg-gray-100 p-4 rounded">
        <h2 className="text-2xl font-semibold mb-2">Features:</h2>
        <ul className="list-disc list-inside space-y-2">
          <li>Project Management</li>
          <li>Session Tracking</li>
          <li>Secure Environment</li>
          <li>Productivity Reports</li>
        </ul>
      </div>
    </div>
  );
}
