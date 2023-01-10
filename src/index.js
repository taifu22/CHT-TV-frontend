import React from 'react';
import ReactDOM from 'react-dom';
import Router from './components/Router';
import store from './lib/state/store/store'
import { Provider } from "react-redux";
import { persistStore } from 'redux-persist';
import { PersistGate } from 'redux-persist/integration/react';

let persistor = persistStore(store);
export {persistor};

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}> 
      <PersistGate persistor={persistor}>
        <Router />
      </PersistGate>
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);
 

