import React from 'react';
import ReactDOM from 'react-dom/client';
import { App } from 'components/App';
import './index.css';
import { Global } from '@emotion/react';
import { GlobalStyles } from 'components/GlobalStyles/GlobalStyles';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Global styles={GlobalStyles} />
    <App />
  </React.StrictMode>
);
