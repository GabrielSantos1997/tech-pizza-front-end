import React from 'react';

function CardTableList({ children, color, CreateButton, title }) {
  return (
    <div
      className={`relative flex flex-col min-w-0 break-words w-full mb-6 rounded ${
        color === 'light' ? 'bg-white' : 'bg-lightBlue-900 text-white'
      }`}
    >
      <div className="rounded-t mb-0 p-4 border-0">
        <div className="flex flex-wrap items-center justify-between">
          <div className="relative w-full p-4 max-w-full flex-grow flex-1">
            <h3
              className={`font-semibold text-lg ${
                color === 'light' ? 'text-blueGray-700' : 'text-white'
              }`}
            >
              {title}
            </h3>
          </div>

          {CreateButton && <CreateButton />}
        </div>

        <div className="block w-full" />
        {children}
      </div>
    </div>
  );
}

export default CardTableList;
