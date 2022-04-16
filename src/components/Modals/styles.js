import styled, { css } from 'styled-components';

export const Container = styled.div`
  display: flex;
  margin: 0;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  position: fixed;
  z-index: 2000;
  padding: 1rem;
  min-height: 90%;
  min-width: 90%;
  overflow: auto;
  background: rgba(0, 0, 0, 0.3);

  #bgClose {
    min-height: 100vh;
    min-width: 100vw;
    position: fixed;
    z-index: -10;
    cursor: alias;
    top: 0;
    left: 0;
  }
  #main {
    display: grid;
    grid-template-columns: 1fr 2rem;
    grid-template-rows: auto 1fr;
    grid-template-areas:
      'h h'
      'children children';
    align-items: center;
    padding: 15px;

    overflow: visible;
    border-radius: 0.3rem;
    margin: auto;

    animation: fadeIn ease-out 0.2s;
    @keyframes fadeIn {
      0% {
        overflow: hidden;
        opacity: 0;
      }
      50% {
        overflow: hidden;
        opacity: 0.3;
      }
      100% {
        overflow: hidden;
        opacity: 0.8;
      }
    }

    #header {
      grid-area: h;
      background: #fff;
      display: flex;
      justify-content: space-between;
      align-items: center;
      #title {
        color: #94a3b8;
        font-size: small;
        text-transform: uppercase;
      }
      #close {
        cursor: pointer !important;
        svg {
          color: #1381ff;
        }
      }
    }
    #children {
      grid-area: children;
      padding-top: 10px;
    }
    ${({ transparent }) =>
      transparent
        ? css`
            background: transparent;
            #header {
              padding: 15px;
              border-radius: 0.3rem;
            }
            #children {
              padding-top: 0;
              margin-top: -1rem;
            }
          `
        : css`
            background: #fff;
          `}
  }
`;
