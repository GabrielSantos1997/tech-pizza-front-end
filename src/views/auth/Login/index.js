import React, { useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { Formik, ErrorMessage } from 'formik';
import { ClipLoader } from 'react-spinners';
import ReCAPTCHA from 'react-google-recaptcha';
import { ReactComponent as Logo } from '../../../assets/img/logo.svg';
import { signInRequest } from 'store/modules/auth/actions';
import { initialValues, schema } from './formConfig';

export default function Login() {
  const recaptchaRef = useRef();
  const dispatch = useDispatch();
  const { isLoading, responseError } = useSelector((state) => state.auth);
  const siteKey = process.env.REACT_APP_SITE_KEY;

  return (
    <>
      <div className="container mx-auto px-4 h-full">
        <div className="flex content-center items-center justify-center h-full">
          <div className="w-full lg:w-4/12 px-4">
            <div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-white border-0">
              <div className="flex-auto px-4 lg:px-10 py-10 pt-0 mt-10">
                {/*<Logo style={{margin: 'auto', marginBottom: '30px'}} />*/}
                <Formik
                  initialValues={initialValues}
                  validationSchema={schema}
                  onSubmit={(values, { setSubmitting }) => {
                    setSubmitting(false);
                    dispatch(signInRequest(values));
                  }}
                >
                  {({
                    handleChange,
                    handleBlur,
                    handleSubmit,
                    setFieldValue,
                  }) => (
                    <form onSubmit={handleSubmit}>
                      <div className="relative w-full mb-3">
                        <label
                          className="block uppercase text-gray-600 text-xs font-bold mb-2"
                          htmlFor="grid-password"
                        >
                          Usuário
                          <input
                            onChange={handleChange}
                            onBlur={handleBlur}
                            type="text"
                            name="username"
                            className="border-0 px-3 py-3 placeholder-gray-300 text-gray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                            placeholder="Usuário"
                          />
                        </label>
                        <ErrorMessage
                          component="p"
                          className="text-red mb-4 font-light text-xs"
                          name="username"
                        />
                      </div>

                      <div className="relative w-full mb-3">
                        <label
                          className="block uppercase text-gray-600 text-xs font-bold mb-2"
                          htmlFor="grid-password"
                        >
                          Senha
                          <input
                            onChange={handleChange}
                            onBlur={handleBlur}
                            name="password"
                            type="password"
                            className="border-0 px-3 py-3 placeholder-gray-300 text-gray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                            placeholder="Password"
                          />
                        </label>
                        <ErrorMessage
                          component="p"
                          className="text-red mb-4 font-light text-xs"
                          name="password"
                        />
                      </div>
                      <div className="relative w-full mb-3">
                        <ReCAPTCHA
                          className="g-recaptcha"
                          ref={recaptchaRef}
                          name="recaptcha_token"
                          sitekey={siteKey}
                          onChange={(response) =>
                            setFieldValue('recaptcha_token', response)
                          }
                        />

                        <ErrorMessage
                          component="p"
                          className="text-red mb-4 font-light text-xs"
                          name="recaptcha_token"
                        />
                      </div>

                      <div className="text-center mt-6">
                        <button
                          disabled={isLoading}
                          className="bg-black text-white text-sm font-bold uppercase px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 w-full ease-linear transition-all duration-150"
                          type="submit"
                        >
                          {isLoading ? (
                            <ClipLoader size={12} color="white" />
                          ) : (
                            'Entrar'
                          )}
                        </button>
                      </div>
                    </form>
                  )}
                </Formik>
              </div>
            </div>
            <div className="flex flex-wrap mt-6 relative">
              <div className="w-1/2">
                <Link to="/forgotPassword" className="text-gray-200">
                  <small>Esqueceu sua senha?</small>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
