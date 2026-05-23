import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { jsPDF } from "jspdf";
import API_BASE_URL from "../../config/apiConfig";

interface Props {
  name: string;
  score: number;
  grade: string;
}

const Certificate: React.FC<Props> = () => {
  const { caregiverId } = useParams();
  const [userdata, setUserdata] = useState([]);
  const [loading, setLoading] = useState(true);
  const [score, setScore] = useState(true);
  const [grade, setGrade] = useState<any>();
  const [name, setName] = useState("Stepfn");

  const [quizescore, setQuizescore] = useState<any>();
  const [expscore, setExpscore]     = useState<any>();
  const [eduscore, setEduscore]     = useState<any>();
  const [bonusscore, setBonusscore] = useState<any>();

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const res = await axios.get(`${API_BASE_URL}/caregivers/getone/` + caregiverId);
        setName(res.data[0].full_name);

        const res2 = await axios.get(`${API_BASE_URL}/caregivers/getscore/` + caregiverId);
        console.log(res2.data.total_score);
        setScore(res2.data.totalScore);
        setQuizescore(res2.data.quizScore);
        setExpscore(res2.data.experienceMarks);
        setEduscore(res2.data.qualificationMarks);
        setBonusscore(res2.data.bonusMarks);

        if (score) {
          const res3 = await axios.get(`${API_BASE_URL}/caregivers/getgrade/` + res2.data.totalScore);
          setGrade(res3.data.grade);
        }

      } catch (error) {
        console.error(error);
        setLoading(false);
      }
    };

    fetchQuestions();
  }, []);

  const generatePDF = () => {
    const doc = new jsPDF();

    doc.setFontSize(22);
    doc.text("Certificate of Achievement", 105, 40, { align: "center" });

    doc.setFontSize(14);
    doc.text("This is to certify that", 105, 60, { align: "center" });

    doc.setFontSize(18);
    doc.text(name, 105, 75, { align: "center" });

    doc.setFontSize(12);
    doc.text(`Education Qualification Score: ${eduscore}`,  105, 95,  { align: "center" });
    doc.text(`Work Experience Score: ${expscore}`,          105, 105, { align: "center" });
    doc.text(`Quiz Score: ${quizescore}`,                   105, 115, { align: "center" });
    doc.text(`Bonus Score: ${bonusscore}`,                  105, 125, { align: "center" });
    doc.text(`Total Score: ${score}`,                       105, 145, { align: "center" });
    doc.text(`Grade: ${grade}`,                             105, 155, { align: "center" });
    doc.text("CareAble Assessment System",                  105, 175, { align: "center" });

    doc.save("certificate.pdf");
  };

  return (
    <div className="flex flex-col items-center p-6 pt-10">
      <div className="border-4 border-gray-800 p-10 w-[600px] text-center bg-white shadow-lg">
        <h1 className="text-2xl font-bold mb-4">Certificate of Achievement</h1>
        <p className="mb-2">This is to certify that</p>
        <h2 className="text-xl font-semibold mb-4">{name}</h2>
        <p className="mb-2">has successfully completed the quiz</p>

        <p className="mb-1">Education Qualification Score: <strong>{eduscore}</strong></p>
        <p className="mb-1">Work Experience Score: <strong>{expscore}</strong></p>
        <p className="mb-1">Quiz Score: <strong>{quizescore}</strong></p>
        <p className="mb-1">Bonus Score: <strong>{bonusscore}</strong></p>
        <p className="mb-1">Total Score: <strong>{score}</strong></p>
        <p className="mb-4">Grade: <strong>{grade}</strong></p>

        <p className="text-sm text-gray-600">CareAble Assessment System</p>
      </div>

      <button
        onClick={generatePDF}
        className="mt-6 bg-green-600 text-white px-6 py-2 rounded"
      >
        Download PDF
      </button>
    </div>
  );
};

export default Certificate;
