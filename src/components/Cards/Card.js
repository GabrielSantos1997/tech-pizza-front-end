import React from 'react';

function Card({ className, children, color, renderRightSide, title }) {
  return (
    <section
      className={`${className} flex flex-col min-w-0 break-words w-full shadow-lg rounded-md ${
        color === 'light' ? 'bg-white' : 'bg-lightBlue-900 text-white'
      }`}
    >
      {(title || renderRightSide) && (
        <div className="flex flex-wrap items-center mb-3 justify-between">
          <h3
            className={`font-semibold text-lg ${
              color === 'light' ? 'text-blueGray-700' : 'text-white'
            }`}
          >
            {title}
          </h3>
          <div className="flex items-center">
            {renderRightSide && renderRightSide}
          </div>
        </div>
      )}

      <div>{children}</div>
    </section>
  );
}

export default Card;
