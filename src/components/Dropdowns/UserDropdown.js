import React from 'react';
import { createPopper } from '@popperjs/core';
import { Link } from 'react-router-dom';

import { Logout } from 'services/api';

const UserDropdown = () => {
  // dropdown props
  const [dropdownPopoverShow, setDropdownPopoverShow] = React.useState(false);
  const btnDropdownRef = React.createRef();
  const popoverDropdownRef = React.createRef();
  const openDropdownPopover = () => {
    createPopper(btnDropdownRef.current, popoverDropdownRef.current, {
      placement: 'bottom-start',
    });
    setDropdownPopoverShow(true);
  };
  const closeDropdownPopover = () => {
    setDropdownPopoverShow(false);
  };
  return (
    <>
      <a
        className="text-blueGray-500 block"
        href="#pablo"
        ref={btnDropdownRef}
        onClick={(e) => {
          e.preventDefault();
          if (dropdownPopoverShow) closeDropdownPopover();
          else openDropdownPopover();
        }}
      >
        <div className="items-center flex">
          <span className="w-8 h-8 text-sm text-black bg-blueGray-200 inline-flex items-center justify-center rounded-full">
            <i className="fas fa-chevron-down" />
          </span>
        </div>
      </a>
      <div
        ref={popoverDropdownRef}
        className={`${
          dropdownPopoverShow ? 'absolute ' : 'hidden '
        }bg-white text-base z-50 py-2 list-none text-left rounded shadow-lg w-48`}
      >
        <Link
          to="/admin/profile"
          className="text-sm py-2 px-4 font-normal block w-full whitespace-nowrap bg-transparent text-blueGray-700"
        >
          Meu perfil
        </Link>

        <div className="h-0 my-2 border border-solid border-blueGray-100" />
        <button
          type="button"
          className="text-sm py-2 px-4 font-normal block  whitespace-nowrap bg-transparent text-blueGray-700"
          onClick={() => Logout()}
        >
          Sair
        </button>
      </div>
    </>
  );
};

export default UserDropdown;
