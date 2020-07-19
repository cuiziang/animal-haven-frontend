import { configureStore, getDefaultMiddleware, combineReducers } from '@reduxjs/toolkit';
import { logger } from "redux-logger"
import animalsReducer from '../features/animals/animalsSlice';
import usersReducer from '../features/users/usersSlice';
import storage from 'redux-persist/lib/storage'
import { persistReducer } from 'redux-persist'

const reducers = combineReducers({
    animals: animalsReducer,
    users: usersReducer
})

const persistConfig = {
    key: 'root',
    storage
}

const persistedReducer = persistReducer(persistConfig, reducers)

export default configureStore({
    reducer: persistedReducer,
    middleware: [...getDefaultMiddleware(), logger]
});
