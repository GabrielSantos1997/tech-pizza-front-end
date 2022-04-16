import styled from 'styled-components';

export const ButtonDefault = styled.button`
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  background-color: ${({ theme }) => theme.colors.primary};
  border-radius: 0.25rem;
  color: #fff;
  font-size: 14px;
  padding: 0.5rem 0.75rem;
`;
