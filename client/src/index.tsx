import React from 'react';
import ReactDOM from 'react-dom/client';
import {Provider} from 'react-redux';
import {ChakraProvider, ColorModeScript} from '@chakra-ui/react';
import {theme} from './theme/theme.ts';
import store from './redux/store.ts';
import {GlobalAccent} from './theme/AccentSwitcher.tsx';
import {App} from './App.tsx';


const root = ReactDOM.createRoot(document.getElementById('root')!);

root.render(
    <React.StrictMode>
        <Provider store={store}>
            <ColorModeScript/>
            <ChakraProvider theme={theme}>
                <GlobalAccent/>
                <App/>
            </ChakraProvider>
        </Provider>
    </React.StrictMode>
);
