import { Outlet, Link } from "react-router-dom";
import { Header } from "../Employer/Header";
import React, { useState } from "react";
import { 
  LayoutDashboard, 
  UserCheck, 
  ClipboardCheck, 
  Settings, 
  Users,
  ChevronDown,
  ChevronUp,
  File
} from 'lucide-react';

export const EmployerLayout = () => {
  // State to manage the open/close toggle of the Users dropdown menu
  const [isUsersOpen, setIsUsersOpen] = useState(false);

  return (
    <div className="flex min-h-screen">
      <Header />
      
      <nav className="w-64 bg-slate-900 h-screen p-4 text-slate-300 flex flex-col justify-between pt-25">
        
        {/* Upper Menu Items */}
        <ul className="space-y-1.5">
          {/* Optional Menu Header */}
          <div className="px-3 mb-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">
            Employer Panel
          </div>

          {/* Dashboard Link */}
          <li>
            <Link
              to="/emp/dashboard"
              className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-slate-800 hover:text-white transition-all duration-200 group text-sm font-medium"
            >
              <LayoutDashboard className="w-5 h-5 text-slate-400 group-hover:text-indigo-400 transition-colors" />
              <span>Dashboard</span>
            </Link>
          </li>

          {/* Collapsible Users Menu Section */}
       
 <li>
                  <Link
                    to="/emp/caregiverList" // Update your path accordingly
                    className="flex items-center gap-3 px-4 py-2.5 rounded-xl hover:bg-slate-800 hover:text-white transition-all duration-200 group text-sm font-medium"
                  >
                    <UserCheck className="w-4 h-4 text-slate-400 group-hover:text-indigo-400 transition-colors" />
                    <span>Care Givers</span>
                  </Link>
                </li>
         
          <li>
            <Link
              to="/emp/Allcertificate"
              className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-slate-800 hover:text-white transition-all duration-200 group text-sm font-medium"
            >
              <File className="w-5 h-5 text-slate-400 group-hover:text-indigo-400 transition-colors" />
              <span>Certificates</span>
            </Link>
          </li>
          <li>
            <Link
              to="/emp/questions"
              className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-slate-800 hover:text-white transition-all duration-200 group text-sm font-medium"
            >
              <LayoutDashboard className="w-5 h-5 text-slate-400 group-hover:text-indigo-400 transition-colors" />
              <span>Assessment Score</span>
            </Link>
          </li>
        </ul>

        {/* Bottom/Footer Menu Items */}
        <ul className="space-y-1.5 pt-4 border-t border-slate-800">
          <li>
            <Link
              to="/emp/users"
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