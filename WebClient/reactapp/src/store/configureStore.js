import { applyMiddleware, compose, createStore } from 'redux';
import reducers from './reducers';
import createSagaMiddleware from 'redux-saga';
import rootSaga from './sagas';
const sagaMiddleware = createSagaMiddleware ();
const middlewares = [sagaMiddleware];

export default function configureStore (initialState) {
    const store = createStore (reducers, initialState,
    compose (applyMiddleware (...middlewares)));
    sagaMiddleware.run (rootSaga);
    return store;
}
