import {todolistsApi, TodolistType} from '../../api/todolists-api';
import {Dispatch} from 'redux';


let initialState: Array<TodolistDomainType> = []

export const todoListReducer = (state: Array<TodolistDomainType> = initialState, action: ActionsType): Array<TodolistDomainType> => {
    switch (action.type) {
        case 'REMOVE-TODOLIST' :
            return state.filter(tl => tl.id !== action.id)
        case 'ADD-TODOLIST':
            return [{...action.todolist, filter: 'all'}, ...state]
        case 'CHANGE-TODOLIST-TITLE' :
            return state.map(tl => tl.id === action.id ? {...tl,title: action.title} : tl)
        case 'CHANGE-TODOLIST-FILTER' :
            return state.map(tl => tl.id === action.id ? {...tl,filter: action.filter} : tl)
        case 'SET-TODOLISTS':
            return action.todolists.map(tl => ({...tl, filter: 'all'}))
        default:
            return state
    }
}

//actions
export const removeTodoListAC = (id: string) =>
    ({type: 'REMOVE-TODOLIST', id} as const)
export const addTodolistAC = (todolist: TodolistType) =>
    ({type: 'ADD-TODOLIST', todolist} as const)
export const changeTodoListTitleAC = (id: string, title: string) =>
    ({
        type: 'CHANGE-TODOLIST-TITLE',
        id: id,
        title: title
    } as const)
export const changeTodolistFilterAC = (filter: FilterValueType, id: string) =>
    ({
        type: 'CHANGE-TODOLIST-FILTER',
        filter: filter,
        id: id
    } as const)
export const setTodolistsAC = (todolists: Array<TodolistType>) =>
    ({type: 'SET-TODOLISTS', todolists} as const)

//thunks

export const fetchTodolistsTC = () => (dispatch: Dispatch<ActionsType>) => {
    todolistsApi.getTodolists()
        .then(res => {
            dispatch(setTodolistsAC(res.data));
        })
}
export const removeTodolistTC = (todolistId: string) => (dispatch: Dispatch<ActionsType>) => {
    todolistsApi.deleteTodolist(todolistId)
        .then(res => {
            dispatch(removeTodoListAC(todolistId))
        })
}
export const addTodolistTC = (title: string) => (dispatch: Dispatch<ActionsType>) => {
    todolistsApi.createTodolist(title)
        .then(res => {
                dispatch(addTodolistAC(res.data.data.item))
            }
        )
}
export const changeTodoListTitleTC = (id: string, title: string) => (dispatch: Dispatch<ActionsType>) => {
    todolistsApi.updateTodolistTitle(id, title)
        .then(res => {
                dispatch(changeTodoListTitleAC(id, title))
            }
        )
}

//types

export type RemoveTodolistActionType = ReturnType<typeof removeTodoListAC>
export type AddTodolistActionType = ReturnType<typeof addTodolistAC>
export type SetTodolistsActionType = ReturnType<typeof setTodolistsAC>
type ActionsType =
    | RemoveTodolistActionType
    | AddTodolistActionType
    | ReturnType<typeof changeTodoListTitleAC>
    | ReturnType<typeof changeTodolistFilterAC>
    | SetTodolistsActionType
export type FilterValueType = 'all' | 'active' | 'completed'
export type TodolistDomainType = TodolistType & {
    filter: FilterValueType
}

