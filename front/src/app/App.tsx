import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { PublicLayout } from "./layouts/PublicLayout";
import { Indexpage } from "./Indexpage";
import { SignIn } from "./components/SignIn";
import { CaregiverRegister } from "./components/CaregiverRegister";

export default function App() {
  return (
    <Router>
      <Routes>
        <Route element={<PublicLayout />}>
          <Route path="/" element={<Indexpage />} />
          <Route path="/index" element={<Indexpage />} />
        </Route>
        {/* Auth pages — standalone, no header/footer */}
        <Route path="/signin" element={<SignIn />} />
        <Route path="/register" element={<CaregiverRegister />} />
      </Routes>
    </Router>
  );
}
