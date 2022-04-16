import React, { useState } from 'react';
import { FiPlus } from 'react-icons/fi';
import { useParams } from 'react-router-dom';
import useGetList from 'services/hooks/useGetList';
import TablePaginator from 'components/Paginator';
import { Modal, ModalButton } from 'components/Modals/Modal';
import PageCard from 'components/Cards/PageCard';
import { Container } from '../../../assets/shared/styles';
import CardTableList from 'components/Cards/CardTableList';
import ModalForm from './ModalForm';
import ModalDetails from './ModalDetails';
import { FaEye } from 'react-icons/fa';

const Policy = ({ color = 'light' }) => {
  const { modality } = useParams();

  const [currentPage, setCurrentPage] = useState(1);
  const [search] = useState();
  const [openForm, setOpenForm] = useState(false);

  // get LIST
  const {
    data: policies,
    getItems,
    isLoading: isLoadingList,
    meta,
  } = useGetList({
    page: currentPage,
    route: `adm/policy/${modality}/list`,
    search,
  });

  const isLoading = isLoadingList;

  return (
    <PageCard color={color}>
      <Modal
        title={modality == 'terms' ? 'Novo termo' : 'Nova política'}
        show={openForm}
        setShow={setOpenForm}
      >
        <ModalForm
          onSuccess={() => getItems()}
          modality={modality}
        />
      </Modal>
      <CardTableList title={
        modality === 'privacy'
          ? 'Política de Privacidade'
          : 'Termos de Uso'
      } color={color}>
        <div className="flex flex-wrap float-right mb-4">
          <div className="w-full">
            <button
              type="button"
              title="Adicionar novo usuário"
              className="p-2 mr-3 auto rounded bg-black"
              onClick={() => {
                setOpenForm(true);
              }}
            >
              <FiPlus size={15} color="#fff" />
            </button>
          </div>
        </div>
        <Container>
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
                  Usuário
                </th>
                <th
                  className={`align-middle border border-solid text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left ${
                    color === 'light'
                      ? 'bg-blueGray-50 text-blueGray-500 border-blueGray-100'
                      : 'bg-lightBlue-800 text-lightBlue-300 border-lightBlue-700'
                  }`}
                >
                  Data de criação
                </th>
                <th
                  className={`align-middle border border-solid text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left ${
                    color === 'light'
                      ? 'bg-blueGray-50 text-blueGray-500 border-blueGray-100'
                      : 'bg-lightBlue-800 text-lightBlue-300 border-lightBlue-700'
                  }`}
                >
                  Texto
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
              {policies?.map(
                (policy) => (
                  <tr key={policy.identifier}>
                    <td className="text-xs">
                      <span
                        className={`${+(color === 'light'
                          ? 'text-blueGray-600'
                          : 'text-white')}`}
                      >
                        {policy.user.name}
                      </span>
                    </td>
                    <td className="text-xs">
                      <span
                        className={`${+(color === 'light'
                          ? 'text-blueGray-600'
                          : 'text-white')}`}
                      >
                        {policy.createdAtFormatted}
                      </span>
                    </td>
                    <td className="text-xs">
                      <span
                        className={`${+(color === 'light'
                          ? 'text-blueGray-600'
                          : 'text-white')}`}
                      >
                        {policy.text.length > 100 ? policy.text.substring(0, 100) + '...' : policy.text}
                      </span>
                    </td>
                    <td className="text-xs">
                      <ModalButton
                        buttonContent={<FaEye size={15} color="#fff" />}
                        title="Detalhes do spot"
                        className="mr-2 p-2 rounded bg-lightBlue-500"
                      >
                        <ModalDetails
                          policy={policy}
                        />
                      </ModalButton>
                    </td>
                  </tr>
                )
              )}
            </tbody>
          </table>
        </Container>
        <TablePaginator
          data={policies}
          emptyMessage="Sem informações para listar"
          isLoading={isLoading}
          meta={meta}
          setCurrentPage={setCurrentPage}
        />
      </CardTableList>
    </PageCard>
  );
};

export default Policy;
