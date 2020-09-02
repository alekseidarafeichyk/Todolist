import {TasksStateType} from '../App';
import {v1} from 'uuid';
import {AddTodolistActionType, RemoveTodolistActionType} from './todolists-reducer';


type ActionsType = RemoveTaskActionType |
    AddTaskActionType | ChangeStatusActionType |
    ChangeTaskTitleActionType | AddTodolistActionType | RemoveTodolistActionType

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
    isDone: boolean,
    todoListId: string
}

export type ChangeTaskTitleActionType = {
    type: 'CHANGE_TASK_TITLE'
    taskId: string
    todoListId: string
    newTitle: string
}

let initialState : TasksStateType = {};

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
            let newTask = {id: v1(), isDone: false, title: action.taskTitle}
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
                    isDone: action.isDone
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

export const changeTaskStatusAC = (id: string, isDone: boolean, todoListId: string): ChangeStatusActionType => {
    return {type: 'CHANGE_TASK_STATUS', id, isDone, todoListId};
}

export const changeTaskTitleAC = (taskId: string, newTitle: string, todoListId: string): ChangeTaskTitleActionType => {
    return {type: 'CHANGE_TASK_TITLE', taskId, newTitle, todoListId};
}



