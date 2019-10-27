import { Store, createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import { logger } from 'app/middleware';
import createSagaMiddleware from 'redux-saga';
import { rootReducer } from 'app/redux/reducers';
import { all } from 'redux-saga/effects';
import { saga as mainSaga } from './sagas/login';
import { IRootState } from 'app/redux/reducers';

export function configureStore(): Store<IRootState> {
  const sagaMiddleware = createSagaMiddleware();
  let middleware = applyMiddleware(logger, sagaMiddleware);

  if (process.env.NODE_ENV !== 'production') {
    middleware = composeWithDevTools(middleware);
  }

  const store = createStore(rootReducer, middleware) as Store<IRootState>;

  if (module.hot) {
    module.hot.accept('../redux/reducers', () => {
      const nextReducer = require('../redux/reducers');
      store.replaceReducer(nextReducer);
    });
  }

  function* rootSaga() {
    yield all([mainSaga()]);
  }
  sagaMiddleware.run(rootSaga);

  return store;
}
