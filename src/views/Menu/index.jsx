import React, { useState } from 'react';
import useGetList from 'services/hooks/useGetList';
import TablePaginator from 'components/Paginator';
import { Modal } from 'components/Modals/Modal';
import PageCard from 'components/Cards/PageCard';
import { Container } from '../../assets/shared/styles';
import CardTableList from 'components/Cards/CardTableList';
import ModalForm from './ModalForm';
import { FaEye } from 'react-icons/fa';
import UploadFile from 'components/Modals/UploadFile';
import SearchEngine from 'components/Search/SearchEngine';
import { useSelector } from 'react-redux';

const Menu = ({ color = 'light' }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [openForm, setOpenForm] = useState(false);
  const [selected, setSelected] = useState({});
  const search = useSelector((state) => state.filter.value);

  // get LIST
  const {
    data: metaFields,
    getItems,
    isLoading: isLoadingList,
    meta,
  } = useGetList({
    page: currentPage,
    route: `meta-field/all/list`,
    search,
  });

  const fillModalUpload = {
    columns: [],
    uri: '/meta-field/import',
    title: 'Subir arquivo de importação (.xlsx)',
  };

  const isLoading = isLoadingList;

  return (
    <PageCard
      color={color}
      headerContent={
        <>
          <SearchEngine fields={['search', 'modality', 'valueAsNumber', 'valueAsDate']} />
        </>
      }
    >
      <Modal
        title={`${`Editar ${selected.modalityFormatted}`}`}
        show={openForm}
        setShow={setOpenForm}
      >
        <ModalForm
          onSuccess={() => getItems()}
          selected={selected}
        />
      </Modal>
      <CardTableList title={'Funcionários'} color={color}>
        <div className="relative mb-2">
          <div className="absolute bottom-0 right-0">
            <UploadFile
              fillModalUpload={fillModalUpload}
              actionModalPost={getItems}
            />
          </div>
        </div>
        <Container>
          <div className="overflow-auto">
            <table className="items-center table-auto w-full bg-transparent border-collapse">
              <thead>
                <tr>
                  <th
                    className={`py-3 align-middle border border-solid text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left ${
                      color === 'light'
                        ? 'bg-blueGray-50 text-blueGray-500 border-blueGray-100'
                        : 'bg-lightBlue-800 text-lightBlue-300 border-lightBlue-700'
                    }`}
                  >
                    Código interno
                  </th>
                  <th
                    className={`py-3 align-middle border border-solid text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left ${
                      color === 'light'
                        ? 'bg-blueGray-50 text-blueGray-500 border-blueGray-100'
                        : 'bg-lightBlue-800 text-lightBlue-300 border-lightBlue-700'
                    }`}
                  >
                    Nome do campo
                  </th>
                  <th
                    className={`align-middle border border-solid text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left ${
                      color === 'light'
                        ? 'bg-blueGray-50 text-blueGray-500 border-blueGray-100'
                        : 'bg-lightBlue-800 text-lightBlue-300 border-lightBlue-700'
                    }`}
                  >
                    Valor do campo
                  </th>
                  <th
                    className={`align-middle border border-solid text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left ${
                      color === 'light'
                        ? 'bg-blueGray-50 text-blueGray-500 border-blueGray-100'
                        : 'bg-lightBlue-800 text-lightBlue-300 border-lightBlue-700'
                    }`}
                  >
                    Data de Referência
                  </th>
                  <th
                    className={`align-middle border border-solid text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left ${
                      color === 'light'
                        ? 'bg-blueGray-50 text-blueGray-500 border-blueGray-100'
                        : 'bg-lightBlue-800 text-lightBlue-300 border-lightBlue-700'
                    }`}
                  >
                    Data de Criação
                  </th>
                  <th
                    className={`align-middle border border-solid text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left ${
                      color === 'light'
                        ? 'bg-blueGray-50 text-blueGray-500 border-blueGray-100'
                        : 'bg-lightBlue-800 text-lightBlue-300 border-lightBlue-700'
                    }`}
                  >
                    Ações
                  </th>
                </tr>
              </thead>

              <tbody>
                {metaFields?.map(
                  (metaField) => (
                    <tr key={metaField.identifier}>
                      <td className="text-xs">
                        <span
                          className={`${+(color === 'light'
                            ? 'text-blueGray-600'
                            : 'text-white')}`}
                        >
                          {metaField?.modality}
                        </span>
                      </td>
                      <td className="text-xs">
                        <span
                          className={`${+(color === 'light'
                            ? 'text-blueGray-600'
                            : 'text-white')}`}
                        >
                          {metaField?.modalityFormatted}
                        </span>
                      </td>
                      <td className="text-xs">
                        <span
                          className={`${+(color === 'light'
                            ? 'text-blueGray-600'
                            : 'text-white')}`}
                        >
                          {metaField?.valueAsNumberFormatted}
                        </span>
                      </td>
                      <td className="text-xs">
                        <span
                          className={`${+(color === 'light'
                            ? 'text-blueGray-600'
                            : 'text-white')}`}
                        >
                          {metaField?.dateReferenceFormatted}
                        </span>
                      </td>
                      <td className="text-xs">
                        <span
                          className={`${+(color === 'light'
                            ? 'text-blueGray-600'
                            : 'text-white')}`}
                        >
                          {metaField?.createdAtFormatted}
                        </span>
                      </td>
                      <td className="text-xs">
                        <button
                          type="button"
                          className="mr-2 p-2 rounded bg-lightBlue-500"
                          onClick={() => {
                            setSelected(metaField);
                            setOpenForm(true);
                          }}
                        >
                          <FaEye size={15} color="#fff" />
                        </button>
                      </td>
                    </tr>
                  )
                )}
              </tbody>
            </table>
          </div>
        </Container>
        <TablePaginator
          data={metaFields}
          emptyMessage="Sem informações para listar"
          isLoading={isLoading}
          meta={meta}
          setCurrentPage={setCurrentPage}
        />
      </CardTableList>
    </PageCard>
  );
};

export default Menu;
