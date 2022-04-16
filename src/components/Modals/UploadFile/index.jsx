import React, { useState, useCallback, useRef } from 'react';
import { BiDownload, BiSave } from 'react-icons/bi';
import { FiUpload } from 'react-icons/fi';
import { ClipLoader } from 'react-spinners';
import { toast } from 'react-toastify';

import { colors } from 'assets/styles/theme';
import { useUpload } from 'services/hooks/useUpload';
import InputFileStyled from 'components/Forms/InputFileStyled';
import { Modal } from '../Modal';
import { fillTable } from './Config/modalTableDataImport';
import { ButtonDefault, ButtonRed, Container, ButtonDownload } from './styles';
import api from 'services/api';

function UploadFile({
  opened,
  fillModalUpload,
  actionModalPost,
  onClose = () => {},
}) {
  const [isOpenModalUpload, setIsOpenModalUpload] = useState(opened);

  const [fileName, setFileName] = useState('');
  const [file, setFile] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState();

  const formRef = useRef();

  const { percent, submitUpload, cancelUpload } = useUpload();

  const onChange = useCallback((e) => {
    const file = e.target?.files[0];
    setFile(file);
    setFileName(file?.name);
  }, []);

  const dismiss = useCallback(() => {
    formRef.current.reset();
    setFileName();
    setIsOpenModalUpload(false);
    onClose();
    cancelUpload();
  }, [cancelUpload, onClose]);

  const onSuccess = useCallback(() => {
    actionModalPost();
    dismiss();
  }, [actionModalPost, dismiss]);

  const handleSubmit = useCallback(
    (e) => {
      e.preventDefault();
      setIsSubmitting(true);

      const data = new FormData();

      data.append('file', file);

      submitUpload({ route: fillModalUpload.uri, data })
        .then(() => {
          toast.success(`${fileName}: importação concluída com sucesso`);
          document.querySelector('form').reset();
          setFile();
          setFileName();
          onSuccess();
        })
        .catch((err) => {
          // eslint-disable-next-line no-console
          console.log('ERROR', err);
          setError('Falha no upload, tente novamente');
          setTimeout(() => {
            setError('');
          }, 3000);
        })
        .finally(() => {
          setIsSubmitting(false);
        });
    },
    [submitUpload, fillModalUpload.uri, fileName, onSuccess]
  );

  return (
    <>
      <ButtonDefault
        color="primary"
        title={fillModalUpload.title}
        className=" float-right  mr-1"
        onClick={() => {
          setIsOpenModalUpload(true);
        }}
      >
        <FiUpload size={15} color={colors.white} />
      </ButtonDefault>


      <Modal
        title={fillModalUpload.title}
        show={isOpenModalUpload}
        setShow={dismiss}
      >
        <>
          <section className="mt-3 mb-3">
            <ButtonDownload type="button" className="ml-0"
              onClick={() => {
                api
                  .get(`meta-field/download/model`, { responseType: 'blob' })
                  .then((response) => {
                    const type = response.headers['content-type'];
                    const blob = new Blob([response.data], { type });
                    const url = window.URL.createObjectURL(blob);
                    const link = document.createElement('a');
                    link.href = url;
                    link.setAttribute('download', 'modelo.xlsx');
                    document.body.appendChild(link);
                    link.click();
                    link.remove();
                  })
                ;
              }}
            >
                <BiDownload color="#fff" size="18px" />
                Baixar modelo
            </ButtonDownload>
          </section>
          <Container ref={formRef} onSubmit={handleSubmit}>
            <InputFileStyled
              fileName={fileName}
              accept=".xlsx"
              onChange={onChange}
            />
            <table>
              <tbody>
                {fillTable(fillModalUpload.columns).map((data) => (
                  <tr key={data.column}>
                    <td>{data.column}</td>
                    <td>{data.value}</td>
                  </tr>
                ))}
              </tbody>
            </table>

            <p>{error}</p>
            <section className="mt-3">
              <>
                <ButtonDefault disabled={!fileName || isSubmitting} type="submit">
                  {isSubmitting ? (
                    <>
                      {percent}%&ensp;
                      <ClipLoader size={20} color="#fff" />
                    </>
                  ) : (
                    <>
                      <BiSave color="#fff" size="18px" />
                      Enviar
                    </>
                  )}
                </ButtonDefault>
              </>

              <ButtonRed onClick={dismiss}>Cancelar</ButtonRed>
            </section>
          </Container>
        </>
      </Modal>
    </>
  );
}

export default UploadFile;
