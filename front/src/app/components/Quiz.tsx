import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate,useParams } from "react-router-dom";
import API_BASE_URL from "../../config/apiConfig";

interface Question {
  q_id: number;
  type: string;
  question: string;
  answer1: string;
  answer2: string;
  answer3: string;
  answer4: string;
  answer5: string;
  correct_answer?: string; // optional (if backend sends it)
}

const Quiz = () => {

  const { caregiverId } = useParams();
  const { limit }= useParams();


  console.log("Caregiver ID:", caregiverId);
  console.log("limit:", limit);

  const [questions, setQuestions] = useState<Question[]>([]);
  const [answers, setAnswers] = useState<{ [key: number]: string }>({});
  const [loading, setLoading] = useState(true);
  const [type, setType] = useState();

  // Fetch questions
  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        console.log("lllm"+limit);
        const res = await axios.get(`${API_BASE_URL}/questions/random/`+limit);
        console.log(res.data.data[0].type);
        // merge both types into one array
        const allQuestions = [
          ...res.data.data
        ];

        setQuestions(allQuestions);
        setType(res.data.data[0].type)
        setLoading(false);
      } catch (error) {
        console.error(error);
        setLoading(false);
      }
    };

    fetchQuestions();
  }, [limit]);
const navigate = useNavigate();
  // Handle answer select
  const handleAnswerChange = (q_id: number, answer: string) => {
    setAnswers((prev) => ({
      ...prev,
      [q_id]: answer,
    }));
  };

  // Submit quiz
  const handleSubmit = async () => {
    
    try {
      const payload = questions.map((q) => ({
        caregiverId,
        q_id: q.q_id,
        answer: answers[q.q_id] || null,
      }));
      //console.log(payload);
      const res = await axios.post(
        `${API_BASE_URL}/caregivers/crquestions`,{
    caregiverId,
    answers: payload.map(p => ({
      q_id: p.q_id,
      answer: p.answer
    }))
  }
      );

      alert("Quiz submitted successfully!");
      //console.log(res.data);
      const newLimit = Number(limit) + 5;
       // Redirect to quize page
if(newLimit>60){
navigate("/CertificateList/"+caregiverId);
}else{
navigate("/quize/"+caregiverId+"/"+newLimit);
}
      

    } catch (error) {
      console.error(error);
      alert("Error submitting quiz");
    }
  };

  if (loading) return <p>Loading questions...</p>;

  return (
    <div className="min-h-screen p-6 flex justify-center pt-10">
    <div className="p-6 max-w-3xl mx-auto">
      <h2 className="text-2xl font-bold text-[#00a63e] text-center">Quiz {type}</h2>

      {questions.map((q, index) => (
        <div key={q.q_id} className="mb-6 p-4 border rounded">
          <p className="font-semibold mb-2">
            {index + 1}. {q.question}
          </p>

         {['Never / Not at all true', 'Rarely true', 'Sometimes true', 'Often true','Always / Consistently true'].map((ans, i) => (
  <label key={i} className="block mb-1">
    <input
      type="radio"
      name={`question-${q.q_id}`}
      value={(i + 1).toString()}
      checked={answers[q.q_id] === (i + 1).toString()}
      onChange={() =>
        handleAnswerChange(q.q_id, (i + 1).toString())
      }
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
        Submit {type} Quiz 
      </button>
    </div>
    </div>
  );
};

export default Quiz;