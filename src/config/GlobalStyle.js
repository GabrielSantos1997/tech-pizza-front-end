import { createGlobalStyle } from 'styled-components';
import theme from 'assets/styles/theme';

const GlobalStyle = createGlobalStyle`

* {
  margin:0;
  padding:0;
  box-sizing:border-box;
  font-family: 'Roboto', sans-serif;

  }
  body {
    background: ${theme.background};
    color: ${theme.text};
    -webkit-font-smoothing: antialiased;
  }
  body, input, button {
    font-size: 16px;
  }
  h1, h2, h3, h4, h5 {
    font-weight:100;
  }
  button {
    cursor: pointer;
  }

input[type=number]::-webkit-inner-spin-button,
input[type=number]::-webkit-outer-spin-button {
    -webkit-appearance: none;
    -moz-appearance: none;
    appearance: none;
    margin: 0;
}
`;
export default GlobalStyle;
