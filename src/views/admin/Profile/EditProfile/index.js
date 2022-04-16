import React, { useRef, useState } from 'react';
import { Formik, ErrorMessage } from 'formik';
import { toast } from 'react-toastify';
import { useDispatch } from 'react-redux';

import useGet from 'services/hooks/useGet';
import api from 'services/api';
import { signInRequest } from 'store/modules/auth/actions';
import Attributes from 'components/Forms/UserForm/Attributes';
import { ModalButton } from 'components/Modals/Modal';
import Login from './Login';
import { schema } from './schema';

function ModalForm({ closeModal }) {
  const [openPassword, setOpenPassword] = useState();

  const [isAble, setIsAble] = useState();
  const dispatch = useDispatch();

  const closeLoginModal = useRef();
  const { data: user } = useGet({
    route: `/profile/show`,
  });

  const onSubmit = ({ values, setSubmitting }) => {
    const password = values.oldPassword;
    delete values.oldPassword;
    delete values.password;
    api
      .post('/profile/edit', values)
      .then(() => {
        dispatch(
          signInRequest({
            password,
            username: values.email,
          })
        );
        user.email = values.email;
        toast.success(`Seu perfil foi editado com sucesso.`);
      })
      .finally(() => {
        setSubmitting(false);
      });
  };
  const editPassword = ({ password, setSubmitting, setValues }) => {
    const path = '/profile/change-password';
    return api
      .post(path, { password })
      .then(() => {
        toast.success('Senha alterada com sucesso');
        setValues({
          password: '',
          confirmPassword: '',
          oldPassword: '',
        });
        closeModal();
      })
      .finally(() => {
        setSubmitting(false);
      });
  };

  const handleEdit = (values, { setValues, setSubmitting }) => {
    if (openPassword) {
      editPassword({ password: values.password, setSubmitting, setValues });
    } else {
      onSubmit({ values, setSubmitting });
    }
  };

  return (
    <>
      <main>
        {!!user && (
          <>
            <button
              className="bg-black text-white text-sm font-bold p-2 rounded shadow hover:shadow-md outline-none focus:outline-none ease-linear transition-all m-4 duration-150"
              type="button"
              onClick={() => {
                setOpenPassword(!openPassword);
              }}
            >
              {openPassword ? 'EDITAR PERFIL' : 'MUDAR SENHA'}
            </button>

            <Formik
              initialValues={{
                name: user?.name || '',
                email: user?.email || '',
                password: '',
                oldPassword: '',
                confirmPassword: '',
              }}
              validationSchema={schema(openPassword)}
              onSubmit={(
                values,
                { setSubmitting, setValues, setFieldError }
              ) => {
                const aux = { ...values };

                api
                  .post('/login/check', { username: user.email, password: aux.oldPassword })
                  .then(({ data }) => {
                    if (data.token) {
                      setIsAble(true);
                      closeLoginModal.current();
                      delete aux.confirmPassword;
                      handleEdit(aux, { setValues, setFieldError, setSubmitting });
                    }
                  })
                  .finally(() => {
                    setSubmitting(false);
                  })
                ;
              }}
            >
              {({
                values,
                handleChange,
                handleBlur,
                handleSubmit,
                setFieldError,
                isSubmitting,
              }) => (
                <form autoComplete="off" onSubmit={handleSubmit}>
                  <div className="flex flex-wrap">
                    {!openPassword ? (
                      <Attributes
                        setFieldError={setFieldError}
                        handleBlur={handleBlur}
                        handleChange={handleChange}
                        values={values}
                        user={user}
                      />
                    ) : (
                      <>
                        <div className="w-full lg:w-6/12 px-4">
                          <div className="relative w-full mb-3">
                            <label
                              className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                              htmlFor="email"
                            >
                              Senha
                              <input
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
                              htmlFor="email"
                            >
                              Confirme a senha
                              <input
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
                    )}
                  </div>

                  <hr className="my-2 border-b-1 border-blueGray-300" />
                  <div className="flex justify-end w-full mt-2">
                    <ModalButton
                      buttonContent="Salvar alterações"
                      title="Confirme seus dados"
                      className="bg-black text-white text-sm font-bold p-2 rounded shadow hover:shadow-md outline-none focus:outline-none ease-linear transition-all duration-150"
                    >
                      <Login
                        isSubmitting={isSubmitting}
                        handleChange={handleChange}
                        handleBlur={handleBlur}
                        values={values}
                        openPassword={openPassword}
                        closeLoginModal={closeLoginModal}
                      />
                    </ModalButton>
                  </div>
                </form>
              )}
            </Formik>
          </>
        )}
      </main>
    </>
  );
}

export default ModalForm;
