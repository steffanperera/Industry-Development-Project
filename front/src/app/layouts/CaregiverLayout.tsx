import { Outlet, Link } from "react-router-dom";

export const CaregiverLayout = () => {
  const caregiverId = sessionStorage.getItem("caregiverId");

  return (
    <div className="flex min-h-screen">

      {/* Sidebar */}
      <aside className="w-64 bg-[#4E9258] text-white p-4">
        <h2 className="text-lg font-bold mb-4">Hello!</h2>
        <ul className="space-y-2">
          <li><Link to="/myprofile">My Profile</Link></li>
          <li><Link to={`/certificate/` + caregiverId}>My Certificate</Link></li>
          <li><Link to="/admin/users">Change Password</Link></li>
          <li><Link to="/Logout">Logout</Link></li>
        </ul>
      </aside>

      {/* Content */}
      <main className="flex-grow p-6 bg-gray-100">
        <Outlet />
      </main>
    </div>
  );
};
