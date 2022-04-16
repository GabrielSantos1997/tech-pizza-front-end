import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import api from 'services/api';

export default function Policy() {
  const { modality } = useParams();
  const [text, setText] = useState('');
  
  useEffect(() => {
    api.get(`policy/${modality}/show`)
    .then(res => {
      setText(res.data.text);
    })
  }, []);

  return (
    <>
      <div className="container mx-auto px-4 h-full">
        <div className="flex content-center items-center justify-center h-full">
          <div className="w-full lg:w-2/3 px-4">
            <div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-white border-0">
              <div className="px-4 lg:px-10 pt-10 font-bold">
                {modality == 'terms' ? 'Termos de uso' : 'Política de privacidade'}
              </div>
              <div className="px-4 lg:px-10 pb-10 pt-5 whitespace-pre-line">
                {text}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
