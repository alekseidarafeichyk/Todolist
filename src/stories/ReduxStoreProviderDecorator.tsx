import React from 'react'
import {Provider} from 'react-redux'
import {applyMiddleware, combineReducers, createStore} from 'redux'
import {tasksReducer} from '../features/TodolistsList/tasks-reducer'
import {todoListReducer} from '../features/TodolistsList/todolists-reducer'
import {v1} from 'uuid'
import {AppRootStoreType} from '../app/store'
import {TaskPriorities, TaskStatuses} from '../api/todolists-api';
import {appReducer} from '../app/app-reducer';
import thunk from 'redux-thunk';
import {authReducer} from '../features/Login/auth-reducer';

const rootReducer = combineReducers({
    tasks: tasksReducer,
    todolists: todoListReducer,
    app: appReducer,
    auth: authReducer
})

let todoListID1 = v1()
let todoListID2 = v1()

const initialGlobalState:AppRootStoreType = {
    todolists: [
        {id: todoListID1, title: 'Books', filter: 'all',addedDate:'',order:0,entityStatus: 'idle'},
        {id: todoListID2, title: 'Any', filter: 'active',addedDate:'',order:0,entityStatus: 'loading'},
    ],
    tasks: {
        [todoListID1]: [
            {
                id: v1(),
                status: TaskStatuses.Completed,
                title: 'JS',
                todoListId: todoListID1,
                description: '',
                startDate: '',
                deadline: '',
                addedDate: '',
                order: 0,
                priority: TaskPriorities.Low
            },
            {
                id: v1(),
                status: TaskStatuses.Completed,
                title: 'React',
                todoListId: todoListID1,
                description: '',
                startDate: '',
                deadline: '',
                addedDate: '',
                order: 0,
                priority: TaskPriorities.Low
            },
            {
                id: v1(),
                status: TaskStatuses.Completed,
                title: 'Redux',
                todoListId: todoListID1,
                description: '',
                startDate: '',
                deadline: '',
                addedDate: '',
                order: 0,
                priority: TaskPriorities.Low
            },],
        [todoListID2]: [
            {
                id: v1(),
                status: TaskStatuses.Completed,
                title: 'RestApi',
                todoListId: todoListID2,
                description: '',
                startDate: '',
                deadline: '',
                addedDate: '',
                order: 0,
                priority: TaskPriorities.Low
            },
            {
                id: v1(),
                status: TaskStatuses.Completed,
                title: 'GraphQl',
                todoListId: todoListID2,
                description: '',
                startDate: '',
                deadline: '',
                addedDate: '',
                order: 0,
                priority: TaskPriorities.Low
            },
        ],
    },
    app: {
        error: null,
        status: 'idle',
        isInitialized: false
    },
    auth :{
        isLoggedIn: false
    }
};

export const storyBookStore = createStore(rootReducer, initialGlobalState as AppRootStoreType,applyMiddleware(thunk));

export const ReduxStoreProviderDecorator = (storyFn: any) => (
    <Provider
        store={storyBookStore}>{storyFn()}
    </Provider>)
