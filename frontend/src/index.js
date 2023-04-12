import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { store } from './data/store';
import { Provider } from 'react-redux'

const root = ReactDOM.createRoot(document.getElementById('root'));
//Establecemos el almacen de los estados con Provider y envolvemos el componente al cual queremos que le afecte ello
root.render(
  <React.StrictMode>
    <Provider store={store} >
    <App />
    </Provider>
  </React.StrictMode>
);
