import React from 'react';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { ToastContainer } from 'react-toastify';
import { ThemeProvider } from 'styled-components';
import '@fortawesome/fontawesome-free/css/all.min.css';
import 'react-toastify/dist/ReactToastify.css';

import 'config/ReactotronConfig';
import 'assets/styles/index.css';

import theme from 'assets/styles/theme';
import GlobalStyle from 'config/GlobalStyle';
import { store, persistor } from 'store';
import Routes from 'routes';

function App() {
  return (
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <ThemeProvider theme={theme}>
          <GlobalStyle />
          <ToastContainer autoClose={3000} />
          <Routes />
        </ThemeProvider>
      </PersistGate>
    </Provider>
  );
}

export default App;
