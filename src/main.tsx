import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createBrowserHistory } from 'history';
import { configureStore } from 'app/redux/store';
import { Router } from 'react-router';
import { App } from './app';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css';

// prepare store
export const history = createBrowserHistory();
const store = configureStore();

ReactDOM.render(
  <Provider store={store}>
    <Router history={history}>
      <>
        <App />
        <ToastContainer />
      </>
    </Router>
  </Provider>,
  document.getElementById('root')
);
