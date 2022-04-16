import React, { useState } from 'react';
import useGetList from 'services/hooks/useGetList';
import TablePaginator from 'components/Paginator';
import { Modal } from 'components/Modals/Modal';
import PageCard from 'components/Cards/PageCard';
import { Container } from '../../assets/shared/styles';
import CardTableList from 'components/Cards/CardTableList';
import ModalForm from './ModalForm';
import { FiCheckCircle, FiPlus, FiTrash, FiXCircle } from 'react-icons/fi';
import { FaEye } from 'react-icons/fa';
import UploadFile from 'components/Modals/UploadFile';
import SearchEngine from 'components/Search/SearchEngine';
import { useSelector } from 'react-redux';

const Employee = ({ color = 'light' }) => {
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

  const employees = [
    {
      'id': 1,
      'codigo': '0001',
      'nome': 'Gabriel Santos',
      'email': 'gabriel@gabriel.com.br',
      'telefone': '11970373426',
      'cargo': 'Pizzaiolo',
      'dataDeCadastro': '10/10/2010',
    }, {
      'codigo': '0002',
      'id': 2,
      'nome': 'Fabricio',
      'email': 'fabricio@fabricio.com.br',
      'telefone': '11970373426',
      'cargo': 'Pizzaiolo',
      'dataDeCadastro': '10/10/2010',
    }, {
      'id': 3,
      'codigo': '0003',
      'nome': 'Alan',
      'email': 'alan@alan.com.br',
      'telefone': '11970373426',
      'cargo': 'Pizzaiolo',
      'dataDeCadastro': '10/10/2010',
    }, {
      'id': 4,
      'codigo': '0004',
      'nome': 'Juliana',
      'email': 'juliana@juliana.com.br',
      'telefone': '11970373426',
      'cargo': 'Pizzaiolo',
      'dataDeCadastro': '10/10/2010',
    }, {
      'id': 5,
      'codigo': '0005',
      'nome': 'Gabriel Souza',
      'email': 'gabriels@gabriels.com.br',
      'telefone': '11970373426',
      'cargo': 'Pizzaiolo',
      'dataDeCadastro': '10/10/2010',
    }
  ];

  return (
    <PageCard
      color={color}
      headerContent={
        <>
          <SearchEngine fields={['search', 'email', 'name', 'codigo', 'cargo']} />
        </>
      }
    >
      <Modal
        title={`${
          selected.id ? `Editar ${selected.name}` : 'Novo funcionário'
        }`}
        show={openForm}
        setShow={setOpenForm}
      >
        <ModalForm
          onSuccess={() => getItems()}
          identifier={selected.id}
        />
      </Modal>
      <CardTableList title={'Funcionários'} color={color}>
        <div className="flex flex-wrap float-right mb-4">
          <div className="w-full">
            <button
              type="button"
              title="Adicionar novo funcionário"
              className="p-2 mr-3 auto rounded bg-black"
              onClick={() => {
                // setSelected({});
                // setOpenForm(true);
              }}
            >
              <FiPlus size={15} color="#fff" />
            </button>
          </div>
        </div>
        <Container className="w-full overflow-auto">
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
                    Nome
                  </th>
                  <th
                    className={`align-middle border border-solid text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left ${
                      color === 'light'
                        ? 'bg-blueGray-50 text-blueGray-500 border-blueGray-100'
                        : 'bg-lightBlue-800 text-lightBlue-300 border-lightBlue-700'
                    }`}
                  >
                    Email
                  </th>
                  <th
                    className={`align-middle border border-solid text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left ${
                      color === 'light'
                        ? 'bg-blueGray-50 text-blueGray-500 border-blueGray-100'
                        : 'bg-lightBlue-800 text-lightBlue-300 border-lightBlue-700'
                    }`}
                  >
                    Telefone
                  </th>
                  <th
                    className={`align-middle border border-solid text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left ${
                      color === 'light'
                        ? 'bg-blueGray-50 text-blueGray-500 border-blueGray-100'
                        : 'bg-lightBlue-800 text-lightBlue-300 border-lightBlue-700'
                    }`}
                  >
                    Data de Cadastro
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
                {employees?.map(
                  (employee) => (
                    <tr key={employee.id}>
                      <td className="text-xs">
                        <span
                          className={`${+(color === 'light'
                            ? 'text-blueGray-600'
                            : 'text-white')}`}
                        >
                          {employee?.codigo}
                        </span>
                      </td>
                      <td className="text-xs">
                        <span
                          className={`${+(color === 'light'
                            ? 'text-blueGray-600'
                            : 'text-white')}`}
                        >
                          {employee?.nome}
                        </span>
                      </td>
                      <td className="text-xs">
                        <span
                          className={`${+(color === 'light'
                            ? 'text-blueGray-600'
                            : 'text-white')}`}
                        >
                          {employee?.email}
                        </span>
                      </td>
                      <td className="text-xs">
                        <span
                          className={`${+(color === 'light'
                            ? 'text-blueGray-600'
                            : 'text-white')}`}
                        >
                          {employee?.telefone}
                        </span>
                      </td>
                      <td className="text-xs">
                        <span
                          className={`${+(color === 'light'
                            ? 'text-blueGray-600'
                            : 'text-white')}`}
                        >
                          {employee?.dataDeCadastro}
                        </span>
                      </td>
                      <td className="text-xs">
                        <button
                          type="button"
                          className="mr-2 p-2 rounded bg-lightBlue-500"
                          onClick={() => {
                            setSelected(employee);
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
        {/*<TablePaginator
          data={metaFields}
          emptyMessage="Sem informações para listar"
          isLoading={isLoading}
          meta={meta}
          setCurrentPage={setCurrentPage}
        />*/}
      </CardTableList>
    </PageCard>
  );
};

export default Employee;
