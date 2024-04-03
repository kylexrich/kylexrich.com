import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { Provider } from 'react-redux';
import { ChakraProvider, ColorModeScript } from '@chakra-ui/react';
import store from './redux/store';
import { theme } from './theme/theme';
import { GlobalAccent } from './theme/AccentSwitcher';

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);

root.render(
    <React.StrictMode>
        <Provider store={store}>
            <ColorModeScript />
            <ChakraProvider theme={theme}>
                <GlobalAccent />
                <App />
            </ChakraProvider>
        </Provider>
    </React.StrictMode>
);
