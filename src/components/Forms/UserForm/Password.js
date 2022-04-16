import { ErrorMessage } from 'formik';
import React from 'react';

function Password({ handleBlur, values, handleChange }) {
  return (
    <>
      <div className="w-full lg:w-6/12 px-4">
        <div className="relative w-full mb-3">
          <label
            className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
            htmlFor="password"
          >
            Senha
            <input
              autoComplete="new-password"
              name="password"
              value={values.password}
              type="password"
              className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
              onChange={handleChange}
              onBlur={handleBlur}
            />
          </label>
          <ErrorMessage
            component="p"
            className="text-red-500 mb-4 font-light text-xs"
            name="password"
          />
        </div>
      </div>
      <div className="w-full lg:w-6/12 px-4">
        <div className="relative w-full mb-3">
          <label
            className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
            htmlFor="confirmPassword"
          >
            Confirme a senha
            <input
              autoComplete="new-password"
              name="confirmPassword"
              value={values.confirmPassword}
              type="password"
              className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
              onChange={handleChange}
              onBlur={handleBlur}
            />
          </label>
          <ErrorMessage
            component="p"
            className="text-red-500 mb-4 font-light text-xs"
            name="confirmPassword"
          />
        </div>
      </div>
    </>
  );
}

export default Password;
