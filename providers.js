import { CacheProvider } from '@chakra-ui/next-js'
import moment from 'moment/min/moment-with-locales';
import theme from './theme';
import { ChakraProvider, ColorModeScript } from '@chakra-ui/react';
import { Provider } from 'react-redux';
import { store } from './store/store';

moment.locale('pt-br');

export function Providers({
    children
}) {
    return (
        <Provider store={store}>
            <CacheProvider>
                <ChakraProvider theme={theme}>
                    <ColorModeScript initialColorMode={theme.config.initialColorMode} />
                    {children}
                </ChakraProvider>
            </CacheProvider>
        </Provider>
    )
}