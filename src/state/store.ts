import {tasksReducer} from './tasks-reducer';
import {todoListReducer} from './todolists-reducer';
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