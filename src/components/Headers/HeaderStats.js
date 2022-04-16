import React from 'react';

export default function HeaderStats({ content }) {
  return (
    <>
      {/* Header */}
      <div className="relative bg-black pb-32 md:pt-24  pt-16">
        <div className="px-4 md:px-10 mx-auto w-full">
          <div>{content && content}</div>
        </div>
      </div>
    </>
  );
}
