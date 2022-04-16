import React from 'react';
import { BsPencilSquare } from 'react-icons/bs';

import useGet from 'services/hooks/useGet';
import { useProfile } from 'services/profile/getProfile';

function ModalDetails({
  closeModal,
  openForm = () => {},
  identifier: spotIdentifier,
}) {
  const { user } = useProfile();
  const { data: spot } = useGet({
    route: `/spot/${spotIdentifier}/show`,
  });

  const { title, voiceGenre, length, backgroundVolume, voiceVolume, background, text, statusReadable, createdAtFormatted, voiceInputSecond, pitch, rate, isCalm, tagsFormatted } = spot || {};
  return (
    <>
      <main>
        <div className="flex flex-wrap">
          <div className="w-full lg:w-6/12 px-4">
            <div className="relative w-full mb-3">
              <p className="block uppercase text-blueGray-600 text-xs font-bold mb-2">
                Título
              </p>
              <p>{title}</p>
            </div>
          </div>
          <div className="w-full lg:w-6/12 px-4">
            <div className="relative w-full mb-3">
              <p className="block uppercase text-blueGray-600 text-xs font-bold mb-2">
                Tipo de voz
              </p>
              <p>{voiceGenre == 'F' ? 'Feminina' : 'Masculina'}</p>
            </div>
          </div>
          <div className="w-full lg:w-6/12 px-4">
            <div className="relative w-full mb-3">
              <p className="block uppercase text-blueGray-600 text-xs font-bold mb-2">
                Duração
              </p>
              <p>{length}s</p>
            </div>
          </div>
          <div className="w-full lg:w-6/12 px-4">
            <div className="relative w-full mb-3">
              <p className="block uppercase text-blueGray-600 text-xs font-bold mb-2">
                Segundo de entrada da voz
              </p>
              <p>{voiceInputSecond}s</p>
            </div>
          </div>
          <div className="w-full lg:w-6/12 px-4">
            <div className="relative w-full mb-3">
              <p className="block uppercase text-blueGray-600 text-xs font-bold mb-2">
                Volume da trilha
              </p>
              <p>{backgroundVolume ? backgroundVolume : '50'}%</p>
            </div>
          </div>
          <div className="w-full lg:w-6/12 px-4">
            <div className="relative w-full mb-3">
              <p className="block uppercase text-blueGray-600 text-xs font-bold mb-2">
                Volume da voz
              </p>
              <p>{voiceVolume ? voiceVolume : '200'}%</p>
            </div>
          </div>
          <div className="w-full lg:w-6/12 px-4">
            <div className="relative w-full mb-3">
              <p className="block uppercase text-blueGray-600 text-xs font-bold mb-2">
                Trilha
              </p>
              <p>{background?.title}</p>
            </div>
          </div>
          <div className="w-full lg:w-6/12 px-4">
            <div className="relative w-full mb-3">
              <p className="block uppercase text-blueGray-600 text-xs font-bold mb-2">
                Status
              </p>
              <p>{statusReadable}</p>
            </div>
          </div>
          <div className="w-full lg:w-6/12 px-4">
            <div className="relative w-full mb-3">
              <p className="block uppercase text-blueGray-600 text-xs font-bold mb-2">
                Data de cadastro
              </p>
              <p>{createdAtFormatted}</p>
            </div>
          </div>
          <div className="w-full lg:w-6/12 px-4">
            <div className="relative w-full mb-3">
              <p className="block uppercase text-blueGray-600 text-xs font-bold mb-2">
                Tom
              </p>
              <p>{pitch}%</p>
            </div>
          </div>
          <div className="w-full lg:w-6/12 px-4">
            <div className="relative w-full mb-3">
              <p className="block uppercase text-blueGray-600 text-xs font-bold mb-2">
                Velocidade
              </p>
              <p>{rate}%</p>
            </div>
          </div>
          <div className="w-full lg:w-6/12 px-4">
            <div className="relative w-full mb-3">
              <p className="block uppercase text-blueGray-600 text-xs font-bold mb-2">
                Voz calma?
              </p>
              <p>{isCalm ? "Sim" : "Não"}</p>
            </div>
          </div>
          {user.role === 'ROLE_SYSTEM_ADMIN' && spot?.user && (
            <div className="w-full lg:w-6/12 px-4">
              <div className="relative w-full mb-3">
                <p className="block uppercase text-blueGray-600 text-xs font-bold mb-2">
                  Usuário
                </p>
                <p>{spot?.user?.name}</p>
              </div>
            </div>
          )}
          <div className="w-full px-4">
            <div className="relative w-full mb-3">
              <p className="whitespace-nowrap" htmlFor="text">
                Texto
              </p>
              <p style={{ whiteSpace: 'break-spaces' }}>{spot?.text}</p>
            </div>
          </div>
          <div className="w-full px-4">
            <div className="relative w-full mb-3">
              <p className="block uppercase text-blueGray-600 text-xs font-bold mb-2">
                Etiquetas
              </p>
              <p style={{ whiteSpace: 'break-spaces' }}>{tagsFormatted}</p>
            </div>
          </div>
        </div>

        <hr className="my-2 border-b-1 border-blueGray-300" />
        <div className="flex justify-end w-full mt-2">
          <button
            className="bg-black text-white text-xs p-2 rounded shadow hover:shadow-md outline-none focus:outline-none ease-linear transition-all duration-150"
            type="button"
            onClick={() => {
              openForm();
              closeModal();
            }}
          >
            <BsPencilSquare size={20} color="#fff" />
          </button>
        </div>
      </main>
    </>
  );
}

export default ModalDetails;
