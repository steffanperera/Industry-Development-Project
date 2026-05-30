// src/pages/Questions.tsx

import { useEffect, useState } from "react";
import axios from "axios";

interface Question {
  q_id: number;
  type: string;
  question: string;
  status: string;
}

const Questions = () => {
  const [questions, setQuestions] = useState<Question[]>([]);
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    type: "",
    question: "",
  });

  const [editId, setEditId] = useState<number | null>(null);

  const API = "http://localhost:5000/api/questions";

  // Load Questions
  const fetchQuestions = async () => {
    try {
      setLoading(true);

      const res = await axios.get(API);

      setQuestions(res.data.data);
    } catch (error) {
      console.error(error);
      alert("Failed to load questions");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchQuestions();
  }, []);

  // Handle Input Change
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // Add or Update
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      if (editId) {
        // Update
        await axios.put(`${API}/update/${editId}`, formData);

        alert("Question updated successfully");
      } else {
        // Add
        await axios.post(`${API}/add`, formData);

        alert("Question added successfully");
      }

      setFormData({
        type: "",
        question: "",
      });

      setEditId(null);

      fetchQuestions();
    } catch (error) {
      console.error(error);
      alert("Operation failed");
    }
  };

  // Edit Question
  const handleEdit = (question: Question) => {
    setEditId(question.q_id);

    setFormData({
      type: question.type,
      question: question.question,
    });

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  // Delete Question
  const handleDelete = async (id: number) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this question?"
    );

    if (!confirmDelete) return;

    try {
      await axios.delete(`${API}/delete/${id}`);

      alert("Question deleted successfully");

      fetchQuestions();
    } catch (error) {
      console.error(error);
      alert("Delete failed");
    }
  };

  // Cancel Edit
  const cancelEdit = () => {
    setEditId(null);

    setFormData({
      type: "",
      question: "",
    });
  };

  return (
    <div className="p-6 max-w-7xl mx-auto pt-15">
      <h1 className="text-3xl font-bold mb-6">
        Questions Management
      </h1>

      {/* Form */}
      <div className="bg-white shadow-lg rounded-xl p-6 mb-8 border">
        <h2 className="text-xl font-semibold mb-4">
          {editId ? "Edit Question" : "Add New Question"}
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block mb-1 font-medium">
              Domains
            </label>

            <input
              type="text"
              name="type"
              value={formData.type}
              onChange={handleChange}
              placeholder="Enter question domains"
              className="w-full border rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          <div>
            <label className="block mb-1 font-medium">
              Question
            </label>

            <textarea
              name="question"
              value={formData.question}
              onChange={handleChange}
              placeholder="Enter question"
              rows={4}
              className="w-full border rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          <div className="flex gap-3">
            <button
              type="submit"
              className={`px-5 py-3 rounded-lg text-white font-semibold transition ${
                editId
                  ? "bg-green-600 hover:bg-green-700"
                  : "bg-blue-600 hover:bg-blue-700"
              }`}
            >
              {editId ? "Update Question" : "Add Question"}
            </button>

            {editId && (
              <button
                type="button"
                onClick={cancelEdit}
                className="px-5 py-3 rounded-lg bg-gray-500 hover:bg-gray-600 text-white font-semibold"
              >
                Cancel
              </button>
            )}
          </div>
        </form>
      </div>

      {/* Questions Table */}
      <div className="bg-white shadow-lg rounded-xl border overflow-hidden">
        <div className="p-4 border-b">
          <h2 className="text-xl font-semibold">
            All Questions
          </h2>
        </div>

        {loading ? (
          <div className="p-6 text-center">
            Loading questions...
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-100">
                <tr>
                  <th className="p-4 text-left">ID</th>
                  <th className="p-4 text-left">Domains</th>
                  <th className="p-4 text-left">Question</th>
                  <th className="p-4 text-center">Actions</th>
                </tr>
              </thead>

              <tbody>
                {questions.length > 0 ? (
                  questions.map((q) => (
                    <tr
                      key={q.q_id}
                      className="border-t hover:bg-gray-50"
                    >
                      <td className="p-4">{q.q_id}</td>

                      <td className="p-4">
                        <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm">
                          {q.type}
                        </span>
                      </td>

                      <td className="p-4">
                        {q.question}
                      </td>

                      <td className="p-4">
                        <div className="flex justify-center gap-2">
                          <button
                            onClick={() => handleEdit(q)}
                            className="bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-2 rounded-lg"
                          >
                            Edit
                          </button>

                          <button
                            onClick={() =>
                              handleDelete(q.q_id)
                            }
                            className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg"
                          >
                            Delete
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td
                      colSpan={4}
                      className="text-center p-6 text-gray-500"
                    >
                      No questions found
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default Questions;