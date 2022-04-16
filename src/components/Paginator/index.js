import React, { useEffect } from 'react';
import Paginator from 'react-hooks-paginator';
import { FiChevronsLeft, FiChevronsRight } from 'react-icons/fi';
import { ClipLoader } from 'react-spinners';

import { Container } from './styles';

function TablePaginator({
  meta,
  setCurrentPage,
  isLoading,
  data,
  emptyMessage,
}) {
  useEffect(() => {
    const buttons = document.getElementsByClassName('page-link');
    for (let x = 0; x < buttons.length; x += 1) {
      const { length } = buttons[x]?.innerHTML?.toString() || {};
      if (length < 10) {
        const button = buttons[x];
        button.style = `font-size: calc(1rem - ${length / 15}rem)`;
      }
    }
  }, [meta, data]);

  return (
    <Container className="mt-2">
      {isLoading ? (
        <div className="text-center">
          <ClipLoader size={20} color="#0842ff" />
        </div>
      ) : (
        !data?.length && (
          <p className="text-center">{emptyMessage || 'sem dados'} </p>
        )
      )}
      {!!meta?.total_count && (
        <Paginator
          pageContainerClass="paginator"
          pageActiveClass="active"
          pageNextText={<FiChevronsRight />}
          pagePrevText={<FiChevronsLeft />}
          totalRecords={+meta.total_count || 0}
          pageLimit={+meta.page_size || 0}
          currentPage={+meta.current_page || 0}
          pageNeighbours={2}
          setCurrentPage={setCurrentPage}
          setOffset={() => {}}
        />
      )}
    </Container>
  );
}

export default TablePaginator;
