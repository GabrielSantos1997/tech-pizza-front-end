import React, { useEffect, useState } from 'react';
import { ErrorMessage, Formik } from 'formik';
import { toast } from 'react-toastify';
import { ClipLoader } from 'react-spinners';
import api from 'services/api';
import { getValuesFormatted } from 'utils/format/formikValues';
import * as yup from 'yup';

function ModalForm({
  closeModal,
  onSuccess = () => {},
  identifier: userIdentifier,
  modality,
}) {
  const [lastText, setLastText] = useState('');
  
  useEffect(() => {
    api.get(`policy/${modality}/show`)
    .then(res => {
      setLastText(res.data.text);
    })
  }, []);

  return (
    <>
      <Formik
        enableReinitialize
        initialValues={{
          text: lastText,
        }}
        validationSchema={yup.object().shape({
          text: yup.string().required('Campo obrigatório.'),
        })}
        onSubmit={(values, { setSubmitting }) => {
          api
            .post(`adm/policy/${modality}/new`, getValuesFormatted(values))
            .then((e) => {
              toast.success(
                `Cadastrado feito com sucesso`
              );
              onSuccess();
              closeModal();
            })
            .catch(() => {
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
          isSubmitting,
        }) => (
          <form
            className="flex flex-wrap sm:w-full "
            autoComplete="off"
            onSubmit={handleSubmit}
          >
            <div className="w-full px-4">
              <div className="relative w-full mb-3">
                <span>
                  Texto
                </span>
                <textarea
                  autoComplete="nope"
                  value={values.text}
                  name="text"
                  id="name"
                  className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                  onChange={handleChange}
                  onBlur={handleBlur}
                />

                <ErrorMessage
                  component="p"
                  className="text-red-500 mb-4 font-light text-xs"
                  name="text"
                />
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
                ) : 'ADICIONAR' }
              </button>
            </div>
          </form>
        )}
      </Formik>
    </>
  );
}

export default ModalForm;
