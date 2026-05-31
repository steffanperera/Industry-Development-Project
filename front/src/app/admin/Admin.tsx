import React from "react";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  BarChart,
  Bar,
  Legend,
} from "recharts";

const Dashboard = () => {
  /* =========================
      QUIZ COMPLETION RATE
  ========================= */
  const completionData = [
    { name: "Completed", value: 78 },
    { name: "Pending", value: 22 },
  ];

  /* =========================
      MONTHLY REGISTRATIONS
  ========================= */
  const registrationData = [
    { month: "Jan", caregivers: 12, employers: 5 },
    { month: "Feb", caregivers: 18, employers: 8 },
    { month: "Mar", caregivers: 25, employers: 10 },
    { month: "Apr", caregivers: 20, employers: 7 },
    { month: "May", caregivers: 30, employers: 12 },
    { month: "Jun", caregivers: 38, employers: 14 },
  ];

  /* =========================
      ASSESSMENT SCORE ANALYTICS
  ========================= */
  const assessmentData = [
    {
      skill: "Adaptability & Learning",
      score: 4.2,
    },
    {
      skill: "Communication & Care",
      score: 4.5,
    },
    {
      skill: "Cultural & Ethical",
      score: 3.8,
    },
    {
      skill: "Digital Literacy",
      score: 3.5,
    },
    {
      skill: "Emotional Resilience",
      score: 4.1,
    },
    {
      skill: "Group Communication",
      score: 3.9,
    },
    {
      skill: "Leadership",
      score: 4.0,
    },
    {
      skill: "Planning",
      score: 4.3,
    },
    {
      skill: "Practical Care",
      score: 4.7,
    },
    {
      skill: "Self-Care",
      score: 3.6,
    },
    {
      skill: "Social Connection",
      score: 4.4,
    },
    {
      skill: "System Navigation",
      score: 3.7,
    },
  ];

  const COLORS = ["#10B981", "#EF4444"];

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      {/* HEADER */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800">
          CareAble Dashboard
        </h1>

        <p className="text-gray-500 mt-2">
          Caregiver Assessment Analytics
        </p>
      </div>

      {/* TOP CARDS */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-5 mb-8">
        <div className="bg-white p-5 rounded-2xl shadow">
          <h3 className="text-gray-500 text-sm">
            Total Caregivers
          </h3>

          <p className="text-3xl font-bold mt-2">
            245
          </p>
        </div>

        <div className="bg-white p-5 rounded-2xl shadow">
          <h3 className="text-gray-500 text-sm">
            Total Employers
          </h3>

          <p className="text-3xl font-bold mt-2">
            62
          </p>
        </div>

        <div className="bg-white p-5 rounded-2xl shadow">
          <h3 className="text-gray-500 text-sm">
            Completed Assessments
          </h3>

          <p className="text-3xl font-bold mt-2">
            191
          </p>
        </div>

        <div className="bg-white p-5 rounded-2xl shadow">
          <h3 className="text-gray-500 text-sm">
            Active Users
          </h3>

          <p className="text-3xl font-bold mt-2">
            228
          </p>
        </div>
      </div>

      {/* CHARTS ROW */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        
        {/* QUIZ COMPLETION RATE */}
        <div className="bg-white p-5 rounded-2xl shadow">
          <h2 className="text-xl font-semibold mb-5">
            Quiz Completion Rate
          </h2>

          <ResponsiveContainer
            width="100%"
            height={300}
          >
            <PieChart>
              <Pie
                data={completionData}
                cx="50%"
                cy="50%"
                outerRadius={100}
                dataKey="value"
                label
              >
                {completionData.map(
                  (entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={COLORS[index]}
                    />
                  )
                )}
              </Pie>

              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* MONTHLY REGISTRATIONS */}
        <div className="bg-white p-5 rounded-2xl shadow">
          <h2 className="text-xl font-semibold mb-5">
            Monthly Registrations
          </h2>

          <ResponsiveContainer
            width="100%"
            height={300}
          >
            <LineChart data={registrationData}>
              <CartesianGrid strokeDasharray="3 3" />

              <XAxis dataKey="month" />

              <YAxis />

              <Tooltip />

              <Legend />

              <Line
                type="monotone"
                dataKey="caregivers"
                stroke="#2563EB"
                strokeWidth={3}
              />

              <Line
                type="monotone"
                dataKey="employers"
                stroke="#10B981"
                strokeWidth={3}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* ASSESSMENT SCORE ANALYTICS */}
      <div className="bg-white p-6 rounded-2xl shadow">
        <h2 className="text-2xl font-semibold mb-6">
          Assessment Score Analytics
        </h2>

        <ResponsiveContainer
          width="100%"
          height={500}
        >
          <BarChart
            data={assessmentData}
            layout="vertical"
            margin={{
              top: 10,
              right: 30,
              left: 80,
              bottom: 10,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" />

            <XAxis
              type="number"
              domain={[0, 5]}
            />

            <YAxis
              dataKey="skill"
              type="category"
              width={220}
            />

            <Tooltip />

            <Bar
              dataKey="score"
              fill="#6366F1"
              radius={[0, 10, 10, 0]}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default Dashboard;