import React, { useState } from "react";

interface Caregiver {
  id: number;
  name: string;
  birthday: string;
  grade: string;
  score: number;
}

const CaregiverList = () => {
  const [caregivers, setCaregivers] = useState<Caregiver[]>([
    { id: 1, name: "Nadee Randeniya", birthday: "1998-05-12", grade: "A", score: 85 },
    { id: 2, name: "Sachini Pere",    birthday: "1995-08-22", grade: "B", score: 70 },
    { id: 3, name: "Kacee mm",        birthday: "1992-11-10", grade: "A", score: 90 },
    { id: 4, name: "Hiru lll",        birthday: "1999-02-18", grade: "C", score: 55 },
    { id: 5, name: "CC chamil",       birthday: "1997-07-30", grade: "B", score: 68 },
  ]);

  const handleDelete = (id: number) => {
    const confirmDelete = window.confirm("Are you sure you want to delete?");
    if (!confirmDelete) return;
    setCaregivers((prev) => prev.filter((c) => c.id !== id));
  };

  const handleView = (caregiver: Caregiver) => {
    alert(`Viewing ${caregiver.name}`);
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Caregiver List</h1>

      <div className="overflow-x-auto">
        <table className="min-w-full border border-gray-300 bg-white">
          <thead className="bg-gray-200">
            <tr>
              <th className="p-2 border">#</th>
              <th className="p-2 border">Name</th>
              <th className="p-2 border">Birthday</th>
              <th className="p-2 border">Grade</th>
              <th className="p-2 border">Score</th>
              <th className="p-2 border">Actions</th>
            </tr>
          </thead>
          <tbody>
            {caregivers.map((c, index) => (
              <tr key={c.id} className="text-center">
                <td className="p-2 border">{index + 1}</td>
                <td className="p-2 border">{c.name}</td>
                <td className="p-2 border">{c.birthday}</td>
                <td className="p-2 border font-semibold">{c.grade}</td>
                <td className="p-2 border">{c.score}</td>
                <td className="p-2 border space-x-2">
                  <button
                    onClick={() => handleView(c)}
                    className="bg-blue-500 text-white px-3 py-1 rounded"
                  >
                    View
                  </button>
                  <button
                    onClick={() => handleDelete(c.id)}
                    className="bg-red-500 text-white px-3 py-1 rounded"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default CaregiverList;
