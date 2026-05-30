import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import { PublicLayout } from "./layouts/PublicLayout";
import { AdminLayout } from "./layouts/AdminLayout";
import { CaregiverLayout } from "./layouts/CaregiverLayout";

import { Indexpage } from "./Indexpage";
import { CaregiverRegister } from "./components/CaregiverRegister";
import { SignIn } from "./components/SignIn";
import { AboutUs } from "./components/AboutUs";
import { ContactUs } from "./components/ContactUs";
import Quiz from "./components/Quiz";
import Certificate from "./components/Certificate";
import Onboarding from "./components/Onboarding";
import EditOnboarding from "./caregiver/Onboarding";

import { AdminSignIn } from "./admin/AdminSignIn";
import Dashboard  from "./admin/Admin";
import AdminDashboard  from "./admin/Dashboard";
import CaregiverList  from "./admin/Caregiverlist";
import Questions  from "./admin/Questions";
import EmployerList from "./admin/Employerlist";
import AllCertificateList from "./admin/AllCertificateList";
import CertificateList from "./components/CertificateList";

import MyProfile from "./caregiver/Myprofile";
import { EmployerLayout } from "./layouts/EmployerLayout";

export default function App() {
  return (
    <Router>
      <Routes>

        {/* ✅ PUBLIC ROUTES */}
        <Route element={<PublicLayout />}>
          <Route path="/" element={<Indexpage />} />
          <Route path="/index" element={<Indexpage />} />
          <Route path="/signin" element={<SignIn />} />
          <Route path="/register" element={<CaregiverRegister />} />
          <Route path="/aboutus" element={<AboutUs />} />
          <Route path="/contactus" element={<ContactUs />} />
          <Route path="/certificate/:caregiverId" element={<Certificate  />} />
          <Route path="/onboarding/:caregiverId" element={<Onboarding />} />
        </Route>

        {/* ✅ ADMIN ROUTES (NO HEADER/FOOTER) */}
         <Route  element={<AdminLayout />}>
          <Route path="/admin/dashboard" element={<AdminDashboard />} />
          <Route path="/admin/questions" element={<Questions />} />
          <Route path="/admin/employerList" element={<EmployerList />} />
          <Route path="/admin/caregiverList" element={<CaregiverList />} />
          <Route path="/admin/certificate/:caregiverId/:attempt" element={<Certificate  />} />
          <Route path="/admin/Allcertificate" element={<AllCertificateList  />} />
          
          {/* <Route path="/dashboard" element={<Dashboard />} /> */}
        </Route> 
        <Route path="/admin">
          <Route index element={<AdminSignIn />} />
          {/* <Route path="/dashboard" element={<Dashboard />} /> */}
        </Route>

       {/* ✅ Caregiver ROUTES (NO HEADER/FOOTER) */}
         <Route  element={<CaregiverLayout />}>
          <Route path="/myprofile/:myid" element={<MyProfile />} />
          <Route path="/quize/:caregiverId/:limit" element={<Quiz />} />
          <Route path="/mycertificate/:caregiverId/:attempt" element={<Certificate  />} />
          <Route path="/CertificateList/:caregiverId" element={<CertificateList />} />
          <Route path="/editonboarding/:caregiverId" element={<EditOnboarding />} />
        </Route> 

        {/* ✅ ADMIN ROUTES (NO HEADER/FOOTER) */}
         <Route  element={<EmployerLayout />}>
          <Route path="/emp/dashboard/:empId" element={<AdminDashboard />} />
          <Route path="/emp/caregiverList" element={<CaregiverList />} />
          <Route path="/emp/certificate/:caregiverId/:attempt" element={<Certificate  />} />
          <Route path="/emp/Allcertificate" element={<AllCertificateList  />} />
      </Route>
      </Routes>
    </Router>
  );
}