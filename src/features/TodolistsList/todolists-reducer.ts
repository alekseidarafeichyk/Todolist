import {todolistsApi, TodolistType} from '../../api/todolists-api';
import {Dispatch} from 'redux';
import {RequestStatusType, setAppStatusAC, SetAppStatusActionType} from '../../app/app-reducer';


let initialState: Array<TodolistDomainType> = []

export const todoListReducer = (state: Array<TodolistDomainType> = initialState, action: ActionsType): Array<TodolistDomainType> => {
    switch (action.type) {
        case 'REMOVE-TODOLIST' :
            return state.filter(tl => tl.id !== action.id)
        case 'ADD-TODOLIST':
            return [{...action.todolist, filter: 'all',entityStatus: 'idle'}, ...state]
        case 'CHANGE-TODOLIST-TITLE' :
            return state.map(tl => tl.id === action.id ? {...tl, title: action.title} : tl)
        case 'CHANGE-TODOLIST-FILTER' :
            return state.map(tl => tl.id === action.id ? {...tl, filter: action.filter} : tl)
        case 'CHANGE-TODOLIST-ENTITY-STATUS':
            return state.map(tl => tl.id === action.id ? {...tl, entityStatus: action.status} : tl)
        case 'SET-TODOLISTS':
            return action.todolists.map(tl => ({...tl, filter: 'all',entityStatus: 'idle'}))
        default:
            return state
    }
}

// actions
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
export const changeTodolistEntityStatusAC = (id:string,status:RequestStatusType) =>
    ({type: 'CHANGE-TODOLIST-ENTITY-STATUS', id,status} as const)
export const setTodolistsAC = (todolists: Array<TodolistType>) =>
    ({type: 'SET-TODOLISTS', todolists} as const)


//thunks

export const fetchTodolistsTC = () => (dispatch: ThunkDispatch) => {
    dispatch(setAppStatusAC('loading'))
    todolistsApi.getTodolists()
        .then(res => {
            dispatch(setTodolistsAC(res.data));
            dispatch(setAppStatusAC('succeeded'))
        })
}
export const removeTodolistTC = (todolistId: string) => (dispatch: ThunkDispatch) => {
    dispatch(setAppStatusAC('loading'))
    dispatch(changeTodolistEntityStatusAC(todolistId,'loading'))
    todolistsApi.deleteTodolist(todolistId)
        .then(res => {
            dispatch(removeTodoListAC(todolistId))
            dispatch(setAppStatusAC('succeeded'))
        })
}
export const addTodolistTC = (title: string) => (dispatch: ThunkDispatch) => {
    dispatch(setAppStatusAC('loading'))
    todolistsApi.createTodolist(title)
        .then(res => {
                dispatch(addTodolistAC(res.data.data.item))
                dispatch(setAppStatusAC('succeeded'))
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
    | ReturnType<typeof changeTodolistEntityStatusAC>
    | SetTodolistsActionType
export type FilterValueType = 'all' | 'active' | 'completed'
export type TodolistDomainType = TodolistType & {
    filter: FilterValueType
    entityStatus : RequestStatusType
}
type ThunkDispatch = Dispatch<ActionsType | SetAppStatusActionType>
