import React from 'react'
import {Provider} from 'react-redux'
import {combineReducers, createStore} from 'redux'
import {tasksReducer} from '../state/tasks-reducer'
import {todoListReducer} from '../state/todolists-reducer'
import {v1} from 'uuid'
import {AppRootStoreType} from '../state/store'

const rootReducer = combineReducers({
    tasks: tasksReducer,
    todolists: todoListReducer
})

let todoListID1 = v1()
let todoListID2 = v1()

const initialGlobalState = {
    todolists: [
            {id: todoListID1, title: 'Books', filter: 'all'},
            {id: todoListID2, title: 'Any', filter: 'active'},
    ] ,
    tasks: {
        [todoListID1]: [
            {id: v1(), isDone: true, title: 'JS'},
            {id: v1(), isDone: true, title: 'React'},
            {id: v1(), isDone: false, title: 'Redux'},],
        [todoListID2]: [
            {id: v1(), isDone: false, title: 'RestApi'},
            {id: v1(), isDone: false, title: 'GraphQl'},
        ]
    }
};

export const storyBookStore = createStore(rootReducer, initialGlobalState as AppRootStoreType);

export const ReduxStoreProviderDecorator = (storyFn: any) => (
    <Provider
        store={storyBookStore}>{storyFn()}
    </Provider>)
