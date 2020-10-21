import {tasksReducer} from '../features/TodolistsList/tasks-reducer';
import {todoListReducer} from '../features/TodolistsList/todolists-reducer';
import {combineReducers} from 'redux';
import thunkMiddleWare from 'redux-thunk';
import {appReducer} from './app-reducer';
import {configureStore} from '@reduxjs/toolkit';
import {authReducer} from '../features/Login/auth-reducer';

const rootReducer = combineReducers({
    todolists: todoListReducer,
    tasks: tasksReducer,
    app: appReducer,
    auth: authReducer
})

export const store = configureStore({
        reducer: rootReducer,
        middleware: getDefaultMiddleware => getDefaultMiddleware().prepend(thunkMiddleWare)
    }
)

export type AppRootStoreType = ReturnType<typeof rootReducer>
