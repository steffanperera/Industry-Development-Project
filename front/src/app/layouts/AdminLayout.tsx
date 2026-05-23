import { Outlet, Link } from "react-router-dom";

export const AdminLayout = () => {
  return (
    <div className="flex min-h-screen">

      {/* Sidebar */}
      <aside className="w-64 bg-gray-800 text-white p-4">
        <h2 className="text-lg font-bold mb-4">Admin Panel</h2>
        <ul className="space-y-2">
          <li><Link to="/dashboard">Dashboard</Link></li>
          <li><Link to="/caregiverlist">Care Givers</Link></li>
          <li><Link to="/admin/users">Employers</Link></li>
          <li><Link to="/admin/questions">Questions</Link></li>
          <li><Link to="/admin/users">Users</Link></li>
        </ul>
      </aside>

      {/* Content */}
      <main className="flex-grow p-6 bg-gray-100">
        <Outlet />
      </main>
    </div>
  );
};
