import {tasksReducer} from '../features/TodolistsList/tasks-reducer';
import {todoListReducer} from '../features/TodolistsList/todolists-reducer';
import {applyMiddleware, combineReducers, createStore} from 'redux';
import thunk from 'redux-thunk';

const rootReducer = combineReducers({
    todolists : todoListReducer,
    tasks: tasksReducer,
})

export const store = createStore(rootReducer,applyMiddleware(thunk))

export type AppRootStoreType = ReturnType<typeof rootReducer>

// @ts-ignore
window.store = store ;