import React, { useEffect, useState } from 'react';
import { Formik } from 'formik';
import { toast } from 'react-toastify';
import { ClipLoader } from 'react-spinners';

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
  const [minAndMaxPriority, setMinAndMaxPriority] = useState({
    min: 0,
    max: 0,
  });

  const { data: user, getEntity } = useGet({
    route: `/user/${userIdentifier}/show`,
    isAutomatic: false,
  });

  const booleanSelect = [
    {
      value: true,
      label: 'Sim',
    },
    {
      value: false,
      label: 'Não',
    },
  ];

  useEffect(() => {
    if (userIdentifier) getEntity();
  }, []);

  const editPassword = ({ password, setSubmitting }) => {
    const path = `user/${userIdentifier}/change-password`;
    api
      .post(path, { password })
      .then(() => {
        toast.success('Senha alterada com sucesso');
      })
      .finally(() => {
        setSubmitting(false);
        onSuccess();
        closeModal();
      });
  };
  const editParameters = ({
    operatorParameters,
    setSubmitting,
    identifier,
  }) => {
    const path = `/adm/user/${identifier}/edit-parameters`;
    api
      .post(path, operatorParameters)
      .then(() => {
        toast.success(
          `Parâmetros ${
            userIdentifier ? 'editados' : 'adicionados'
          } com sucesso.`
        );
        onSuccess();
        getEntity();
      })
      .finally(() => {
        if (!userIdentifier) {
          closeModal();
        }
        setSubmitting(false);
      });
  };

  const onSubmit = ({ values, setSubmitting }) => {
    const { operatorParameters } = values;
    delete values.operatorParameters;
    const path = userIdentifier
      ? `user/${userIdentifier}/edit`
      : `user/new`;
    api
      .post(path, values)
      .then((e) => {
        toast.success(
          `Usuário ${userIdentifier ? 'editado' : 'criado'} com sucesso`
        );
        onSuccess();
        closeModal();
      })
      .catch(() => {
        setSubmitting(false);
      })
      .finally(() => {
        if (userIdentifier) {
          setSubmitting(false);
        }
      });
  };

  const {
    shouldReceiveLead,
    minLeads,
    maxLeads,
    recycledPercentage,
    priority,
  } = user?.operatorParameters || {};

  return (
    <>
      {(!userIdentifier || (userIdentifier && !!user)) && (
        <>
          {userIdentifier && (
            <Tabs
              selected={openTab}
              setSelected={setOpenTab}
              buttons={[
                { title: 'Atributos' },
                { title: 'Mudar Senha' },
              ]}
            />
          )}
          <Formik
            enableReinitialize
            initialValues={{
              name: user?.name ?? '',
              email: user?.email ?? '',
              password: user?.password ?? '',
              confirmPassword: user?.confirmPassword ?? '',

              operatorParameters: {
                shouldReceiveLead:
                  booleanSelect.find(
                    (v) =>
                      v.value ===
                      (shouldReceiveLead?.toString() ? !!shouldReceiveLead : '')
                  ) ?? '',
                priority: priority ?? '',
                minLeads: minLeads ?? '',
                maxLeads: maxLeads ?? '',
                recycledPercentage: recycledPercentage ?? '',
              },
            }}
            validationSchema={schema(openTab, 'admin')}
            onSubmit={(values, { setSubmitting }) => {
              const aux = getValuesFormatted(values);

              // edit
              delete aux.confirmPassword;
              if (openTab === 1) {
                delete aux.password;
                delete aux.operatorParameters;
                onSubmit({ values: aux, setSubmitting });
                return;
              }
              if (openTab === 2) {
                editPassword({ password: aux.password, setSubmitting });
                return;
              }
              // create
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
                style={userIdentifier ? { minHeight: 210, maxWidth: 600 } : {}}
                className="flex flex-wrap sm:w-full "
                autoComplete="off"
                onSubmit={handleSubmit}
              >
                {(!userIdentifier || openTab === 1) && (
                  <Attributes
                    setFieldError={setFieldError}
                    handleBlur={handleBlur}
                    handleChange={handleChange}
                    values={values}
                    user={user}
                  />
                )}
                {(!userIdentifier || openTab === 2) && (
                  <Password
                    handleChange={handleChange}
                    handleBlur={handleBlur}
                    values={values}
                  />
                )}

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
