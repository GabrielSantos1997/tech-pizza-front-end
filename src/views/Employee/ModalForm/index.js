import React, { useEffect, useState } from 'react';
import { Formik, ErrorMessage } from 'formik';
import { toast } from 'react-toastify';
import { ClipLoader } from 'react-spinners';
import Select from 'components/Forms/Select';

import useGet from 'services/hooks/useGet';
import api from 'services/api';
import { getValuesFormatted } from 'utils/format/formikValues';
import Attributes from 'components/Forms/UserForm/Attributes';
import Password from 'components/Forms/UserForm/Password';
import Tabs from 'components/Tabs';
import { schema } from './schema';

function ModalForm({
  closeModal,
  onSuccess = () => {},
  identifier: userIdentifier,
}) {
  const [openTab, setOpenTab] = useState(userIdentifier ? 1 : 0);

  const { data: employee, getEntity } = useGet({
    route: `/employee/${userIdentifier}/show`,
    isAutomatic: false,
  });

  useEffect(() => {
    if (userIdentifier) getEntity();
  }, []);

  const onSubmit = ({ values, setSubmitting }) => {
    const path = userIdentifier
      ? `employee/${userIdentifier}/edit`
      : `employee/new`;
    api
      .post(path, values)
      .then((e) => {
        toast.success(
          `Funcionário ${userIdentifier ? 'editado' : 'criado'} com sucesso`
        );
        onSuccess();
        closeModal();
      })
      .catch(() => {
        setSubmitting(false);
      })
  };

  return (
    <>
      {(!userIdentifier || (userIdentifier && !!employee)) && (
        <>
          <Formik
            enableReinitialize
            initialValues={{
              name: employee?.name ?? '',
              email: employee?.email ?? '',
              phoneNumber: employee?.phoneNumber ?? '',
              occupation: employee?.occupation ?? { value: "UNSPECIFIED", label: 'NÃO ESPECIFICADO' },
            }}
            validationSchema={schema}
            onSubmit={(values, { setSubmitting }) => {
              const aux = getValuesFormatted(values);

              onSubmit({ values: aux, setSubmitting });
            }}
          >
            {({
              values,
              errors,
              handleChange,
              handleBlur,
              setFieldValue,
              handleSubmit,
              setFieldError,
              isSubmitting,
            }) => (
              <form
                style={userIdentifier ? { minHeight: 210, maxWidth: 600 } : {}}
                className="flex flex-wrap sm:w-full "
                autoComplete="off"
                onSubmit={handleSubmit}
              >
                <div className="flex flex-wrap">
                  <div className="w-full md:w-1/2 px-4">
                    <div className="relative w-full mb-3">
                      <label
                        className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                        htmlFor="name"
                        data-tip="Escolha o nome do seu spot. (ex: Spot promoção verão 2022)."
                      >
                        Nome
                      </label>
                      <input
                        value={values.name}
                        name="name"
                        type="text"
                        maxLength="255"
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
                  <div className="w-full md:w-1/2 px-4">
                    <div className="relative w-full mb-3">
                      <label
                        className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                        htmlFor="email"
                        data-tip="Escolha o nome do seu spot. (ex: Spot promoção verão 2022)."
                      >
                        Email
                      </label>
                      <input
                        value={values.email}
                        name="email"
                        type="text"
                        maxLength="255"
                        className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                        onChange={handleChange}
                        onBlur={handleBlur}
                      />
                      <ErrorMessage
                        component="p"
                        className="text-red-500 mb-4 font-light text-xs"
                        name="email"
                      />
                    </div>
                  </div>
                  <div className="w-full md:w-1/2 px-4">
                    <div className="relative w-full mb-3">
                      <label
                        className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                        htmlFor="phoneNumber"
                        data-tip="Escolha o nome do seu spot. (ex: Spot promoção verão 2022)."
                      >
                        Telefone
                      </label>
                      <input
                        value={values.phoneNumber}
                        name="phoneNumber"
                        type="text"
                        maxLength="255"
                        className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                        onChange={handleChange}
                        onBlur={handleBlur}
                      />
                      <ErrorMessage
                        component="p"
                        className="text-red-500 mb-4 font-light text-xs"
                        name="phoneNumber"
                      />
                    </div>
                  </div>
                  <div className="w-full md:w-1/2 px-4">
                    <div className="relative w-full mb-3">
                      <label
                        className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                        htmlFor="occupation"
                        data-tip="Escolha a duração do seu spot (30s, 45s ou 60s). Caso a duração do seu texto (incluindo o tempo de entrada da voz) seja maior do que a duração selecionada, ele será cortado."
                      >
                        Ocupação
                      </label>
                      <Select
                        handleBlur={handleBlur}
                        name="occupation"
                        className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                        placeholder=""
                        setFieldValue={setFieldValue}
                        value={values.occupation}
                        isClearable={false}
                        // onChange={}
                        options={[
                          { value: "UNSPECIFIED", label: 'NÃO ESPECIFICADO' },
                          { value: "PIZZAMAKER", label: 'PIZZAIOLO' },
                          { value: "CLERK", label: "ATENDENTE" },
                          { value: "DELIVERYMAN", label: "ENTREGADOR" },
                          { value: "CLEANING", label: "LIMPEZA" },
                        ]}
                      />
                      {errors.occupation && 
                        <ErrorMessage
                          component="p"
                          className="text-red-500 mb-4 font-light text-xs"
                          name="occupation"
                        />
                      }
                    </div>
                  </div>
                </div>
                <div className="flex justify-end self-end w-full mt-2">
                  <button
                    disabled={isSubmitting}
                    className="bg-black text-white text-sm font-bold p-2 rounded shadow hover:shadow-md outline-none focus:outline-none ease-linear transition-all duration-150"
                    type="submit"
                  >
                    {isSubmitting ? (
                      <ClipLoader color="#fff" />
                    ) : (
                      <>{userIdentifier ? 'EDITAR' : 'ADICIONAR'}</>
                    )}
                  </button>
                </div>
              </form>
            )}
          </Formik>
        </>
      )}
    </>
  );
}

export default ModalForm;
