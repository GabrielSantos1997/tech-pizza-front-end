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
          valueAsText: filter.valueAsText || '',
          valueAsNumber: filter.valueAsNumber || '',
          valueAsDate: filter.valueAsDate || '',
          occupation: filter.occupation || '',
          codigo: filter.codigo || '',
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
                      occupation
                      <input
                        name="occupation"
                        value={values.occupation}
                        type="text"
                        className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                        onChange={handleChange}
                        onBlur={handleBlur}
                      />
                    </label>
                  </div>
                </div>
              )}
              {fieldsValue?.codigo && (
                <div className="w-full lg:w-6/12 px-4">
                  <div className="relative w-full mb-3">
                    <label
                      className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                      htmlFor="codigo"
                    >
                      Código
                      <input
                        name="codigo"
                        value={values.codigo}
                        type="text"
                        className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                        onChange={handleChange}
                        onBlur={handleBlur}
                      />
                    </label>
                  </div>
                </div>
              )}
              {fieldsValue?.valueAsText && (
                <div className="w-full lg:w-6/12 px-4">
                  <div className="relative w-full mb-3">
                    <label
                      className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                      htmlFor="valueAsText"
                    >
                      Texto
                      <input
                        name="valueAsText"
                        value={values.valueAsText}
                        type="valueAsText"
                        className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                        onChange={handleChange}
                        onBlur={handleBlur}
                      />
                    </label>
                  </div>
                </div>
              )}
              {fieldsValue?.valueAsNumber && (
                <div className="w-full lg:w-6/12 px-4">
                  <div className="relative w-full mb-3">
                    <label
                      className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                      htmlFor="valueAsNumber"
                    >
                      Valor do campo
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
                    </label>
                  </div>
                </div>
              )}
              {fieldsValue?.modality && (
                <div className="w-full lg:w-6/12 px-4">
                  <div className="relative w-full mb-3">
                    <label
                      className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                      htmlFor="modality"
                    >
                      Código interno
                      <Select
                        handleBlur={handleBlur}
                        name="modality"
                        placeholder=""
                        setFieldValue={setFieldValue}
                        value={values.modality}
                        options={[
                          { value: 'GMD_SEQ', label: 'GMD_SEQ' },
                          { value: 'GMD_INT', label: 'GMD_INT' },
                          { value: 'GMD_CONF', label: 'GMD_CONF' },
                          { value: 'DIAS_SEQ', label: 'DIAS_SEQ' },
                          { value: 'DIAS_INT', label: 'DIAS_INT' },
                          { value: 'DIAS_CONF', label: 'DIAS_CONF' },
                          { value: 'CUSTO_FIXO_SEQ', label: 'CUSTO_FIXO_SEQ' },
                          { value: 'CUSTO_FIXO_INT', label: 'CUSTO_FIXO_INT' },
                          { value: 'CUSTO_FIXO_CONF', label: 'CUSTO_FIXO_CONF' },
                          { value: 'CUSTO_DIETA_SEQ', label: 'CUSTO_DIETA_SEQ' },
                          { value: 'CUSTO_DIETA_INT', label: 'CUSTO_DIETA_INT' },
                          { value: 'CUSTO_DIETA_CONF', label: 'CUSTO_DIETA_CONF' },
                          { value: 'AGIO', label: 'AGIO' },
                          { value: 'REND_CARC', label: 'REND_CARC' },
                          { value: 'BOI_GF_BMF', label: 'BACAINDX' },
                          { value: 'TIR', label: 'TIR' },
                          { value: 'PESO_DE_COMPRA', label: 'PESO_DE_COMPRA' },
                          { value: 'PESO_DE_COMPRA_QUILO', label: 'PESO_DE_COMPRA_QUILO' },
                          { value: 'PRECO_BOI_GORDO', label: 'PRECO_BOI_GORDO' },
                          { value: 'BEZERRO_CEPEA_GO', label: 'BACFGOIC' },
                          { value: 'BOI_CEPEA_GO', label: 'BACAGOIC' },
                          { value: 'MILHO_BMF', label: 'BAINCORN' },
                          { value: 'SOJA_CEPEA_PARANAGUA', label: 'BASMSBPA' },
                          { value: 'BOI_BEZERRO_CEPEA_GO', label: 'BOI_BEZERRO_CEPEA_GO' },
                          { value: 'CEPEA_SP_CEPEA_GO', label: 'CEPEA_SP_CEPEA_GO' },
                          { value: 'BOI_SC_MILHO_BMF_ARROBA', label: 'BACAIND_BAINCORN' },
                          { value: 'BOI_GORDO_BMF_1', label: 'BOI_GORDO_BMF_1' },
                          { value: 'BOI_GORDO_BMF_2', label: 'BOI_GORDO_BMF_2' },
                          { value: 'BOI_BMF_EM_USD_ARROBA', label: 'BOIBMFUSD' },
                          { value: 'BOI_AUS_EM_USD_ARROBA_1', label: 'EYCI$' },
                          { value: 'BOI_AUS_EM_USD_ARROBA_2', label: 'BOIAUSUSD2' },
                          { value: 'AUS_USD', label: 'AUS_USD' },
                          { value: 'BOI_USD_EM_USD_ARROBA', label: 'BOIAUSUSD' },
                          { value: 'CWT_BOI_US_EM_USD', label: 'CTCWTUSA' },
                          { value: 'BOI_US_EM_USD_ARROBA', label: 'CWT' },
                          { value: 'SOJA_CHICAGO_USD_BUSHEL', label: 'SOJA_CHICAGO_USD_BUSHEL' },
                          { value: 'SOJA_CHICAGO_USD_TON', label: 'SOJA_CHICAGO_USD_TON' },
                          { value: 'SOJA_CHICAGO_BRL_TON', label: 'SOJA_CHICAGO_BRL_TON' },
                          { value: 'SOJA_CHICAGO_BRL_60_KG', label: 'SOJA_CHICAGO_BRL_60_KG' },
                          { value: 'PREMIO_CEPEA_CBOT', label: 'PREMIO_CEPEA_CBOT' },
                        ]}
                      />
                    </label>
                  </div>
                </div>
              )}
              {fieldsValue?.valueAsDate && (
                <div className="w-full lg:w-6/12 px-4">
                  <div className="relative w-full mb-3">
                    <span
                      className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                      htmlFor="valueAsDate"
                    >
                      Período
                      <ConsultationByPeriod
                        search={period}
                        setSearch={(e) => {
                          delete period?.interval;
                          setPeriod(e);
                        }}
                      />
                    </span>
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
                    if (fieldsValue?.period) {
                      dispatch(updateFilter({ interval: 'today' }));
                    } else {
                      dispatch(removeFilter());
                    }
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
