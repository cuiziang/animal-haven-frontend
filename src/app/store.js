import {configureStore, getDefaultMiddleware} from '@reduxjs/toolkit';
import {logger} from "redux-logger"
import animalsReducer from '../features/animals/animalsSlice';
import usersReducer from '../features/users/usersSlice';


export default configureStore({
    reducer: {
        animals: animalsReducer,
        users: usersReducer
    },
    middleware: [...getDefaultMiddleware(), logger]
});
