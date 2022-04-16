import React, { useEffect } from 'react';
import { ErrorMessage } from 'formik';
import { ClipLoader } from 'react-spinners';

function Login({
  values,
  isSubmitting,
  handleBlur,
  handleChange,
  openPassword,
  closeLoginModal,
  closeModal,
}) {
  useEffect(() => {
    closeLoginModal.current = closeModal;
  }, []);

  return (
    <>
      <div className="w-full px-4">
        <div className="relative w-full mb-3">
          <label
            className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
            htmlFor="email"
          >
            {openPassword ? 'Senha Antiga' : 'Senha'}
            <input
              name="oldPassword"
              value={values.oldPassword}
              type="password"
              className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
              onChange={handleChange}
              onBlur={handleBlur}
            />
          </label>
          <ErrorMessage
            component="p"
            className="text-red-500 mb-4 font-light text-xs"
            name="oldPassword"
          />
        </div>
      </div>
      <div className="flex justify-end w-full mt-2">
        <button
          disabled={isSubmitting}
          className="bg-black text-white text-sm font-bold p-2 rounded shadow hover:shadow-md outline-none focus:outline-none ease-linear transition-all duration-150"
          type="submit"
        >
          {isSubmitting ? <ClipLoader color="#fff" /> : 'CONFIRMA'}
        </button>
      </div>
    </>
  );
}

export default Login;
