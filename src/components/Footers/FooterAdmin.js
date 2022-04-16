import React from 'react';

export default function FooterAdmin() {
  return (
    <>
      <footer className="block py-4">
        <div className="container mx-auto px-4">
          <hr className="mb-4 border-b-1 border-blueGray-200" />
          <div className="flex flex-wrap items-center justify-end">
            <div className="text-sm text-blueGray-500">
              <a
                href="https://topnode.com.br"
                className="text-blueGray-500 hover:text-blueGray-800 text-sm block py-1 px-3"
              >
                <>
                  Made with love by{' '}
                  <span className="font-semibold">top(node)</span>
                </>
              </a>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}
