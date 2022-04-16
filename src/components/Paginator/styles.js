import styled from 'styled-components';

export const Container = styled.div`
  .paginator {
    display: flex;
    font-size: small;

    margin-left: 2rem;

    li {
      display: inline-block;
      margin: 1rem 0.1rem;
      &.active {
        button {
          color: #fff;
          background: #2d93d6;
          padding: 0;
        }
      }
      button {
        border: 0.15rem solid #2d93d6;
        border-radius: 50px;
        height: 2rem;
        width: 2rem;
        padding: 0;
        outline: none;
        white-space: nowrap;
        line-height: 1rem;
        text-align: center;

        svg {
          margin: auto;
        }
      }
    }
  }
`;
