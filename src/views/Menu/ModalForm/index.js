import React, { useEffect, useState } from 'react';
import { Formik } from 'formik';
import { toast } from 'react-toastify';
import { ClipLoader } from 'react-spinners';

import useGet from 'services/hooks/useGet';
import api from 'services/api';
import { getValuesFormatted } from 'utils/format/formikValues';
import Password from 'components/Forms/UserForm/Password';
import Tabs from 'components/Tabs';
import { schema } from './schema';
import { ErrorMessage } from 'formik';
import CurrencyInput from "react-currency-input";

function ModalForm({
  closeModal,
  onSuccess = () => {},
  selected,
}) {
  const [openTab, setOpenTab] = useState(selected.identifier ? 1 : 0);
  const [updates, setUpdates] = useState([]);

  const { data: metaField, getEntity } = useGet({
    route: `/meta-field/${selected.identifier}/show`,
    isAutomatic: false,
  });

  useEffect(() => {
    if (selected.identifier) getEntity();
    getUpdates();
  }, []);

  const onSubmit = ({ values, setSubmitting }) => {
    api
      .post(`meta-field/${selected.identifier}/edit`, values)
      .then((e) => {
        toast.success(`Dado editado com sucesso`);
        onSuccess();
        closeModal();
      })
      .catch(() => {
        setSubmitting(false);
      })
      .finally(() => {
        if (selected.identifier) {
          setSubmitting(false);
        }
      });
  };

  const getUpdates = () => {
    api
      .get(`/meta-field/${selected.modality ? selected.modality.replaceAll('_', '-').toLowerCase() : 'all'}/list-update`)
      .then((response) => {
        setUpdates(response.data)
      })
  };

  return (
    <>
      {(selected.identifier) && (
        <>
          <Formik
            enableReinitialize
            initialValues={{
              valueAsNumber: metaField?.valueAsNumber ?? '',
            }}
            onSubmit={(values, { setSubmitting, setFieldError }) => {
              let newValues = {
                ...values,
                valueAsText: selected.valueAsText,
                valueAsNumber: values.valueAsNumber * 100,
                populaTedBy: values.populaTedBy,
                modality: selected.modality,
                oxStage: selected.oxStage,
              };

              if (!values.valueAsNumber) {
                setSubmitting(false);
                return setFieldError("valueAsNumber", "Campo obrigatório");
              }

              const aux = getValuesFormatted(newValues);
              onSubmit({ values: aux, setSubmitting });
            }}
          >
            {({
              values,
              handleChange,
              handleBlur,
              setFieldValue,
              handleSubmit,
              setFieldError,
              isSubmitting,
            }) => (
              <form
                style={selected.identifier ? { minHeight: 210, maxWidth: 600 } : {}}
                className="flex flex-wrap sm:w-full "
                autoComplete="off"
                onSubmit={handleSubmit}
              >
                <div className="w-full px-4 mt-5">
                  <div className="relative w-full mb-3">
                    <span className='block uppercase text-blueGray-600 text-xs font-bold mb-2 w-min whitespace-nowrap' htmlFor="valueAsText">
                      {selected.valueAsText}
                    </span>
                    <CurrencyInput
                        className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150 form-control"
                        type="text"
                        decimalSeparator=","
                        thousandSeparator="."
                        precision="2"
                        onChange={(maskedvalue, floatvalue, event) => {
                            handleChange(event);
                            setFieldValue("valueAsNumber", floatvalue)
                        }}
                        onBlur={handleBlur}
                        allowEmpty={false}
                        value={values.valueAsNumber}
                        name="valueAsNumber"
                    />
                    <ErrorMessage
                      component="p"
                      className="text-red-500 mb-4 font-light text-xs"
                      name="valueAsNumber"
                    />
                  </div>
                </div>
                <div className="w-full px-4 mt-5">
                  <div className="relative w-full mb-3">
                    <span className='block uppercase text-blueGray-600 text-xs font-bold mb-2 w-min whitespace-nowrap'>
                      Histórico de alterações
                    </span>
                    <table className="items-center w-full bg-transparent border-collapse">
                        <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">Data de Referência</th>
                        <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">Valor</th>
                        <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">Alterado por</th>
                      <tbody>
                        {updates.length > 0 && updates?.map((update) => (
                          <tr>
                            <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">{update.date}</td>
                            <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">{update.value}</td>
                            <td className="border-t-0 px-6 align-middle border-l-0 
                            border-r-0 text-xs whitespace-nowrap p-4">{update.updatedBy}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
                <div className="flex mt-3 justify-center px-4">
                    <small className="mt-1 ml-1">
                      Mostrando {updates.length} atualizações
                    </small>
                </div>
                <div className="flex justify-end self-end w-full mt-2">
                  <button
                    disabled={values?.valueAsNumber * 100 === metaField?.valueAsNumber * 100}
                    className="bg-black text-white text-sm font-bold p-2 rounded shadow hover:shadow-md outline-none focus:outline-none ease-linear transition-all duration-150"
                    type="submit"
                  >
                    {isSubmitting ? (
                      <ClipLoader color="#fff" />
                    ) : (
                      <>{'SALVAR'}</>
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
