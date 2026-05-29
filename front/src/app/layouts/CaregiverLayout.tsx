import { Outlet, Link } from "react-router-dom";
import { Header } from "../caregiver/Header";
import { 
  LayoutDashboard, 
  UserCheck, 
  ClipboardCheck, 
  Settings, 
  LogOut 
} from 'lucide-react'; // Example using Lucide icons

export const CaregiverLayout = () => {
  const caregiverId = sessionStorage.getItem("caregiverId");

  return (
    <div className="flex min-h-screen">
      <Header />
      


      

      <nav className="w-64 bg-slate-900 h-screen p-4 text-slate-300 flex flex-col justify-between pt-10">
        
  {/* Upper Menu Items */}
  <ul className="space-y-1.5">
    {/* Optional Menu Header */}
    <div className="px-3 mb-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">
      Navigation
    </div>

     <li>
      <Link
      to={`/myprofile/${caregiverId}`}
        className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-slate-800 hover:text-white transition-all duration-200 group text-sm font-medium"
      >
        <UserCheck className="w-5 h-5 text-slate-400 group-hover:text-indigo-400 transition-colors" />
        <span>My Profile</span>
      </Link>
    </li>
    <li>
      <Link
      to={`/quize/${caregiverId}/5`}
        className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-slate-800 hover:text-white transition-all duration-200 group text-sm font-medium"
      >
        <LayoutDashboard className="w-5 h-5 text-slate-400 group-hover:text-indigo-400 transition-colors" />
        <span>Take Assessment</span>
      </Link>
    </li>
     <li>
      <Link
      to={`/CertificateList/${caregiverId}`}
        className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-slate-800 hover:text-white transition-all duration-200 group text-sm font-medium"
      >
        <ClipboardCheck className="w-5 h-5 text-slate-400 group-hover:text-indigo-400 transition-colors" />
        <span>My Certificate</span>
      </Link>
    </li>
     <li>
      <Link
      to={`/editonboarding/${caregiverId}`}
        className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-slate-800 hover:text-white transition-all duration-200 group text-sm font-medium"
      >
        <LayoutDashboard className="w-5 h-5 text-slate-400 group-hover:text-indigo-400 transition-colors" />
        <span>Update Details</span>
      </Link>
    </li>



    
  </ul>

  {/* Bottom/Footer Menu Items */}
  <ul className="space-y-1.5 pt-4 border-t border-slate-800">
    <li>
      <Link
      to="/admin/users"
        className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-slate-800 hover:text-white transition-all duration-200 group text-sm font-medium"
      >
        <Settings className="w-5 h-5 text-slate-400 group-hover:text-indigo-400 transition-colors" />
        <span>Change Password</span>
      </Link>
      
    </li>
  </ul>
</nav>
{/* Content */}
      <main className="flex-grow p-6 bg-gray-100">
        <Outlet />
      </main>
    </div>
  );
};