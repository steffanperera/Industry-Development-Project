import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { PublicLayout } from "./layouts/PublicLayout";
import { Indexpage } from "./Indexpage";

function ComingSoon({ label }: { label: string }) {
  return (
    <div className="pt-24 pb-16 min-h-screen flex items-center justify-center">
      <p className="text-gray-500 text-lg">{label} — coming soon</p>
    </div>
  );
}

export default function App() {
  return (
    <Router>
      <Routes>
        <Route element={<PublicLayout />}>
          <Route path="/" element={<Indexpage />} />
          <Route path="/index" element={<Indexpage />} />
          <Route path="/signin" element={<ComingSoon label="Sign In" />} />
          <Route path="/register" element={<ComingSoon label="Register" />} />
        </Route>
      </Routes>
    </Router>
  );
}
