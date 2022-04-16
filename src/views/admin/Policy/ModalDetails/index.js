import React from 'react';

function ModalDetails({
  policy
}) {
  return (
    <main className="max-w-3xl">
      <div className="flex flex-wrap">
        <div className="w-full lg:w-6/12 px-4">
          <div className="relative w-full mb-3">
            <p className="block uppercase text-blueGray-600 text-xs font-bold mb-2">
              Usuário
            </p>
            <p>{policy.user.name}</p>
          </div>
        </div>
        <div className="w-full lg:w-6/12 px-4">
          <div className="relative w-full mb-3">
            <p className="block uppercase text-blueGray-600 text-xs font-bold mb-2">
              Data de criação
            </p>
            <p>{policy.createdAtFormatted}</p>
          </div>
        </div>
        <div className="w-full px-4">
          <div className="relative w-full mb-3">
            <p className="block uppercase text-blueGray-600 text-xs font-bold mb-2">
              Texto
            </p>
            <p className="whitespace-pre-line">{policy.text}</p>
          </div>
        </div>
      </div>
    </main>
  );
}

export default ModalDetails;
