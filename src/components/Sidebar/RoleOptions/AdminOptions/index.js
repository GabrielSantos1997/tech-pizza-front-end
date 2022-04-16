import React from 'react';
import { Link, useLocation } from 'react-router-dom';

export default function AdminOptions() {
  const { pathname, search } = useLocation();
  const route = pathname + search;

  return (
    <>
      <h6 className="md:min-w-full text-gray-500 text-xs uppercase font-bold block pt-1 pb-4 no-underline">
        Usuários
      </h6>
      <ul className="md:flex-col md:min-w-full flex flex-col list-none">
        <li className="items-center">
          <Link
            className={`text-xs uppercase py-3 font-bold block ${
              route === '/users/admin'
                ? 'text-black'
                : 'text-gray-700 hover:text-gray-500'
            }`}
            to="/users/admin"
          >
            <i
              className={`fas fa-user mr-2 text-sm ${
                route === '/users/admin'
                  ? 'opacity-75'
                  : 'text-gray-300'
              }`}
            />{' '}
            Administradores
          </Link>
        </li>
      </ul>
      <hr className="my-4 border-b-1 border-gray-300" />
      <h6 className="md:min-w-full text-gray-500 text-xs uppercase font-bold block pt-1 pb-4 no-underline">
        Funcionários
      </h6>
      <ul className="md:flex-col md:min-w-full flex flex-col list-none">
        <li className="items-center">
          <Link
            className={`text-xs uppercase py-3 font-bold block ${
              route === '/employee'
                ? 'text-black'
                : 'text-gray-700 hover:text-gray-500'
            }`}
            to="/employee"
          >
            <i
              className={`fas fa-users mr-2 text-sm ${
                route === '/employee'
                  ? 'opacity-75'
                  : 'text-gray-300'
              }`}
            />{' '}
            Listagem
          </Link>
        </li>
      </ul>
      <hr className="my-4 border-b-1 border-gray-300" />
      <h6 className="md:min-w-full text-gray-500 text-xs uppercase font-bold block pt-1 pb-4 no-underline">
        Clientes
      </h6>
      <ul className="md:flex-col md:min-w-full flex flex-col list-none">
        <li className="items-center">
          <Link
            className={`text-xs uppercase py-3 font-bold block ${
              route === '/client'
                ? 'text-black'
                : 'text-gray-700 hover:text-gray-500'
            }`}
            to="/client"
          >
            <i
              className={`fas fa-list-alt mr-2 text-sm ${
                route === '/client'
                  ? 'opacity-75'
                  : 'text-gray-300'
              }`}
            />{' '}
            Listagem
          </Link>
        </li>
      </ul>
      <hr className="my-4 border-b-1 border-gray-300" />
      <h6 className="md:min-w-full text-gray-500 text-xs uppercase font-bold block pt-1 pb-4 no-underline">
        Cardápio
      </h6>
      <ul className="md:flex-col md:min-w-full flex flex-col list-none">
        <li className="items-center">
          <Link
            className={`text-xs uppercase py-3 font-bold block ${
              route === '/menu'
                ? 'text-black'
                : 'text-gray-700 hover:text-gray-500'
            }`}
            to="/menu"
          >
            <i
              className={`fas fa-cheese mr-2 text-sm ${
                route === '/menu'
                  ? 'opacity-75'
                  : 'text-gray-300'
              }`}
            />{' '}
            Listagem
          </Link>
        </li>
      </ul>
    </>
  );
}
