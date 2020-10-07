import {tasksReducer} from '../features/TodolistsList/tasks-reducer';
import {todoListReducer} from '../features/TodolistsList/todolists-reducer';
import {applyMiddleware, combineReducers, createStore} from 'redux';
import thunk from 'redux-thunk';
import {appReducer} from './app-reducer';

const rootReducer = combineReducers({
    todolists : todoListReducer,
    tasks: tasksReducer,
    app: appReducer
})

export const store = createStore(rootReducer,applyMiddleware(thunk))

export type AppRootStoreType = ReturnType<typeof rootReducer>

// @ts-ignore
window.store = store ;