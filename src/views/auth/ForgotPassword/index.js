import React, { useRef, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { Formik, ErrorMessage } from 'formik';
import { ClipLoader } from 'react-spinners';
import ReCAPTCHA from 'react-google-recaptcha';

import api from 'services/api';
import { toast } from 'react-toastify';
import {
  initialForgotPassword,
  initialChangePassword,
  schemaForgotPassword,
  schemaChangePassword,
} from './formConfig';

export default function Login() {
  const [stage, setStage] = useState(1);
  const recaptchaRef = useRef();
  const history = useHistory();

  const requestRecover = (data) => api.post(`/password-recover/request`, data);
  const sendRecover = (data) => api.post(`/password-recover/send`, data);

  const siteKey = process.env.REACT_APP_SITE_KEY;
  return (
    <>
      <div className="container mx-auto px-4 h-full">
        <div className="flex content-center items-center justify-center h-full">
          <div className="w-full lg:w-4/12 px-4">
            <div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-blueGray-200 border-0">
              <h6 className="text-blueGray-500 uppercase p-4 text-sm font-bold">
                Recuperar senha
              </h6>
              <div className="flex-auto px-4 lg:px-10 py-10 pt-0">
                {stage === 1 && (
                  <Formik
                    initialValues={initialForgotPassword}
                    validationSchema={schemaForgotPassword}
                    onSubmit={(values, { setSubmitting }) => {
                      requestRecover(values)
                        .then(() => {
                          setStage(stage + 1);
                        })
                        .finally(() => {
                          setSubmitting(false);
                        });
                    }}
                  >
                    {({
                      handleChange,
                      handleBlur,
                      handleSubmit,
                      isSubmitting,
                      setFieldValue,
                    }) => (
                      <form onSubmit={handleSubmit}>
                        <div className="relative w-full mb-3">
                          <label
                            className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                            htmlFor="grid-password"
                          >
                            Usuário
                            <input
                              onChange={handleChange}
                              onBlur={handleBlur}
                              name="username"
                              className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                              placeholder="usuário"
                            />
                          </label>
                          <ErrorMessage
                            component="p"
                            className="text-red mb-4 font-light text-xs"
                            name="username"
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
                            disabled={isSubmitting}
                            className="bg-blueGray-800 text-white active:bg-blueGray-600 text-sm font-bold uppercase px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 w-full ease-linear transition-all duration-150"
                            type="submit"
                          >
                            {isSubmitting ? (
                              <ClipLoader size={12} color="white" />
                            ) : (
                              'Enviar'
                            )}
                          </button>
                        </div>
                      </form>
                    )}
                  </Formik>
                )}
                {stage === 2 && (
                  <Formik
                    initialValues={initialChangePassword}
                    validationSchema={schemaChangePassword}
                    onSubmit={(values, { setSubmitting }) => {
                      setSubmitting(false);

                      sendRecover(values).then(() => {
                        toast.success('Sua senha foi modificada com sucesso!');
                        history.push('/');
                      });
                    }}
                  >
                    {({
                      handleChange,
                      handleBlur,
                      handleSubmit,
                      isSubmitting,
                      setFieldValue,
                    }) => (
                      <form onSubmit={handleSubmit}>
                        <div className="relative w-full mb-3">
                          <label
                            className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                            htmlFor="grid-password"
                          >
                            Código recebido por email
                            <input
                              onChange={handleChange}
                              onBlur={handleBlur}
                              name="code"
                              className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                              placeholder="Código"
                            />
                          </label>
                          <ErrorMessage
                            component="p"
                            className="text-red mb-4 font-light text-xs"
                            name="code"
                          />
                        </div>

                        <div className="relative w-full mb-3">
                          <label
                            className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                            htmlFor="grid-password"
                          >
                            Password
                            <input
                              onChange={handleChange}
                              onBlur={handleBlur}
                              name="password"
                              type="password"
                              className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
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
                          <label
                            className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                            htmlFor="grid-confirmPassword"
                          >
                            Confirme Password
                            <input
                              onChange={handleChange}
                              onBlur={handleBlur}
                              name="confirmPassword"
                              type="password"
                              className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                              placeholder="Password"
                            />
                          </label>
                          <ErrorMessage
                            component="p"
                            className="text-red mb-4 font-light text-xs"
                            name="confirmPassword"
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
                            disabled={isSubmitting}
                            className="bg-blueGray-800 text-white active:bg-blueGray-600 text-sm font-bold uppercase px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 w-full ease-linear transition-all duration-150"
                            type="submit"
                          >
                            {isSubmitting ? (
                              <ClipLoader size={12} color="white" />
                            ) : (
                              'Entrar'
                            )}
                          </button>
                        </div>
                      </form>
                    )}
                  </Formik>
                )}
              </div>
            </div>
            <div className="flex flex-wrap mt-6 relative">
              <div className="w-1/2">
                <Link to="/" className="text-blueGray-200">
                  <small>Já tenho uma conta</small>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
