import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import { PublicLayout }    from "./layouts/PublicLayout";
import { AdminLayout }     from "./layouts/AdminLayout";
import { CaregiverLayout } from "./layouts/CaregiverLayout";

import { Indexpage }         from "./Indexpage";
import { CaregiverRegister } from "./components/CaregiverRegister";
import { SignIn }            from "./components/SignIn";
import { AboutUs }           from "./components/AboutUs";
import { ContactUs }         from "./components/ContactUs";
import Quiz                  from "./components/Quiz";
import Certificate           from "./components/Certificate";

import { AdminSignIn } from "./admin/AdminSignIn";
import Dashboard       from "./admin/Admin";
import Caregiverlist   from "./admin/Caregiverlist";

import MyProfile from "./caregiver/Myprofile";

export default function App() {
  return (
    <Router>
      <Routes>

        {/* PUBLIC ROUTES */}
        <Route element={<PublicLayout />}>
          <Route path="/"         element={<Indexpage />} />
          <Route path="/index"    element={<Indexpage />} />
          <Route path="/signin"   element={<SignIn />} />
          <Route path="/register" element={<CaregiverRegister />} />
          <Route path="/aboutus"  element={<AboutUs />} />
          <Route path="/contactus" element={<ContactUs />} />
          <Route path="/quize/:caregiverId"       element={<Quiz />} />
          <Route path="/certificate/:caregiverId" element={<Certificate />} />
        </Route>

        {/* ADMIN ROUTES */}
        <Route path="/dashboard" element={<AdminLayout />}>
          <Route index element={<Dashboard />} />
        </Route>
        <Route path="/caregiverlist" element={<AdminLayout />}>
          <Route index element={<Caregiverlist />} />
        </Route>
        <Route path="/admin">
          <Route index element={<AdminSignIn />} />
        </Route>

        {/* CAREGIVER ROUTES */}
        <Route path="/myprofile/:myid" element={<CaregiverLayout />}>
          <Route index element={<MyProfile />} />
        </Route>

      </Routes>
    </Router>
  );
}
