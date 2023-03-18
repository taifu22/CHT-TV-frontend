import {configureStore} from "@reduxjs/toolkit";
import userReducer from '../features/user.slice';
//import storage from 'redux-persist/lib/storage';
import productsReducer from '../features/products.slice';
import cartSlice from "../features/cart.slice";
import opinionSlice from "../features/opinion.slice";
import { combineReducers } from 'redux';
import { persistReducer, FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER } from 'redux-persist';
import sessionStorage from 'redux-persist/es/storage/session';

const persistConfig = {
    key: 'persist', 
    //on utilise le sessionStorage pour que les données persisté dont la connexion de l'user se detruisent à la fermeture du navigateur
    storage:sessionStorage,
};

const reducers = combineReducers({
    products: productsReducer,
    user: userReducer, 
    cart: cartSlice,
    opinions : opinionSlice
});
const persistedReducer = persistReducer(persistConfig, reducers);

export default configureStore({ 
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: {
                ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
            },
        }),
});
