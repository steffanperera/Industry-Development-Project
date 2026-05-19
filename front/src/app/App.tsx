import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { PublicLayout } from "./layouts/PublicLayout";
import { Indexpage } from "./Indexpage";

export default function App() {
  return (
    <Router>
      <Routes>
        <Route element={<PublicLayout />}>
          <Route path="/" element={<Indexpage />} />
          <Route path="/index" element={<Indexpage />} />
        </Route>
      </Routes>
    </Router>
  );
}
