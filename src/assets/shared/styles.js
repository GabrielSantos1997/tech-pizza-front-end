import styled from 'styled-components';

export const Container = styled.main`
  table {
    td,
    th {
      width: 1%;
      white-space: nowrap;
      padding: 0.5rem 0.75rem;
    }
    tr {
      &:hover {
        background-color: #f1f7f8;
      }
      transition: background 0.4s;
    }
  }
`;
