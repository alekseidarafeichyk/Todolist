import {tasksReducer} from '../features/TodolistsList/tasks-reducer';
import {todoListReducer} from '../features/TodolistsList/todolists-reducer';
import {applyMiddleware, combineReducers, createStore} from 'redux';
import thunk from 'redux-thunk';
import {appReducer} from './app-reducer';
import {authReducer} from '../features/Login/auth-reducer';

const rootReducer = combineReducers({
    todolists : todoListReducer,
    tasks: tasksReducer,
    app: appReducer,
    auth: authReducer
})

export const store = createStore(rootReducer,applyMiddleware(thunk))

export type AppRootStoreType = ReturnType<typeof rootReducer>

// @ts-ignore
window.store = store ;