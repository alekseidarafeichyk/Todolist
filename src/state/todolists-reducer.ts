import {TodoListType, FilterValueType} from '../App';
import {v1} from 'uuid';

type ActionsType = RemoveTodolistActionType
    | AddTodolistActionType
    | ChangeTodolistTitleActionType
    | ChangeTodolistFilterActionType

export type RemoveTodolistActionType = {
    type: 'REMOVE-TODOLIST'
    id: string
}
export type AddTodolistActionType = {
    type: 'ADD-TODOLIST'
    title: string
    todolistId: string
}
export type ChangeTodolistTitleActionType = {
    type: 'CHANGE-TODOLIST-TITLE'
    title: string
    id: string
}
export type ChangeTodolistFilterActionType = {
    type: 'CHANGE-TODOLIST-FILTER'
    filter: FilterValueType
    id: string
}

export const todoListReducer = (state: Array<TodoListType>, action: ActionsType): Array<TodoListType> => {
    switch (action.type) {
        case 'REMOVE-TODOLIST' :
            return state.filter(tl => tl.id !== action.id)
        case 'ADD-TODOLIST':
            let newTodoList: TodoListType = {
                id: action.todolistId,
                title: action.title,
                filter: 'all'
            }
            return [...state, newTodoList]
        case 'CHANGE-TODOLIST-TITLE' :
            let todoList = state.find(tl => tl.id === action.id)
            if (todoList) {
                todoList.title = action.title
                return [...state]
            }
            return [...state]
        case 'CHANGE-TODOLIST-FILTER' :
            let todoListT = state.find(tl => tl.id === action.id)
            if (todoListT) {
                todoListT.filter = action.filter
                return [...state]
            }
            return [...state]
        default:
            throw new Error('I don\'t understand this type')
    }
}

export const RemoveTodoListAC = (todoListID1: string): RemoveTodolistActionType => {
    return {type: 'REMOVE-TODOLIST', id: todoListID1};
}

export const addTodolistAC = (newTitle: string): AddTodolistActionType => {
    return {type: 'ADD-TODOLIST', title: newTitle, todolistId: v1()};
}

export const ChangeTodoListTitleAC = (id: string, title: string): ChangeTodolistTitleActionType => {
    return {type: 'CHANGE-TODOLIST-TITLE', id: id, title: title}
}

export const ChangeTodolistFilterAC = (filter: FilterValueType, id: string): ChangeTodolistFilterActionType => {
    return {type: 'CHANGE-TODOLIST-FILTER', filter: filter, id: id}
}