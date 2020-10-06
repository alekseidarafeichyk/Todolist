import React from 'react'
import {Provider} from 'react-redux'
import {combineReducers, createStore} from 'redux'
import {tasksReducer} from '../features/TodolistsList/tasks-reducer'
import {todoListReducer} from '../features/TodolistsList/todolists-reducer'
import {v1} from 'uuid'
import {AppRootStoreType} from '../app/store'
import {TaskPriorities, TaskStatuses} from '../api/todolists-api';

const rootReducer = combineReducers({
    tasks: tasksReducer,
    todolists: todoListReducer
})

let todoListID1 = v1()
let todoListID2 = v1()

const initialGlobalState:AppRootStoreType = {
    todolists: [
        {id: todoListID1, title: 'Books', filter: 'all',addedDate:'',order:0},
        {id: todoListID2, title: 'Any', filter: 'active',addedDate:'',order:0},
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
        ]
    }
};

export const storyBookStore = createStore(rootReducer, initialGlobalState as AppRootStoreType);

export const ReduxStoreProviderDecorator = (storyFn: any) => (
    <Provider
        store={storyBookStore}>{storyFn()}
    </Provider>)
