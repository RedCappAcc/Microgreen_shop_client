import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import thunk from 'redux-thunk'
import { createStore,compose,applyMiddleware} from 'redux';
import rootReducer from './store/reducer/rootReducer';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import {Provider as AlertProvider} from 'react-alert'
import {AlertTemplate, options} from './alert'

const composeEnhancers = (typeof window !== 'undefined' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) || compose;

const store = createStore(rootReducer,composeEnhancers(
  applyMiddleware(thunk)
));




ReactDOM.render(
  <React.StrictMode>
    <Provider store = {store}>
      <BrowserRouter>
        <AlertProvider template={AlertTemplate} {...options}>
          <App />
        </AlertProvider>
      </BrowserRouter>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);
