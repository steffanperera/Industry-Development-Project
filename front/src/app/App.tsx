import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import { PublicLayout }    from "./layouts/PublicLayout";
import { AdminLayout }     from "./layouts/AdminLayout";
import { CaregiverLayout } from "./layouts/CaregiverLayout";

import { Indexpage }         from "./Indexpage";
import { CaregiverRegister } from "./components/CaregiverRegister";
import { SignIn }            from "./components/SignIn";
import { AboutUs }           from "./components/AboutUs";
import { ContactUs }         from "./components/ContactUs";
import Certificate           from "./components/Certificate";
import Onboarding            from "./components/Onboarding";
import CertificateList       from "./components/CertificateList";

import { AdminSignIn }      from "./admin/AdminSignIn";
import Dashboard            from "./admin/Dashboard";
import CaregiverList        from "./admin/Caregiverlist";
import Questions            from "./admin/Questions";
import AllCertificateList   from "./admin/AllCertificateList";

import MyProfile from "./caregiver/Myprofile";
import Quiz      from "./components/Quiz";

export default function App() {
  return (
    <Router>
      <Routes>

        {/* PUBLIC ROUTES */}
        <Route element={<PublicLayout />}>
          <Route path="/"          element={<Indexpage />} />
          <Route path="/index"     element={<Indexpage />} />
          <Route path="/signin"    element={<SignIn />} />
          <Route path="/register"  element={<CaregiverRegister />} />
          <Route path="/aboutus"   element={<AboutUs />} />
          <Route path="/contactus" element={<ContactUs />} />
          <Route path="/onboarding/:caregiverId"  element={<Onboarding />} />
          <Route path="/certificate/:caregiverId" element={<Certificate />} />
        </Route>

        {/* ADMIN ROUTES */}
        <Route element={<AdminLayout />}>
          <Route path="/dashboard"                            element={<Dashboard />} />
          <Route path="/caregiverlist"                        element={<CaregiverList />} />
          <Route path="/admin/questions"                      element={<Questions />} />
          <Route path="/admin/certificatelist"                element={<AllCertificateList />} />
          <Route path="/admin/certificate/:caregiverId/:attempt" element={<Certificate />} />
        </Route>
        <Route path="/admin">
          <Route index element={<AdminSignIn />} />
        </Route>

        {/* CAREGIVER ROUTES */}
        <Route element={<CaregiverLayout />}>
          <Route path="/myprofile/:myid"                      element={<MyProfile />} />
          <Route path="/quize/:caregiverId/:limit"            element={<Quiz />} />
          <Route path="/mycertificate/:caregiverId/:attempt"  element={<Certificate />} />
          <Route path="/CertificateList/:caregiverId"         element={<CertificateList />} />
        </Route>

      </Routes>
    </Router>
  );
}
