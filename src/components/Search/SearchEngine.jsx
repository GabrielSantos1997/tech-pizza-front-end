import React, { useState } from 'react';
import { Formik } from 'formik';
import { ClipLoader } from 'react-spinners';
import { useDispatch, useSelector } from 'react-redux';
import CurrencyInput from "react-currency-input";

import api from 'services/api';
import { getValuesFormatted } from 'utils/format/formikValues';
import { removeFilter, updateFilter } from 'store/modules/filter/actions';
import Select from 'components/Forms/Select';
import ConsultationByPeriod from 'components/Forms/Period';
import Card from 'components/Cards/Card';
import { useProfile } from 'services/profile/getProfile';
import PeriodTabs from './PeriodTabs';
import { readable } from '../../utils/status';
import DatePicker from 'components/Forms/DatePicker';
import ReactTooltip from 'react-tooltip';

const SearchEngine = ({ role, fields, meta }) => {
  // format fields
  const fieldsValue = fields.reduce((acc, v) => ({ ...acc, [v]: true }), {});
  const [statusList, setStatusList] = useState();
  const [backgroundOptions, setBackgroundOptions] = useState([]);
  const [period, setPeriod] = useState();
  const [openTabTime, setOpenTabTime] = useState(1);
  const [operators, setOperators] = useState();
  const { isManager } = useProfile();

  const arrayField = [];

  const dispatch = useDispatch();
  const filter = useSelector((state) => state.filter.value);

  const setSearch = (values) => {
    dispatch(updateFilter(values));
  };

  return (
    <Card color="light">
      <ReactTooltip />
      <Formik
        enableReinitialize
        initialValues={{
          search: filter.search || '',
          name: filter.name || '',
          email: filter.email || '',
          modality: filter.modality || '',
          occupation: filter.occupation || '',
          code: filter.code || '',
        }}
        onSubmit={(values, { setSubmitting }) => {
          setTimeout(() => {
            setSubmitting(false);
          }, 1000);
          const auxValues = getValuesFormatted({ ...values, ...period });

          arrayField.forEach((field) => {
            if (auxValues[field]) {
              auxValues[field] = [auxValues[field]];
            }
          });
          setSearch(auxValues);
        }}
      >
        {({
          values,
          isSubmitting,
          handleChange,
          resetForm,
          handleBlur,
          handleSubmit,
          setFieldValue,
        }) => (
          <form
            autoComplete="off"
            className=" flex flex-col  w-full"
            onSubmit={handleSubmit}
          >
            <div className="mt-4 mb-2 flex flex-wrap self-stretch w-full">
              {fieldsValue?.search && (
                <div className="w-full lg:w-6/12 px-4">
                  <div className="relative w-full mb-3">
                    <label
                      className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                      htmlFor="search"
                    >
                      Busca geral
                      <input
                        id="search"
                        name="search"
                        value={values.search}
                        className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                        onChange={handleChange}
                        onBlur={handleBlur}
                      />
                    </label>
                  </div>
                </div>
              )}
              {fieldsValue?.name && (
                <div className="w-full lg:w-6/12 px-4">
                  <div className="relative w-full mb-3">
                    <label
                      className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                      htmlFor="name"
                    >
                      Nome
                      <input
                        name="name"
                        value={values.name}
                        type="text"
                        className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                        onChange={handleChange}
                        onBlur={handleBlur}
                      />
                    </label>
                  </div>
                </div>
              )}
              {fieldsValue?.email && (
                <div className="w-full lg:w-6/12 px-4">
                  <div className="relative w-full mb-3">
                    <label
                      className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                      htmlFor="email"
                    >
                      E-mail
                      <input
                        name="email"
                        value={values.email}
                        type="email"
                        className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                        onChange={handleChange}
                        onBlur={handleBlur}
                      />
                    </label>
                  </div>
                </div>
              )}
              {fieldsValue?.occupation && (
                <div className="w-full lg:w-6/12 px-4">
                  <div className="relative w-full mb-3">
                    <label
                      className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                      htmlFor="occupation"
                    >
                      Ocupação
                      <Select
                        handleBlur={handleBlur}
                        name="occupation"
                        placeholder=""
                        setFieldValue={setFieldValue}
                        value={values.occupation}
                        options={[
                          { value: "UNSPECIFIED", label: 'NÃO ESPECIFICADO' },
                          { value: "PIZZAMAKER", label: 'PIZZAIOLO' },
                          { value: "CLERK", label: "ATENDENTE" },
                          { value: "DELIVERYMAN", label: "ENTREGADOR" },
                          { value: "CLEANING", label: "LIMPEZA" },
                        ]}
                      />
                    </label>
                  </div>
                </div>
              )}
              {fieldsValue?.code && (
                <div className="w-full lg:w-6/12 px-4">
                  <div className="relative w-full mb-3">
                    <label
                      className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                      htmlFor="code"
                    >
                      Código
                      <input
                        name="code"
                        value={values.code}
                        type="text"
                        className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                        onChange={handleChange}
                        onBlur={handleBlur}
                      />
                    </label>
                  </div>
                </div>
              )}
            </div>
            <div className="flex  justify-between">
              <p className="self-end block uppercase text-blueGray-500 text-xs font-bold ">
                {meta && (
                  <>
                    Mostrando {meta?.item_count} de {meta?.total_count}
                  </>
                )}
              </p>

              <div>
                <button
                  className="bg-red-400 text-white  text-xs font-bold uppercase px-4 py-2 rounded outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                  type="button"
                  onClick={() => {
                    resetForm();
                    setOpenTabTime(1);
                  }}
                >
                  Limpar filtros
                </button>
                <button
                  disabled={isSubmitting}
                  className="bg-lightBlue-500 text-white active:bg-indigo-600 text-xs font-bold uppercase px-4 py-2 rounded outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                  type="submit"
                  onClick={handleSubmit}
                >
                  {isSubmitting ? (
                    <ClipLoader size={15} color="#fff" />
                  ) : (
                    'Filtrar'
                  )}
                </button>
              </div>
            </div>
          </form>
        )}
      </Formik>
    </Card>
  );
};

export default SearchEngine;
