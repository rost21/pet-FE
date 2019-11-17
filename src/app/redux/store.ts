import { Store, createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import { logger } from 'app/middleware';
import createSagaMiddleware from 'redux-saga';
import { rootReducer } from 'app/redux/rootReducer';
import { IRootReducer } from 'app/redux/rootReducer';
import { rootSaga } from './rootSaga';

export function configureStore(): Store<IRootReducer> {
  const sagaMiddleware = createSagaMiddleware();
  let middleware = applyMiddleware(logger, sagaMiddleware);

  if (process.env.NODE_ENV !== 'production') {
    middleware = composeWithDevTools(middleware);
  }

  const store = createStore(rootReducer, middleware) as Store<IRootReducer>;

  if (module.hot) {
    module.hot.accept('../redux/rootReducer', () => {
      const nextReducer = require('../redux/rootReducer');
      store.replaceReducer(nextReducer);
    });
  }

  sagaMiddleware.run(rootSaga);

  return store;
}
