import React from 'react';

import Navbar from 'components/NavBars/AuthNavbar';
import FooterSmall from 'components/Footers/FooterSmall';

// views

export default function Auth({ children }) {
  return (
    <>
      <Navbar transparent />
      <main>
        <section className="relative w-full h-full py-40 min-h-screen">
          <div className="absolute top-0 w-full h-full bg-black bg-no-repeat bg-full" />
          {children}
          <FooterSmall absolute />
        </section>
      </main>
    </>
  );
}
