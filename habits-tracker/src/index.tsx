import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from "react-router-dom";
import { ChakraProvider, ColorModeScript } from '@chakra-ui/react'


import App from './App';
import defaultTheme from './theme'

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <React.StrictMode>
    <BrowserRouter>    
      <ChakraProvider>
      <ColorModeScript initialColorMode={defaultTheme.config.initialColorMode} />
        <App />
      </ChakraProvider>
    </BrowserRouter>    
  </React.StrictMode>
);
