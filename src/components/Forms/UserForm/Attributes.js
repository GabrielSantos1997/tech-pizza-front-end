import React from 'react';
import { ErrorMessage } from 'formik';


function Attributes({ handleBlur, values, handleChange, user, setFieldError }) {

  const labelClassName =
    'block uppercase text-blueGray-600 text-xs font-bold mb-2 w-min whitespace-nowrap ';
  return (
    <>
      <div className="w-full  px-4">
        <div className="relative w-full mb-3">
          <span className={labelClassName} htmlFor="name">
            Nome
          </span>
          <input
            autoComplete="nope"
            value={values.name}
            name="name"
            id="name"
            type="text"
            className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
            onChange={handleChange}
            onBlur={handleBlur}
          />

          <ErrorMessage
            component="p"
            className="text-red-500 mb-4 font-light text-xs"
            name="name"
          />
        </div>
      </div>

      <div className="w-full px-4">
        <div className="relative w-full mb-3">
          <span className={labelClassName} htmlFor="email">
            E-mail
          </span>
          <input
            autoComplete="nope"
            name="email"
            id="email"
            value={values.email}
            type="text"
            className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
            onBlur={handleBlur}
            onChange={(e) => {
              handleChange(e);
            }}
          />

          <ErrorMessage
            component="p"
            className="text-red-500 mb-4 font-light text-xs"
            name="email"
          />
        </div>
      </div>
    </>
  );
}

export default Attributes;
