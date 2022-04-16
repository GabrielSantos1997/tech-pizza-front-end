import styled from 'styled-components';

const tableColors = {
  tableEven: '#f7f7f7',
  tableTdEven: '#757575',
  tableTdOdd: '#2c2c2c',
};
const buttonColor = {
  cancel: '#e75150',
};
export const Container = styled.form`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  background-color: #fff;
  max-width: 500px;
  border-radius: 2rem;
  table {
    width: 100%;
    table-layout: fixed;
    overflow-wrap: break-word;

    tr:nth-child(even) {
      background-color: ${tableColors.tableEven};
    }

    td {
      text-align: left;
      padding: 12px;
      color: ${tableColors.tableTdEven};
      font-weight: 300;
    }
    td:nth-child(odd) {
      color: ${tableColors.tableTdOdd};
      font-weight: 500;
    }
  }
  a {
    color: blue;
    text-decoration: underline;
    font-size: 13px;
  }
  p {
    color: red;

    font-size: 13px;
  }

  section {
    display: flex;
    flex-direction: row-reverse;
    width: 50%;
    align-self: flex-end;
    height: 40px;
  }
`;

const Button = styled.button`
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  background-color: #0ea5e9;
  border-radius: 0.25rem;
  color: #fff;
  font-size: 14px;
  padding: 0.5rem 0.75rem;
`;

export const ButtonDefault = styled(Button)`
  margin-left: 0.5rem;
  display: flex;
  align-items: center;
`;

export const ButtonDownload = styled(Button)`
  display: flex;
  align-items: center;
`;

export const ButtonRed = styled(Button)`
  background-color: ${buttonColor.cancel};
`;
