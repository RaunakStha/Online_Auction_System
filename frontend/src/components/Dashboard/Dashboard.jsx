import React from 'react';
import { Link, Outlet } from 'react-router-dom';

function Dashboard() {
  return (
    <div className="flex">
      <nav className="bg-gray-800 w-64 px-4 py-8">
        {/* Sidebar navigation */}
        <div className="text-white mb-8">
          <h2 className="text-xl font-semibold mb-4">User Dashboard</h2>
          <ul className="space-y-2">
            <li>
              <Link to="/dashboard" className="block py-2 px-4 rounded hover:bg-gray-700">
                Bidding Details
              </Link>
            </li>
            <li>
              <Link to="/dashboard/orders/buying" className="block py-2 px-4 rounded hover:bg-gray-700">
                Orders
              </Link>
            </li>
            <li>
              <Link to="/dashboard/orders/selling" className="block py-2 px-4 rounded hover:bg-gray-700">
                Sold Products
              </Link>
            </li>
          </ul>
        </div>
      </nav>
      <div className="flex-grow p-8">
        {/* Render nested routes here */}
        <Outlet />
      </div>
    </div>
  );
}

export default Dashboard;