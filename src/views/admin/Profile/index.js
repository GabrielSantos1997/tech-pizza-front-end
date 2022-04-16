import React, { useEffect } from 'react';
import { ModalButton } from 'components/Modals/Modal';
import { ClipLoader } from 'react-spinners';

import useGet from 'services/hooks/useGet';
import PageCard from 'components/Cards/PageCard';
import { useProfile } from 'services/profile/getProfile';
import EditProfile from './EditProfile';
import CardTableList from 'components/Cards/CardTableList';

// components

export default function CardSettings({ color = 'light' }) {
  const {
    data: profile,
    getEntity,
    isLoading,
  } = useGet({ route: '/profile/show', isAutomatic: false });
  const { name, email } = profile || {};

  const { user } = useProfile();

  useEffect(() => {
    getEntity();
  }, [getEntity, user]);

  return (
    <>
      <PageCard
        color={color}
      >
        <CardTableList title="Meu Perfil" color={color}>
          <div className="float-right">
            <ModalButton
              className="bg-black text-white font-bold uppercase text-xs px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 ease-linear transition-all duration-150"
              title="Editar Perfil"
              buttonContent="Editar"
            >
              <EditProfile onSuccess={getEntity} />
            </ModalButton>
          </div>
          {isLoading ? (
            <div className="flex p-8 items-center justify-center w-full">
              <ClipLoader size={20} color="#0ea5e9" />
            </div>
          ) : (
            <div className="flex-auto px-4 lg:px-10 py-10 pt-0">
              <h6 className="text-blueGray-400 text-sm mt-3 mb-6 font-bold uppercase">
                Informações do usuário
              </h6>
              <div className="flex flex-wrap">
                <div className="w-full px-4">
                  <div className="relative w-full mb-3">
                    <label
                      className="block uppercase text-blueGray-500 text-xs font-bold mb-2"
                      htmlFor="grid-password"
                    >
                      Nome
                      <h3 className="text-base font-semibold leading-normal mb-2 text-blueGray-600 mb-2">
                        {name}
                      </h3>
                    </label>
                  </div>
                </div>
                <div className="w-full px-4">
                  <div className="relative w-full mb-3">
                    <label
                      className="block uppercase text-blueGray-500 text-xs font-bold mb-2"
                      htmlFor="grid-password"
                    >
                      E-mail
                      <h3 className="text-base font-semibold leading-normal mb-2 text-blueGray-600 mb-2">
                        {email}
                      </h3>
                    </label>
                  </div>
                </div>
              </div>
            </div>
          )}
        </CardTableList>
      </PageCard>
    </>
  );
}
