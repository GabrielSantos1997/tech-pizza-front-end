import React, { useState, useEffect } from 'react';
import { FiCheckCircle, FiPlus, FiTrash, FiXCircle } from 'react-icons/fi';
import { FaEye } from 'react-icons/fa';
import { useParams } from 'react-router-dom';

import useDelete from 'services/hooks/useDelete';
import useGetList from 'services/hooks/useGetList';
import TablePaginator from 'components/Paginator';
import { Modal } from 'components/Modals/Modal';
import PageCard from 'components/Cards/PageCard';
import { colors } from 'assets/styles/theme';
import { Container } from '../../assets/shared/styles';
import CardTableList from 'components/Cards/CardTableList';
import SearchEngine from 'components/Search/SearchEngine';
import ModalForm from './ModalForm';
import { useSelector } from 'react-redux';
import Sorting from "components/Sorting";

const Users = ({ color = 'light' }) => {
  const { role } = useParams();

  const [currentPage, setCurrentPage] = useState(1);
  const [action, setAction] = useState(1);
  const search = useSelector((state) => state.filter.value);
  const [openForm, setOpenForm] = useState(false);
  const [selected, setSelected] = useState({});
  const [sortingString, setSortingString] = useState("");
  const [direction, setDirection] = useState("");
  const [currentSortingField, setCurrentSortingField] = useState("");
  const [currentSortingDirection, setCurrentSortingDirection] = useState(false);

  // get LIST
  const {
    data: users,
    getItems,
    isLoading: isLoadingList,
    meta,
  } = useGetList({
    page: currentPage,
    route: `adm/user/${role}/list?&${sortingString}`,
    search,
    sortingString,
  });

  // DELETE
  const { apiDelete, isLoading: isLoadingDelete } = useDelete({
    errorMessage: 'falha ao apagar usuário, tente novamente mais tarde',
    successMessage: 'usuário removido com sucesso',
    onSuccess: getItems,
  });

  useEffect(() => {
    getItems();
  }, [action, sortingString]);

  const isLoading = isLoadingList || isLoadingDelete;

  const usersTest = [
    {
      'id': 1,
      'nome': 'Gabriel Santos',
      'email': 'gabriel@gabriel.com.br',
      'dataDeCadastro': '10/10/2010',
    }, {
      'id': 2,
      'nome': 'Fabricio',
      'email': 'fabricio@fabricio.com.br',
      'dataDeCadastro': '10/10/2010',
    }, {
      'id': 3,
      'nome': 'Alan',
      'email': 'alan@alan.com.br',
      'dataDeCadastro': '10/10/2010',
    }, {
      'id': 4,
      'nome': 'Juliana',
      'email': 'juliana@juliana.com.br',
      'dataDeCadastro': '10/10/2010',
    }, {
      'id': 5,
      'nome': 'Gabriel Souza',
      'email': 'gabriels@gabriels.com.br',
      'dataDeCadastro': '10/10/2010',
    }
  ];

  return (
    <PageCard
      color={color}
      headerContent={
        <>
          <SearchEngine fields={['search', 'email', 'name']} />
        </>
      }
    >
      <Modal
        title={`${
          selected.identifier ? `Editar ${selected.name}` : 'Novo Usuário'
        }`}
        show={openForm}
        setShow={setOpenForm}
      >
        <ModalForm
          onSuccess={() => getItems()}
          identifier={selected.identifier}
          role={role}
        />
      </Modal>
      <CardTableList title={
        role === 'admin'
          ? 'Administradores'
          : role === 'manager'
          ? 'Gerentes'
          : 'Compradores'
      } color={color}>
        <div className="flex flex-wrap float-right mb-4">
          <div className="w-full">
            <button
              type="button"
              title="Adicionar novo usuário"
              className="p-2 mr-3 auto rounded bg-black"
              onClick={() => {
                setSelected({});
                setOpenForm(true);
              }}
            >
              <FiPlus size={15} color="#fff" />
            </button>
          </div>
        </div>
        <Container className="w-full overflow-auto">
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
                  <Sorting
                    label="Nome"
                    field="e.name"
                    currentSortingField={currentSortingField}
                    setCurrentSortingField={setCurrentSortingField}
                    currentSortingDirection={currentSortingDirection}
                    setCurrentSortingDirection={setCurrentSortingDirection}
                    setSortingString={setSortingString}
                  />
                </th>
                <th
                  className={`align-middle border border-solid text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left ${
                    color === 'light'
                      ? 'bg-blueGray-50 text-blueGray-500 border-blueGray-100'
                      : 'bg-lightBlue-800 text-lightBlue-300 border-lightBlue-700'
                  }`}
                >
                  <Sorting
                    label="E-mail"
                    field="e.email"
                    currentSortingField={currentSortingField}
                    setCurrentSortingField={setCurrentSortingField}
                    currentSortingDirection={currentSortingDirection}
                    setCurrentSortingDirection={setCurrentSortingDirection}
                    setSortingString={setSortingString}
                  />
                </th>
                <th
                  className={`align-middle border border-solid text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left ${
                    color === 'light'
                      ? 'bg-blueGray-50 text-blueGray-500 border-blueGray-100'
                      : 'bg-lightBlue-800 text-lightBlue-300 border-lightBlue-700'
                  }`}
                >
                  <Sorting
                    label="Data de Cadastro"
                    field="e.email"
                    currentSortingField={currentSortingField}
                    setCurrentSortingField={setCurrentSortingField}
                    currentSortingDirection={currentSortingDirection}
                    setCurrentSortingDirection={setCurrentSortingDirection}
                    setSortingString={setSortingString}
                  />
                </th>
                <th
                  className={`align-middle  border border-solid text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left ${
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
              {usersTest?.map(
                ({ id, nome, email, dataDeCadastro }) => (
                  <tr key={id}>
                    <td className=" text-xs whitespace-nowrap">
                      <span
                        className={`font-bold ${+(color === 'light'
                          ? 'text-blueGray-600'
                          : 'text-white')}`}
                      >
                        {nome}
                      </span>
                    </td>
                    <td className="text-xs  font-light whitespace-nowrap">
                      <span
                        className={`${+(color === 'light'
                          ? 'text-blueGray-600'
                          : 'text-white')}`}
                      >
                        {email}
                      </span>
                    </td>
                    <td className="text-xs  font-light whitespace-nowrap">
                      <span
                        className={`${+(color === 'light'
                          ? 'text-blueGray-600'
                          : 'text-white')}`}
                      >
                        {dataDeCadastro}
                      </span>
                    </td>
                    <td className="flex py-2 whitespace-nowrap">
                      <button
                        type="button"
                        className="mr-2 p-2 rounded bg-lightBlue-500"
                        onClick={() => {
                          setSelected({ identifier, name });
                          setOpenForm(true);
                        }}
                      >
                        <FaEye size={15} color="#fff" />
                      </button>

                      <button
                        type="button"
                        className="p-2 rounded bg-red-500"
                        onClick={() => {
                          apiDelete({
                            name,
                            route: `/adm/user/${identifier}/remove`,
                          });
                        }}
                      >
                        <FiTrash size={15} color="#fff" />
                      </button>
                    </td>
                  </tr>
                )
              )}
            </tbody>
          </table>
        </Container>
        <TablePaginator
          data={users}
          emptyMessage="Sem informações para listar"
          isLoading={isLoading}
          meta={meta}
          setCurrentPage={setCurrentPage}
        />
      </CardTableList>
    </PageCard>
  );
};

export default Users;
