import styled, { css } from 'styled-components';

export const InputStyles = styled.div`
  display: flex;
  width: 100%;
  justify-content: center;
  align-items: center;
  position: relative;
  border: 1px dashed ${({ fileName }) => (fileName ? '#000cf5' : '#505050dd')};
  border-radius: 0.25rem;
  transition: background 0.3s;

  &:hover {
    background: #035a9413;
    border-color: #554cfa;
  }

  label {
    display: flex;
    position: absolute;
    width: 100%;
    height: 100%;
    background-color: ${({ dragZone }) => (dragZone ? '#000cf52b' : '')};

    input[type='file']::-webkit-file-upload-button {
      display: none;
    }
    input[type='file'] {
      opacity: 0;
      flex-grow: 2;
      cursor: pointer;
    }
  }

  aside {
    ${({ theme, dragZone }) => css`
      padding: ${dragZone ? '2rem 0' : 0};
      transition: all 0.5s;
      strong {
        font-weight: normal;
        color: ${theme.colors.blue[900]};
      }
      span {
        color: ${theme.colors.primary};
      }
    `}
    min-height: 100px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }
`;
