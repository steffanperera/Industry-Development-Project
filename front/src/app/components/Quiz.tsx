import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import API_BASE_URL from "../../config/apiConfig";

interface Question {
  q_id: number;
  type: string;
  question: string;
  answer1: string;
  answer2: string;
  answer3: string;
  answer4: string;
  correct_answer?: string;
}

const Quiz = () => {
  const { caregiverId } = useParams();
  console.log("Caregiver ID:", caregiverId);

  const [questions, setQuestions] = useState<Question[]>([]);
  const [answers, setAnswers] = useState<{ [key: number]: string }>({});
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const res = await axios.get(`${API_BASE_URL}/questions/random`);
        const allQuestions = [
          ...res.data.data.SB_mcq,
          ...res.data.data.CK_mcq,
        ];
        setQuestions(allQuestions);
        setLoading(false);
      } catch (error) {
        console.error(error);
        setLoading(false);
      }
    };

    fetchQuestions();
  }, []);

  const handleAnswerChange = (q_id: number, answer: string) => {
    setAnswers((prev) => ({ ...prev, [q_id]: answer }));
  };

  const handleSubmit = async () => {
    try {
      const payload = questions.map((q) => ({
        caregiverId,
        q_id: q.q_id,
        answer: answers[q.q_id] || null,
        correct_answer: q.correct_answer,
      }));

      const res = await axios.post(`${API_BASE_URL}/caregivers/crquestions`, {
        caregiverId,
        answers: payload.map((p) => ({
          q_id: p.q_id,
          answer: p.answer,
        })),
      });

      alert("Quiz submitted successfully!");
      navigate("/certificate/" + caregiverId);

    } catch (error) {
      console.error(error);
      alert("Error submitting quiz");
    }
  };

  if (loading) return <p>Loading questions...</p>;

  return (
    <div className="min-h-screen p-6 flex justify-center pt-10">
      <div className="p-6 max-w-3xl mx-auto">
        <h2 className="text-2xl font-bold text-[#00a63e] text-center">Quiz</h2>

        {questions.map((q, index) => (
          <div key={q.q_id} className="mb-6 p-4 border rounded">
            <p className="font-semibold mb-2">
              {index + 1}. {q.question}
            </p>
            {[q.answer1, q.answer2, q.answer3, q.answer4].map((ans, i) => (
              <label key={i} className="block mb-1">
                <input
                  type="radio"
                  name={`question-${q.q_id}`}
                  value={(i + 1).toString()}
                  checked={answers[q.q_id] === (i + 1).toString()}
                  onChange={() => handleAnswerChange(q.q_id, (i + 1).toString())}
                  className="mr-2"
                />
                {ans}
              </label>
            ))}
          </div>
        ))}

        <button
          onClick={handleSubmit}
          className="bg-blue-500 text-white px-6 py-2 rounded"
        >
          Submit Quiz
        </button>
      </div>
    </div>
  );
};

export default Quiz;
