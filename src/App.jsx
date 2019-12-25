import React from 'react';
import GlobalStyle from 'components/styles/global';
import Home from 'pages/home/Home';

import { Stitch } from 'mongodb-stitch-browser-sdk';

function App() {
  return (
    <>
      <GlobalStyle />
      <Home />
    </>
  );
}

export default App;
