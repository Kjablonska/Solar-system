import { applyMiddleware, combineReducers, createStore } from 'redux';
import { persistReducer, persistStore } from 'redux-persist';
import { userOptionsReducer } from '../redux/reducer';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import * as localForage from 'localforage';

const persistConfig = {
    key: 'root',
    storage: localForage,
};

const persistedReducer = persistReducer(
    persistConfig,
    combineReducers({
        selectedOptions: userOptionsReducer,
    }),
);

// eslint-disable-next-line import/no-anonymous-default-export
export default () => {
    let store = createStore(persistedReducer, composeWithDevTools(applyMiddleware(thunk)));
    let persistor = persistStore(store);
    return { store, persistor };
};
