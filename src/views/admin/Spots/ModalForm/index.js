import React, { useEffect, useState } from 'react';
import { Formik, ErrorMessage } from 'formik';
import { toast } from 'react-toastify';
import { ClipLoader } from 'react-spinners';

import useGet from 'services/hooks/useGet';
import api from 'services/api';
import { schema } from './schema';
import Select from 'components/Forms/Select';
import { useProfile } from 'services/profile/getProfile';
import ReactTooltip from 'react-tooltip';

function ModalForm({
  closeModal,
  onSuccess = () => {},
  identifier: spotIdentifier,
}) {
  const [backgroundOptions, setBackgroundOptions] = useState([]);
  const [userOptions, setUserOptions] = useState([]);
  const [speedLess10, setSpeedLess10] = useState(0);
  const [speedLess5, setSpeedLess5] = useState(0);
  const [speed0, setSpeed0] = useState(0);
  const [speedMore5, setSpeedMore5] = useState(0);
  const [speedMore10, setSpeedMore10] = useState(0);
  const { user } = useProfile();
  const { data: spot } = useGet({
    route: `/spot/${spotIdentifier}/show`,
  });

  useEffect(() => {
    ReactTooltip.rebuild();
    api.get('/spot-background/list')
    .then(res => {
      setBackgroundOptions(res.data.map(background => {
        return {
          value: background.id,
          label: background.title,
        }
      }))
    })

    if (user.role === 'ROLE_SYSTEM_ADMIN') {
      api.get('/adm/user/spot-generator/listall')
      .then(res => {
        setUserOptions(res.data.map(user => {
          return {
            value: user.identifier,
            label: user.name,
          }
        }))
      })
    }
  }, [])

  const onSubmit = ({ values, setSubmitting }) => {
    const path = spotIdentifier
      ? `spot/${spotIdentifier}/edit`
      : `spot/new`;

    var data = [];
    if (values.tags.length > 0) {
      var re = /\s*;\s*/;
      var nameList = values.tags.split(re);
      nameList.map((item) => {
        data.push({
          "title": item,
        });
      })
    }

    const aux = {
      ...values,
      isCalm: values.isCalm ? 1 : 0,
      tags: data
    };

    api
      .post(path, aux)
      .then(() => {
        toast.success(
          `Spot ${spotIdentifier ? 'editado' : 'criado'} com sucesso`
        );
        onSuccess();
        closeModal();
      })
      .finally(() => {
        setSubmitting(false);
      });
  };

  let optionsSecondInvoice = [];
  const secondInvoiceOptions = (length) => {
    optionsSecondInvoice = [];
    for (var i = 0; i <= length; i++) {
      optionsSecondInvoice.push({
        value: i,
        label: i
      });
    }
  }
  const textLength = (length) => {
    if (length == 30) {
      setSpeedLess10(390);
      setSpeedLess5(420);
      setSpeed0(450);
      setSpeedMore5(480);
      setSpeedMore10(510);
    } else if (length == 45) {
      setSpeedLess10(590);
      setSpeedLess5(630);
      setSpeed0(670);
      setSpeedMore5(710);
      setSpeedMore10(750);
    } else if (length == 60) {
      setSpeedLess10(800);
      setSpeedLess5(850);
      setSpeed0(900);
      setSpeedMore5(950);
      setSpeedMore10(1000);
    } else {
      setSpeedLess10(0);
      setSpeedLess5(0);
      setSpeed0(0);
      setSpeedMore5(0);
      setSpeedMore10(0);
    }
  }

  return (
    <>
      <main>
        <ReactTooltip />
        {(!spotIdentifier || (spotIdentifier && !!spot)) && (
          <Formik
            initialValues={{
              title: spot?.title || '',
              voiceGenre: spot?.voiceGenre || '',
              length: spot?.length || '',
              backgroundVolume: spot?.backgroundVolume || '50',
              voiceVolume: spot?.voiceVolume || '200',
              background: spot?.background?.id || '',
              text: spot?.text || '',
              user: spot?.user?.identifier || '',
              voiceInputSecond: spot?.voiceInputSecond || '0',
              tags: spot?.tagsFormatted || '',
              isCalm: spot?.isCalm || false,
              pitch: spot?.pitch || '0',
              rate: spot?.rate || '0',
            }}
            validationSchema={schema}
            onSubmit={(values, { setSubmitting }) => {
              onSubmit({ values, setSubmitting });
            }}
          >
            {({
              values,
              handleChange,
              handleBlur,
              handleSubmit,
              isSubmitting,
              setFieldValue,
            }) => (
              <form autoComplete="off" onSubmit={handleSubmit}>
                <div className="flex flex-wrap">
                  <div className="w-full md:w-1/2 px-4">
                    <div className="relative w-full mb-3">
                      <label
                        className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                        htmlFor="title"
                        data-tip="Escolha o nome do seu spot. (ex: Spot promoção verão 2022)."
                      >
                        Título (?)
                      </label>
                      <input
                        value={values.title}
                        name="title"
                        type="text"
                        maxLength="255"
                        className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                        onChange={handleChange}
                        onBlur={handleBlur}
                      />
                      <ErrorMessage
                        component="p"
                        className="text-red-500 mb-4 font-light text-xs"
                        name="title"
                      />
                    </div>
                  </div>
                  <div className="w-full md:w-1/2 px-4">
                    <div className="relative w-full mb-3">
                      <label
                        className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                        htmlFor="length"
                        data-tip="Escolha a duração do seu spot (30s, 45s ou 60s). Caso a duração do seu texto (incluindo o tempo de entrada da voz) seja maior do que a duração selecionada, ele será cortado."
                      >
                        Duração (segundos) (?)
                      </label>
                      <Select
                        handleBlur={handleBlur}
                        name="length"
                        className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                        placeholder=""
                        setFieldValue={setFieldValue}
                        value={values.length}
                        onChange={secondInvoiceOptions(values.length), textLength(values.length)}
                        options={[
                          { value: '30', label: '30s' },
                          { value: '45', label: '45s' },
                          { value: '60', label: '60s' },
                        ]}
                      />
                      <ErrorMessage
                        component="p"
                        className="text-red-500 mb-4 font-light text-xs"
                        name="length"
                      />
                    </div>
                  </div>
                  <div className="w-full md:w-1/2 px-4">
                    <div className="relative w-full mb-3">
                      <label
                        className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                        htmlFor="voiceInputSecond"
                        data-tip="Indique em qual segundo a voz do(a) locutor(a) deverá começar."
                      >
                        Segundo de entrada da voz (?)
                      </label>
                      <Select
                        handleBlur={handleBlur}
                        name="voiceInputSecond"
                        className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                        placeholder=""
                        setFieldValue={setFieldValue}
                        value={values.voiceInputSecond}
                        options={optionsSecondInvoice}
                        secondInvoiceOptions
                      />
                      <ErrorMessage
                        component="p"
                        className="text-red-500 mb-4 font-light text-xs"
                        name="length"
                      />
                    </div>
                  </div>
                  <div className="w-full md:w-1/2 px-4">
                    <div className="relative w-full mb-3">
                      <label
                        className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                        htmlFor="backgroundVolume"
                        data-tip="Se quiser que o volume da trilha aumente em relação ao volume da voz, aumente o valor do volume da trilha. Caso queira diminuir o volume da trilha em relação ao volume da voz, diminua o valor do volume da trilha."
                      >
                        Volume da trilha (%) (?)
                      </label>
                      <input
                        value={values.backgroundVolume}
                        name="backgroundVolume"
                        type="number"
                        className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                        onChange={handleChange}
                        onBlur={handleBlur}
                      />
                      <ErrorMessage
                        component="p"
                        className="text-red-500 mb-4 font-light text-xs"
                        name="backgroundVolume"
                      />
                    </div>
                  </div>
                  <div className="w-full md:w-1/2 px-4">
                    <div className="relative w-full mb-3">
                      <label
                        className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                        htmlFor="voiceVolume"
                        data-tip="Se quiser que o volume da voz aumente em relação ao volume da trilha, aumente o valor do volume da voz. Caso queira diminuir o volume da voz em relação ao volume da trilha, diminua o valor do volume da voz."
                      >
                        Volume da voz (%) (?)
                      </label>
                      <input
                        value={values.voiceVolume}
                        name="voiceVolume"
                        type="number"
                        className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                        onChange={handleChange}
                        onBlur={handleBlur}
                      />
                      <ErrorMessage
                        component="p"
                        className="text-red-500 mb-4 font-light text-xs"
                        name="voiceVolume"
                      />
                    </div>
                  </div>
                  <div className="w-full md:w-1/2 px-4">
                    <div className="relative w-full mb-3">
                      <label
                        className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                        htmlFor="voiceGenre"
                        data-tip="Selecione se deseja uma voz feminina ou masculina."
                      >
                        Tipo de voz (?)
                      </label>
                      <Select
                        handleBlur={handleBlur}
                        name="voiceGenre"
                        placeholder=""
                        className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                        setFieldValue={setFieldValue}
                        value={values.voiceGenre}
                        options={[
                          { value: 'F', label: 'Feminina' },
                          { value: 'M', label: 'Masculina' },
                        ]}
                      />
                      <ErrorMessage
                        component="p"
                        className="text-red-500 mb-4 font-light text-xs"
                        name="voiceGenre"
                      />
                    </div>
                  </div>
                  {values.voiceGenre === 'F' &&
                    <>
                      <ReactTooltip />
                      <div className="w-full md:w-1/2 px-4">
                        <div className="relative w-full mb-3">
                          <label
                            className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                            htmlFor="isCalm"
                            data-tip="Caso tenha selecionado a voz feminina, indique se deseja o modo de voz calma ou não."
                          >
                            Voz calma (?)
                          </label>
                          <Select
                            handleBlur={handleBlur}
                            name="isCalm"
                            placeholder=""
                          className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                            setFieldValue={setFieldValue}
                            value={values.isCalm}
                            options={[
                              { value: true, label: 'Sim' },
                              { value: false, label: 'Não' },
                            ]}
                          />
                          <ErrorMessage
                            component="p"
                            className="text-red-500 mb-4 font-light text-xs"
                            name="isCalm"
                          />
                        </div>
                      </div>
                    </>
                  }
                  <div className="w-full md:w-1/2 px-4">
                    <div className="relative w-full mb-3">
                      <label
                        className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                        htmlFor="pitch"
                        data-tip="Se desejar a voz mais aguda, aumente o valor do tom. Caso prefira que a voz seja mais grave, diminua o valor do tom (valores negativos). Cuidado ao utilizar valores acima de 10%/-10%, pois pode distorcer a voz."
                      >
                        Tom (%) (?)
                      </label>
                      <input
                        value={values.pitch}
                        name="pitch"
                        type="number"
                        className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                        onChange={handleChange}
                        onBlur={handleBlur}
                      />
                      <ErrorMessage
                        component="p"
                        className="text-red-500 mb-4 font-light text-xs"
                        name="pitch"
                      />
                    </div>
                  </div>
                  <div className="w-full md:w-1/2 px-4">
                    <div className="relative w-full mb-3">
                      <label
                        className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                        htmlFor="rate"
                        data-tip="Caso queira aumentar a velocidade da fala, aumente o valor do ritmo. Se desejar uma voz mais lenta, diminua o valor do ritmo."
                      >
                        Velocidade (%) (?)
                      </label>
                      <input
                        value={values.rate}
                        name="rate"
                        type="number"
                        className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                        onChange={handleChange}
                        onBlur={handleBlur}
                      />
                      <ErrorMessage
                        component="p"
                        className="text-red-500 mb-4 font-light text-xs"
                        name="rate"
                      />
                    </div>
                  </div>
                  <div className="w-full md:w-1/2 px-4">
                    <div className="relative w-full mb-3">
                      <label
                        className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                        htmlFor="background"
                        data-tip="Selecione qual trilha de fundo deseja para o seu spot."
                      >
                        Trilha (?)
                      </label>
                      <Select
                        handleBlur={handleBlur}
                        name="background"
                        placeholder=""
                        className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                        setFieldValue={setFieldValue}
                        value={values.background}
                        options={backgroundOptions}
                      />
                      <ErrorMessage
                        component="p"
                        className="text-red-500 mb-4 font-light text-xs"
                        name="background"
                      />
                    </div>
                  </div>
                  {user.role === 'ROLE_SYSTEM_ADMIN' && (
                    <div className="w-full md:w-1/2 px-4">
                      <div className="relative w-full mb-3">
                        <label
                          className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                          htmlFor="user"
                        >
                          Usuário
                          <Select
                            handleBlur={handleBlur}
                            name="user"
                            placeholder=""
                            setFieldValue={setFieldValue}
                            value={values.user}
                            options={userOptions}
                          />
                        </label>
                        <ErrorMessage
                          component="p"
                          className="text-red-500 mb-4 font-light text-xs"
                          name="user"
                        />
                      </div>
                    </div>
                  )}
                  <div className="w-full px-4">
                    <div className="relative w-full mb-3">
                      <label
                        className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                        htmlFor="tags"
                        data-tip="Caso queira adicionar palavras para organizar e categorizar seu spot, acrescente-as nesse campo, separadas por ponto e vírgula (;)"
                      >
                        Etiquetas (?)
                      </label>
                      <input
                        value={values.tags}
                        name="tags"
                        type="text"
                        className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                        onChange={handleChange}
                        onBlur={handleBlur}
                      />
                      <ErrorMessage
                        component="p"
                        className="text-red-500 mb-4 font-light text-xs"
                        name="tags"
                      />
                    </div>
                  </div>
                </div>
                <div className="flex flex-wrap">
                  <div className="w-full md:w-1/2 px-4">
                    <div className="relative w-full mb-3">
                      <label
                        className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                        htmlFor="text"
                        data-tip="Adicione o texto da locução do seu spot. Fique atento a quantidade de caracteres."
                      >
                        Texto (?)
                      </label>
                      <textarea
                        name="text"
                        value={values.text}
                        maxLength="1000"
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
                    <pre className="ml-1">
                      <small>
                        {"Tags aceitas em texto: <p></p>, <s></s>, <break />, <lang></lang>, <phoneme></phoneme> e etc"}
                      </small>
                    </pre>
                    <a
                      href="https://docs.microsoft.com/pt-br/azure/cognitive-services/speech-service/speech-synthesis-markup?tabs=csharp"
                      className="ml-1 text-blueGray-500 hover:text-blueGray-800 text-sm block"
                      target="_blank"
                    >
                      <>
                        Ir para documentação{' '}
                      </>
                    </a>
                  </div>
                  <div className="w-full md:w-1/2 px-4">
                    <div className="relative w-full mb-3">
                      <pre className="relative ml-2">
                        <small>
                          <b>Caracteres digitados: {values.text.length}</b>
                        </small>
                      </pre>
                      <table className="items-center w-full bg-transparent border-collapse">
                        <thead>
                          <tr>
                            <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-center">
                              Velocidade
                            </th>
                            <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-center">
                              Número aproximado de caracteres
                            </th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr>
                            <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-center">
                              -10%
                            </td>
                            <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-center">
                              {speedLess10}
                            </td>
                          </tr>
                          <tr>
                            <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-center">
                              -5%
                            </td>
                            <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-center">
                              {speedLess5}
                            </td>
                          </tr>
                          <tr>
                            <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-center">
                              0%
                            </td>
                            <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-center">
                              {speed0}
                            </td>
                          </tr>
                          <tr>
                            <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-center">
                              +5%
                            </td>
                            <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-center">
                              {speedMore5}
                            </td>
                          </tr>
                          <tr>
                            <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-center">
                              +10%
                            </td>
                            <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-center">
                              {speedMore10}
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
                <hr className="my-2 border-b-1 border-blueGray-300" />
                <div className="flex justify-end w-full mt-2">
                  <button
                    disabled={isSubmitting}
                    className="bg-black text-white text-sm font-bold p-2 rounded shadow hover:shadow-md outline-none focus:outline-none ease-linear transition-all duration-150"
                    type="submit"
                  >
                    {isSubmitting ? (
                      <ClipLoader color="#fff" />
                    ) : (
                      <>{spotIdentifier ? 'SALVAR ALTERAÇÕES' : 'ADICIONAR'}</>
                    )}
                  </button>
                </div>
              </form>
            )}
          </Formik>
        )}
      </main>
    </>
  );
}

export default ModalForm;
