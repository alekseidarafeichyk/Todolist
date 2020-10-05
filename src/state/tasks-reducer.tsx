import {TasksStateType} from '../App';
import {v1} from 'uuid';
import {AddTodolistActionType, RemoveTodolistActionType, SetTodolistsActionType} from './todolists-reducer';
import {TaskPriorities, TaskStatuses, TaskType, todolistsApi, TodolistType} from '../api/todolists-api';
import {Dispatch} from 'redux';


type ActionsType = RemoveTaskActionType
    | AddTaskActionType | ChangeStatusActionType
    | ChangeTaskTitleActionType | AddTodolistActionType
    | RemoveTodolistActionType | SetTodolistsActionType
    | SetTasksActionType

export type RemoveTaskActionType = {
    type: 'REMOVE_TASK'
    id: string
    todoListId: string
}
export type AddTaskActionType = {
    type: 'ADD_TASK'
    taskTitle: string
    todoListId: string
}

export type ChangeStatusActionType = {
    type: 'CHANGE_TASK_STATUS'
    id: string,
    status: TaskStatuses,
    todoListId: string
}

export type ChangeTaskTitleActionType = {
    type: 'CHANGE_TASK_TITLE'
    taskId: string
    todoListId: string
    newTitle: string
}

export type SetTasksActionType = {
    type: 'SET-TASKS'
    tasks: Array<TaskType>
    todolistId: string
}

let initialState: TasksStateType = {};

export const tasksReducer = (state: TasksStateType = initialState, action: ActionsType): TasksStateType => {
    switch (action.type) {
        case 'REMOVE_TASK': {
            return {
                ...state,
                [action.todoListId]: state[action.todoListId].filter(tl => {
                    return tl.id !== action.id
                })
            }
        }
        case 'ADD_TASK': {
            let newTask = {
                id: v1(),
                status: TaskStatuses.New,
                title: action.taskTitle,
                description: '',
                startDate: '',
                deadline: '',
                addedDate: '',
                order: 0,
                priority: TaskPriorities.Low,
                todoListId: '',
            }
            return {
                ...state,
                [action.todoListId]: [newTask, ...state[action.todoListId]]
            }
        }
        case 'CHANGE_TASK_STATUS' :
            return {
                ...state,
                [action.todoListId]: state[action.todoListId].map(tl => tl.id === action.id ? {
                    ...tl,
                    status: action.status
                } : tl)
            }
        case 'CHANGE_TASK_TITLE' :
            return {
                ...state,
                [action.todoListId]: state[action.todoListId].map(tl => tl.id === action.taskId ? {
                    ...tl,
                    title: action.newTitle
                } : tl)
            }
        case 'ADD-TODOLIST': {
            const stateCopy = {...state};
            stateCopy[action.todolistId] = []
            return stateCopy
        }
        case 'REMOVE-TODOLIST': {
            const stateCopy = {...state}
            delete stateCopy[action.id]
            return stateCopy
        }
        case 'SET-TODOLISTS': {
            const copyState = {...state}

            action.todolists.forEach(tl => {
                copyState[tl.id] = []
            })

            return copyState
        }
        case 'SET-TASKS': {
            const copyState = {...state}
            copyState[action.todolistId] = action.tasks
            return copyState
        }
        default:
            return state
    }
}

export const removeTaskAC = (id: string, todoListId: string): RemoveTaskActionType => {
    return {type: 'REMOVE_TASK', id: id, todoListId};
}

export const addTaskAC = (taskTitle: string, todoListId: string): AddTaskActionType => {
    return {type: 'ADD_TASK', taskTitle, todoListId};
}

export const changeTaskStatusAC = (id: string, status: TaskStatuses, todoListId: string): ChangeStatusActionType => {
    return {type: 'CHANGE_TASK_STATUS', id, status, todoListId};
}

export const changeTaskTitleAC = (taskId: string, newTitle: string, todoListId: string): ChangeTaskTitleActionType => {
    return {type: 'CHANGE_TASK_TITLE', taskId, newTitle, todoListId};
}

export const setTasksAC = (tasks: Array<TaskType>, todolistId: string): SetTasksActionType => {
    return {type: 'SET-TASKS', tasks, todolistId}
}

//thunk

export const fetchTasksTC = (todolistId: string) => (dispatch: Dispatch) => {
    todolistsApi.getTasks(todolistId)
        .then(res => {
            dispatch(setTasksAC(res.data.items,todolistId));
        })
}







