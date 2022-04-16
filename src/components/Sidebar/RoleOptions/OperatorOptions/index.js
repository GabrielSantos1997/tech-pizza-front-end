import React from 'react';
import { Link, useLocation } from 'react-router-dom';

export default function OperatorOptions() {
  const { pathname, search } = useLocation();
  const route = pathname + search;

  return (
    <>
      <h6 className="md:min-w-full text-gray-500 text-xs uppercase font-bold block pt-1 pb-4 no-underline">
        Spot
      </h6>

      <ul className="md:flex-col md:min-w-full flex flex-col list-none">
        <li className="items-center">
          <Link
            className={`text-xs uppercase py-3 font-bold block ${
              route === '/operator/spots'
                ? 'text-black'
                : 'text-gray-700 hover:text-gray-500'
            }`}
            to="/operator/spots"
          >
            <i
              className={`fas fa-list mr-2 text-sm ${
                route === '/operator/spots'
                  ? 'opacity-75'
                  : 'text-gray-300'
              }`}
            />{' '}
            Listar
          </Link>
        </li>
      </ul>
    </>
  );
}
