import {tasksReducer} from './tasks-reducer';
import {todoListReducer} from './todolists-reducer';
import {combineReducers, createStore} from 'redux';

const rootReducer = combineReducers({
    todolists : todoListReducer,
    tasks: tasksReducer,
})

export const store = createStore(rootReducer)

export type AppRootStoreType = ReturnType<typeof rootReducer>

// @ts-ignore
window.store = store ;