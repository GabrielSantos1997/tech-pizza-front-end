import React from 'react';

// components

import AdminNavbar from 'components/NavBars/AdminNavbar';
import Sidebar from 'components/Sidebar/Sidebar';

import FooterAdmin from 'components/Footers/FooterAdmin';

// views

export default function Admin({ children }) {
  return (
    <>
      <Sidebar />
      <div className="relative md:ml-64 flex flex-col min-h-screen justify-between bg-blueGray-100">
        <AdminNavbar />
        {/* Header */}

        {children}
        <FooterAdmin />
      </div>
    </>
  );
}
