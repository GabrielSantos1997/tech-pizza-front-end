import React, { Profiler, useState, useEffect } from 'react';
import { FiDownload, FiPlus, FiRefreshCcw, FiRefreshCw, FiTrash } from 'react-icons/fi';
import { FaEye } from 'react-icons/fa';

import useDelete from 'services/hooks/useDelete';
import { useSelector } from 'react-redux';
import useGetList from 'services/hooks/useGetList';
import SearchEngine from 'components/Search/SearchEngine';
import TablePaginator from 'components/Paginator';
import { Modal, ModalButton } from 'components/Modals/Modal';
import PageCard from 'components/Cards/PageCard';
import Sorting from "components/Sorting";
import ModalDetails from './ModalDetails';
import ModalForm from './ModalForm';
import api from 'services/api';
import { useProfile } from 'services/profile/getProfile';
import { Container } from '../../../assets/shared/styles';
import CardTableList from 'components/Cards/CardTableList';

const Spots = ({ color = 'light' }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const search = useSelector((state) => state.filter.value);
  const [openForm, setOpenForm] = useState(false);
  const [selected, setSelected] = useState({});
  const { user } = useProfile();
  const [action, setAction] = useState(1);
  const [sortingString, setSortingString] = useState("");
  const [direction, setDirection] = useState("");
  const [currentSortingField, setCurrentSortingField] = useState("");
  const [currentSortingDirection, setCurrentSortingDirection] = useState(false);

  // get LIST
  const {
    data: spots,
    getItems,
    isLoading: isLoadingList,
    meta,
  } = useGetList({
    page: currentPage,
    route: `spot/list?&${sortingString}`,
    search,
    sortingString,
  });

  // DELETE
  const { apiDelete, isLoading: isLoadingDelete } = useDelete({
    errorMessage: 'falha ao apagar funcionário, tente novamente mais tarde',
    successMessage: 'Funcionário removido com sucesso',
    onSuccess: getItems,
  });

  function handleEdit(identifier) {
    setOpenForm(true);
    setSelected({ identifier });
  }

  const isLoading = isLoadingList || isLoadingDelete;

  useEffect(() => {
    getItems();
}, [action, sortingString]);

  return (
    <>
      <PageCard
        color={color}
        headerContent={
          <>
            <SearchEngine role={user.role} fields={['search', 'title', 'search', 'title', 'voiceGenre', 'length', 'background', 'text', 'status', 'operator', 'date', 'tags']} />
          </>
        }
      >
        <Modal
          title={`${selected.identifier ? 'Editar' : 'Novo'} Spot`}
          show={openForm}
          setShow={setOpenForm}
        >
          <ModalForm
            onSuccess={() => getItems()}
            identifier={selected.identifier}
          />
        </Modal>
        <CardTableList title="Spots" color={color}>
          <div className="relative mb-2">
            <div className="absolute bottom-0 right-0">
              <button
              type="button"
              title="Atualizar listagem"
              className="p-2 mr-3 auto rounded bg-black"
              onClick={getItems}
            >
              <FiRefreshCw size={15} color="#fff" />
            </button>
            <button
              type="button"
              title="Adicionar novo spot"
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
          <Container>
            <div className="overflow-auto">
              <table className="items-center table-auto w-full bg-transparent border-collapse">
                <thead>
                  <tr>
                    <th
                      className={`align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left ${
                        color === 'light'
                          ? 'bg-blueGray-50 text-blueGray-500 border-blueGray-100'
                          : 'bg-lightBlue-800 text-lightBlue-300 border-lightBlue-700'
                      }`}
                    >
                      <Sorting
                        label="Título"
                        field="e.title"
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
                        label="Tipo de voz"
                        field="e.voiceGenre"
                        currentSortingField={currentSortingField}
                        setCurrentSortingField={setCurrentSortingField}
                        currentSortingDirection={currentSortingDirection}
                        setCurrentSortingDirection={setCurrentSortingDirection}
                        setSortingString={setSortingString}
                      />
                    </th>
                    <th
                      className={`align-middle text-center border border-solid text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left ${
                        color === 'light'
                          ? 'bg-blueGray-50 text-blueGray-500 border-blueGray-100'
                          : 'bg-lightBlue-800 text-lightBlue-300 border-lightBlue-700'
                      }`}
                    >
                      <Sorting
                        label="Duração"
                        field="e.length"
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
                        label="Trilha"
                        field="background.title"
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
                        label="Texto"
                        field="e.text"
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
                        label="Status"
                        field="e.status"
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
                        label="Data de cadastro"
                        field="e.createdAt"
                        currentSortingField={currentSortingField}
                        setCurrentSortingField={setCurrentSortingField}
                        currentSortingDirection={currentSortingDirection}
                        setCurrentSortingDirection={setCurrentSortingDirection}
                        setSortingString={setSortingString}
                      />
                    </th>
                    {user.role === 'ROLE_SYSTEM_ADMIN' && (
                      <th
                        className={`align-middle border border-solid text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left ${
                          color === 'light'
                            ? 'bg-blueGray-50 text-blueGray-500 border-blueGray-100'
                            : 'bg-lightBlue-800 text-lightBlue-300 border-lightBlue-700'
                        }`}
                      >
                        <Sorting
                          label="Usuário"
                          field="user.name"
                          currentSortingField={currentSortingField}
                          setCurrentSortingField={setCurrentSortingField}
                          currentSortingDirection={currentSortingDirection}
                          setCurrentSortingDirection={setCurrentSortingDirection}
                          setSortingString={setSortingString}
                        />
                      </th>
                    )}
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
                  {spots?.map((spot) => {
                    const { identifier, tagsFormatted, title, voiceGenre, length, background, text, status, statusReadable, createdAtFormatted, tags } = spot;

                    return (
                      <>
                        <tr key={identifier}>
                          <td className="text-xs whitespace-nowrap">
                            <span
                              className={`font-bold ${+(color === 'light'
                                ? 'text-blueGray-600'
                                : 'text-white')}`}
                            >
                              {title}
                              <div className="flex">
                                {tags.map((item) => {
                                  return (
                                    <>
                                      <div class="flex space-x-2 justify-center">
                                          <span class="text-xs inline-block px-2 leading-none text-center whitespace-nowrap align-baseline font-bold text-blue-600 bg-blue-200 rounded-full">{item.title}</span>
                                      </div>
                                    </>
                                  )
                                })}
                              </div>
                            </span>
                          </td>
                          <td className="text-xs font-light whitespace-nowrap">
                            <span
                              className={`${+(color === 'light'
                                ? 'text-blueGray-600'
                                : 'text-white')}`}
                            >
                              {voiceGenre == 'F' ? 'Feminina' : 'Masculina'}
                            </span>
                          </td>
                          <td className="text-xs text-center font-light whitespace-nowrap">
                            <span
                              className={`${+(color === 'light'
                                ? 'text-blueGray-600'
                                : 'text-white')}`}
                            >
                              {length}s
                            </span>
                          </td>
                          <td className="text-xs font-light whitespace-nowrap">
                            <span
                              className={`${+(color === 'light'
                              ? 'text-blueGray-600'
                              : 'text-white')}`}
                            >
                              {background?.title}
                            </span>
                          </td>
                          <td className="text-xs font-light whitespace-nowrap">
                            <span
                              className={`${+(color === 'light'
                                ? 'text-blueGray-600'
                                : 'text-white')}`}
                            >
                              {text.length > 45 ? (text.substring(0, 45) + '[...]') : text}
                            </span>
                          </td>
                          <td className="text-xs font-light whitespace-nowrap">
                            <span
                              className={`${+(color === 'light'
                                ? 'text-blueGray-600'
                                : 'text-white')}`}
                            >
                              {statusReadable}
                            </span>
                          </td>
                          <td className="text-xs font-light whitespace-nowrap">
                            <span
                              className={`${+(color === 'light'
                                ? 'text-blueGray-600'
                                : 'text-white')}`}
                            >
                              {createdAtFormatted}
                            </span>
                          </td>
                          {user.role === 'ROLE_SYSTEM_ADMIN' && (
                            <td className="text-xs font-light whitespace-nowrap">
                              <span
                                className={`${+(color === 'light'
                                  ? 'text-blueGray-600'
                                  : 'text-white')}`}
                              >
                                {spot.user?.name}
                              </span>
                            </td>
                          )}

                          <td className="flex py-2">
                            <ModalButton
                              buttonContent={<FaEye size={15} color="#fff" />}
                              title="Detalhes do spot"
                              className="mr-2 p-2 rounded bg-lightBlue-500"
                            >
                              <ModalDetails
                                openForm={() => handleEdit(identifier)}
                                identifier={identifier}
                              />
                            </ModalButton>

                            {status == 'PROCESSED' && (
                              <button
                                type="button"
                                className="p-2 mr-2 rounded bg-green-500"
                                onClick={() => {
                                  api
                                    .get(`spot/${identifier}/download`, { responseType: 'blob' })
                                    .then((response) => {
                                      const type = response.headers['content-type'];
                                      const blob = new Blob([response.data], { type });
                                      const url = window.URL.createObjectURL(blob);
                                      const link = document.createElement('a');
                                      link.href = url;
                                      link.setAttribute('download', 'spot-' + title);
                                      document.body.appendChild(link);
                                      link.click();
                                      link.remove();
                                    })
                                  ;
                                }}
                              >
                                <FiDownload size={15} color="#fff" />
                              </button>
                            )}

                            <button
                              type="button"
                              className="p-2 rounded bg-red-500"
                              onClick={() => {
                                apiDelete({
                                  name,
                                  route: `/spot/${identifier}/remove`,
                                });
                              }}
                            >
                              <FiTrash size={15} color="#fff" />
                            </button>
                          </td>
                        </tr>
                      </>
                    )
                  })}
                </tbody>
              </table>
            </div>
          </Container>
        </CardTableList>
        <TablePaginator
          data={spots}
          emptyMessage="Nenhum spot encontrado"
          isLoading={isLoading}
          meta={meta}
          setCurrentPage={setCurrentPage}
        />
      </PageCard>
    </>
  );
};

export default Spots;
