import React from 'react';

export default function FooterSmall({ absolute }) {
  return (
    <>
      <footer
        className={`${
          absolute ? 'absolute w-full bottom-0 bg-black' : 'relative'
        } pb-6`}
      >
        <div className="container mx-auto px-4">
          <hr className="mb-6 border-b-1 border-white" />
          <div className="flex flex-wrap items-center md:justify-between justify-center">
            <div className="w-full md:w-4/12 px-4">
              <div className="text-sm text-white font-semibold py-1 text-center md:text-left">
              Tech Pizzaria - {new Date().getFullYear()}{' '}
              </div>
            </div>
            <div className="w-full md:w-8/12 px-4">
              <ul className="flex flex-wrap list-none md:justify-end  justify-center">
                <li>
                  <a
                    href="https://topnode.com.br"
                    className="text-white hover:text-gray-300 text-sm block py-1 px-3"
                  >
                    <>
                      Made with love by{' '}
                      <span className="font-semibold">top(node)</span>
                    </>
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}
