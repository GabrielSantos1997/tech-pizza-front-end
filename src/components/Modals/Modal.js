import React, { useState } from 'react';
import { VscClose } from 'react-icons/vsc';

import { Container } from './styles';

export const Modal = ({ show, setShow, children, title, transparent }) => {
  const onClose = () => {
    setShow(false);
  };

  return show ? (
    <Container transparent={transparent}>
      <div
        id="bgClose"
        role="button"
        onKeyDown={(key) => key.code === 'Escape' && setShow(false)}
        onClick={() => setShow(false)}
        tabIndex={0}
      >
        <></>
      </div>
      <main id="main">
        <header id="header">
          <strong id="title">{title}</strong>
          <button type="button" id="close" onClick={onClose}>
            <VscClose size={30} />
          </button>
        </header>
        <section id="children">
          {React.cloneElement(children, { closeModal: onClose })}
        </section>
      </main>
    </Container>
  ) : (
    <></>
  );
};

export const ModalButton = ({
  title,
  children,
  buttonContent,
  transparent,
  ...rest
}) => {
  const [show, setShow] = useState(false);

  return (
    <>
      <Modal
        setShow={setShow}
        show={show}
        transparent={transparent}
        title={title}
      >
        {children}
      </Modal>

      <button
        {...rest}
        type="button"
        onClick={() => {
          setShow(true);
        }}
      >
        {buttonContent}
      </button>
    </>
  );
};
