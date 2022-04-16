import React, { useState } from 'react';
import { InputStyles } from './styles';

export default function InputFileStyled({
  fileName,
  onChange,
  multiple,
  accept,
  name,
}) {
  const [dragZone, setDragZone] = useState();
  const acceptText = accept
    .split(',')
    .map((d) => (d === 'image/*' ? 'imagens' : d))
    .join(', ');

  return (
    <InputStyles fileName={fileName} dragZone={dragZone}>
      <label htmlFor="upload">
        <input
          onDragEnter={() => {
            setDragZone(true);
          }}
          onDragLeave={() => {
            setDragZone(false);
          }}
          onDrop={() => {
            setDragZone(false);
          }}
          type="file"
          name={name}
          id={name}
          accept={accept}
          onChange={onChange}
          placeholder="Enviar arquivo"
          multiple={false}
        />
      </label>
      {!dragZone && fileName ? (
        <aside>
          <span> {fileName}</span>
        </aside>
      ) : (
        <aside>
          <strong>Click aqui ou arraste um arquivo</strong>
          {dragZone ? (
            <span>PODE SOLTAR AQUI.</span>
          ) : (
            <span>formatos permitidos: {acceptText}</span>
          )}
        </aside>
      )}
    </InputStyles>
  );
}
