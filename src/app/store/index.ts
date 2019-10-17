import { Store, createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import { logger } from 'app/middleware';
// import createSagaMiddleware from 'redux-saga';
import { RootState, rootReducer } from 'app/redux/reducers';

export function configureStore(initialState?: RootState): Store<RootState> {
  // const sagaMiddleware = createSagaMiddleware();
  // let middleware = applyMiddleware(sagaMiddleware);
  let middleware = applyMiddleware(logger);

  if (process.env.NODE_ENV !== 'production') {
    middleware = composeWithDevTools(middleware);
  }

  const store = createStore(rootReducer as any, initialState as any, middleware) as Store<
    RootState
  >;

  if (module.hot) {
    module.hot.accept('../redux/reducers', () => {
      const nextReducer = require('../redux/reducers');
      store.replaceReducer(nextReducer);
    });
  }

  // sagaMiddleware.run();

  return store;
}
