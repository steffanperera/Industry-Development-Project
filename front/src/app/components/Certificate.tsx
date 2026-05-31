import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { jsPDF } from "jspdf";
import autoTable from "jspdf-autotable";
import API_BASE_URL from "../../config/apiConfig";

interface Scoreboard {
  type: string;
  score: string;
}

const Certificate: React.FC = () => {

  const { caregiverId } = useParams();
  const { attempt } = useParams();

  const [score, setScore] = useState<number>(0);
  const [grade, setGrade] = useState<string>("");
  const [name, setName] = useState<string>("");
const [scoreboards, setScoreboards] = useState<Scoreboard[]>([]);
  const [email, setEmail] = useState<string>("");
  const [certificateId, setCertificateId] = useState<string>("");

  const completionDate = new Date().toLocaleDateString();

  const domains = [
    "Adaptability & Learning Orientation",
    "Communication & Relational Care",
    "Cultural, Spiritual & Ethical Practice",
    "Digital Literacy",
    "Emotional Resilience & Self-Regulation",
    "Group Communication & Information Filtering",
    "Leadership & Coordination",
    "Planning & Organisation",
    "Practical Care & Safety Awareness",
    "Self-Care & Energy Management",
    "Social connection & Belonging",
    "System Navigation & Advocacy"
  ];

  useEffect(() => {

    const fetchData = async () => {

      try {

        const res = await axios.get(
          `${API_BASE_URL}/caregivers/getone/` + caregiverId
        );

        const scoreboard = await axios.get(
          `${API_BASE_URL}/caregivers/scoreboard/` + caregiverId+`/`+attempt
        );
        const alltypes = [
          ...scoreboard.data.data
        ];

        setScoreboards(alltypes);
        console.log(scoreboard);
        const user = res.data[0];

        setName(user.first_name + " " + user.last_name);
        setEmail(user.email);

        const certId =
          "CA-" +
          caregiverId +
          "-" +
          Math.floor(Number(attempt) * 100);

        setCertificateId(certId);

        const res2 = await axios.get(
          `${API_BASE_URL}/caregivers/getscore/` + caregiverId+`/`+attempt
        );

        setScore(res2.data.totalScore);

        const res3 = await axios.get(
          `${API_BASE_URL}/caregivers/getgrade/` +
            res2.data.totalScore
        );

        setGrade(res3.data.grade);

      } catch (error) {
        console.error(error);
      }
    };

    fetchData();

  }, [caregiverId]);

  const generatePDF = () => {

    const doc = new jsPDF();

    // GOLD BORDER
    doc.setDrawColor(212, 175, 55);
    doc.setLineWidth(4);
    doc.rect(10, 10, 190, 277);

    doc.setLineWidth(1);
    doc.rect(15, 15, 180, 267);

    // GREEN CORNERS
    doc.setFillColor(34, 139, 34);

    // top left
    doc.triangle(10, 10, 35, 10, 10, 35, "F");

    // top right
    doc.triangle(200, 10, 175, 10, 200, 35, "F");

    // bottom left
    doc.triangle(10, 287, 35, 287, 10, 262, "F");

    // bottom right
    doc.triangle(200, 287, 175, 287, 200, 262, "F");

    // TITLE
    doc.setTextColor(212, 175, 55);
    doc.setFontSize(30);
    doc.text("CERTIFICATE", 105, 40, { align: "center" });

    doc.setFontSize(18);
    doc.text("OF ACHIEVEMENT", 105, 52, {
      align: "center"
    });

    // BLACK TEXT
    doc.setTextColor(0, 0, 0);

    doc.setFontSize(14);
    doc.text(
      "This is to certify that",
      105,
      75,
      { align: "center" }
    );

    // NAME
    doc.setFontSize(24);
    doc.text(name, 105, 90, {
      align: "center"
    });

    doc.setFontSize(12);

    doc.text(
      "has successfully completed the CareAble Assessment",
      105,
      105,
      { align: "center" }
    );

    // USER INFO
    doc.text(`Certificate ID: ${certificateId}`, 20, 125);
    doc.text(`Email: ${email}`, 20, 135);
    doc.text(`Completion Date: ${completionDate}`, 20, 145);

    doc.text(`Total Score: ${score}/100`, 130, 125);
    

    // TABLE
  autoTable(doc, {
  startY: 160,

  margin: {
    left: 15
  },

  tableWidth: 180,

  head: [[
    "Domains Completed",
    "Score",
    "Category"
  ]],

  body: scoreboards.map((s: any) => {

    const score = Number(s.quiz_score);

    let category = "";

    if (score >= 4.0) {
      category = "Strength Area";
    } else if (score >= 3.0) {
      category = "Growth Area";
    } else {
      category = "Support Area";
    }

    return [
      s.type,
      score.toFixed(1),
      category
    ];
  }),

  styles: {
    fontSize: 8,
    cellPadding: 2,
    lineColor: [200, 200, 200],
    lineWidth: 0.18
  },

  headStyles: {
    fillColor: [34, 139, 34],
    textColor: [255, 255, 255],
    fontStyle: "bold",
    halign: "center"
  },

  columnStyles: {

    0: {
      cellWidth: 110
    },

    1: {
      cellWidth: 25,
      halign: "center"
    },

    2: {
      cellWidth: 45,
      halign: "center"
    }

  },

  alternateRowStyles: {
    fillColor: [245, 245, 245]
  }
});

    // FOOTER
    doc.setFontSize(11);

    doc.text(
      "CareAble Assessment System",
      105,
      270,
      { align: "center" }
    );

    doc.save("certificate.pdf");
  };

  return (

    <div className="flex flex-col items-center p-8 bg-gray-100 min-h-screen">

      <div className="relative bg-white w-[850px] p-10 shadow-2xl">

        {/* GOLD BORDER */}
        <div className="absolute inset-0 border-[10px] border-yellow-600"></div>

        <div className="absolute inset-4 border-2 border-yellow-500"></div>

        {/* GREEN CORNERS */}
        <div className="absolute top-0 left-0 w-0 h-0 border-l-[80px] border-l-green-700 border-b-[80px] border-b-transparent"></div>

        <div className="absolute top-0 right-0 w-0 h-0 border-r-[80px] border-r-green-700 border-b-[80px] border-b-transparent"></div>

        <div className="absolute bottom-0 left-0 w-0 h-0 border-l-[80px] border-l-green-700 border-t-[80px] border-t-transparent"></div>

        <div className="absolute bottom-0 right-0 w-0 h-0 border-r-[80px] border-r-green-700 border-t-[80px] border-t-transparent"></div>

        <div className="relative z-10 text-center">

          <h1 className="text-5xl font-bold text-yellow-600 tracking-[6px]">
            CERTIFICATE
          </h1>

          <h2 className="text-2xl mt-2 mb-8">
            OF ACHIEVEMENT
          </h2>

          <p className="text-lg">
            This is to certify that
          </p>

          <h2 className="text-4xl font-bold my-4">
            {name}
          </h2>

          <p className="mb-8">
            has successfully completed the
            CareAble Assessment
          </p>

          <div className="grid grid-cols-2 gap-4 text-left mb-8">

            <div>
              <p>
                <strong>Certificate ID:</strong>
                {" "}
                {certificateId}
              </p>

              <p>
                <strong>Email:</strong>
                {" "}
                {email}
              </p>

              <p>
                <strong>Completion Date:</strong>
                {" "}
                {completionDate}
              </p>
            </div>

            <div>
              <p>
                <strong>Total Score:</strong>
                {" "}
                {score.toFixed(2)}/100
              </p>

              
            </div>

          </div>

          {/* DOMAIN TABLE */}
          <table className="w-full border border-gray-300 mb-6">

            <thead>
              <tr className="bg-green-700 text-white">
                <th className="border p-2">
                  Domains Completed
                </th>
                <th className="border p-2">
                  Avg. Score
                </th>
                <th className="border p-2">
                  Capability level
                </th>
              </tr>
            </thead>

        <tbody>

  {scoreboards.map((s, index) => {

    const score = Number(s.quiz_score);

    let category = "";

    if (score >= 4.0) {
      category = "Strength Area";
    } else if (score >= 3.0) {
      category = "Growth Area";
    } else {
      category = "Support Area";
    }

    return (
      <tr key={index}>
        <td className="border p-2 text-left">
          {s.type}
        </td>

        <td className="border p-2 text-center">
          {score.toFixed(1)}
        </td>

        <td className="border p-2 text-center">
          {category}
        </td>
      </tr>
    );

  })}

</tbody>

          </table>

          <p className="text-gray-600">
            CareAble Assessment System
          </p>

        </div>
      </div>

      <button
        onClick={generatePDF}
        className="mt-6 bg-green-700 hover:bg-green-800 text-white px-8 py-3 rounded-lg shadow-lg"
      >
        Download PDF
      </button>

    </div>
  );
};

export default Certificate;