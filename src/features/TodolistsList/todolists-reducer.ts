import {todolistsApi, TodolistType} from '../../api/todolists-api';
import {Dispatch} from 'redux';
import {RequestStatusType, setAppStatusAC} from '../../app/app-reducer';
import {createSlice, PayloadAction} from '@reduxjs/toolkit';


let initialState: Array<TodolistDomainType> = []

const slice = createSlice({
    name: 'todoList',
    initialState: initialState,
    reducers: {
        removeTodoListAC(state, action: PayloadAction<{ id: string }>) {
            const index = state.findIndex((tl => tl.id === action.payload.id))
            if (index > -1) {
                state.splice(index, 1)
            }
        },
        addTodolistAC(state, action: PayloadAction<{ todolist: TodolistType }>) {
            state.unshift({...action.payload.todolist, filter: 'all', entityStatus: 'idle'})
        },
        changeTodoListTitleAC(state, action: PayloadAction<{ id: string, title: string }>) {
            const index = state.findIndex((tl => tl.id === action.payload.id))
            state[index].title = action.payload.title

        },
        changeTodolistFilterAC(state, action: PayloadAction<{ filter: FilterValueType, id: string }>) {
            const index = state.findIndex((tl => tl.id === action.payload.id))
            state[index].filter = action.payload.filter
        },
        changeTodolistEntityStatusAC(state, action: PayloadAction<{ id: string, status: RequestStatusType }>) {
            const index = state.findIndex((tl => tl.id === action.payload.id))
            state[index].entityStatus = action.payload.status

        },
        setTodolistsAC(state, action: PayloadAction<{ todolists: Array<TodolistType> }>) {
            return action.payload.todolists.map(tl => ({...tl, filter: 'all', entityStatus: 'idle'}))
        }
    }
})


export const todoListReducer = slice.reducer
export const {
    removeTodoListAC, addTodolistAC, changeTodoListTitleAC,
    changeTodolistFilterAC, changeTodolistEntityStatusAC, setTodolistsAC
} = slice.actions

//thunks

export const fetchTodolistsTC = () => (dispatch: Dispatch) => {
    dispatch(setAppStatusAC({status: 'loading'}))
    todolistsApi.getTodolists()
        .then(res => {
            dispatch(setTodolistsAC({todolists: res.data}));
            dispatch(setAppStatusAC({status: 'succeeded'}))
        })
}
export const removeTodolistTC = (todolistId: string) => (dispatch: Dispatch) => {
    dispatch(setAppStatusAC({status: 'loading'}))
    dispatch(changeTodolistEntityStatusAC({id: todolistId, status: 'loading'}))
    todolistsApi.deleteTodolist(todolistId)
        .then(res => {
            dispatch(removeTodoListAC({id: todolistId}))
            dispatch(setAppStatusAC({status: 'succeeded'}))
        })
}
export const addTodolistTC = (title: string) => (dispatch: Dispatch) => {
    dispatch(setAppStatusAC({status: 'loading'}))
    todolistsApi.createTodolist(title)
        .then(res => {
                dispatch(addTodolistAC({todolist: res.data.data.item}))
                dispatch(setAppStatusAC({status: 'succeeded'}))
            }
        )
}
export const changeTodoListTitleTC = (id: string, title: string) => (dispatch: Dispatch) => {
    todolistsApi.updateTodolistTitle(id, title)
        .then(res => {
                dispatch(changeTodoListTitleAC({id, title}))
            }
        )
}

//types
export type RemoveTodolistActionType = ReturnType<typeof removeTodoListAC>
export type AddTodolistActionType = ReturnType<typeof addTodolistAC>
export type SetTodolistsActionType = ReturnType<typeof setTodolistsAC>

export type FilterValueType = 'all' | 'active' | 'completed'
export type TodolistDomainType = TodolistType & {
    filter: FilterValueType
    entityStatus: RequestStatusType
}
