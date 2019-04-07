import React from 'react';
import {applyMiddleware, compose, createStore} from 'redux';
import rootReducer from './rootReducer';
import {persistReducer, persistStore} from 'redux-persist'
import storage from 'redux-persist/lib/storage';
import autoMergeLevel2 from 'redux-persist/lib/stateReconciler/autoMergeLevel2';
import thunk from "redux-thunk";
import './index.scss';

const persistConfig = {
    key: 'root',
    storage,
    stateReconciler: autoMergeLevel2,
};

const persistedReducer = persistReducer(persistConfig, rootReducer);
const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export const store = createStore(
    persistedReducer,
    composeEnhancer(applyMiddleware(thunk)),
);

export const persistor = persistStore(store);
