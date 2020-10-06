import {
    addTodolistAC,
    AddTodolistActionType,
    RemoveTodolistActionType,
    SetTodolistsActionType
} from './todolists-reducer';
import {TaskPriorities, TaskStatuses, TaskType, todolistsApi, UpdateTaskModuleType} from '../../api/todolists-api';
import {Dispatch} from 'redux';
import {AppRootStoreType} from '../../app/store';



let initialState: TasksStateType = {};

export const tasksReducer = (state: TasksStateType = initialState, action: ActionsType): TasksStateType => {
    switch (action.type) {
        case 'REMOVE_TASK':
            return {...state, [action.todoListId]: state[action.todoListId].filter(tl => tl.id !== action.id)}
        case 'ADD_TASK':
            return {...state, [action.task.todoListId]: [action.task, ...state[action.task.todoListId]]}
        case 'UPDATE_TASK' :
            return {...state, [action.todoListId]: state[action.todoListId]
                    .map(t => t.id === action.id ? {...t, ...action.model} : t)}
        case 'ADD-TODOLIST':
            return {...state,[action.todolist.id] : []}
        case 'REMOVE-TODOLIST':
            const copyState = {...state}
            delete copyState[action.id]
            return copyState
        case 'SET-TODOLISTS': {
            const copyState = {...state}
            action.todolists.forEach(tl => {
                copyState[tl.id] = []
            })
            return copyState
        }
        case 'SET-TASKS':
            return {...state,[action.todolistId] : action.tasks}
        default:
            return state
    }
}

//actions

export const removeTaskAC = (id: string, todoListId: string) =>
    ({type: 'REMOVE_TASK', id: id, todoListId} as const)
export const addTaskAC = (task: TaskType) =>
    ({type: 'ADD_TASK', task} as const)
export const updateTaskAC = (id: string, model: UpdateDomainTaskModuleType, todoListId: string) =>
    ({type: 'UPDATE_TASK', id, model, todoListId} as const)
export const setTasksAC = (tasks: Array<TaskType>, todolistId: string) =>
    ({type: 'SET-TASKS', tasks, todolistId} as const)


//thunk

export const fetchTasksTC = (todolistId: string) => (dispatch: Dispatch<ActionsType>) => {
    todolistsApi.getTasks(todolistId)
        .then(res => {
            dispatch(setTasksAC(res.data.items, todolistId));
        })
}
export const removeTaskTC = (todoListId: string, id: string) => (dispatch: Dispatch<ActionsType>) => {
    todolistsApi.deleteTask(todoListId, id)
        .then(res => {
            if (res.data.resultCode === 0) {
                dispatch(removeTaskAC(id, todoListId))
            }
        })
}
export const addTaskTC = (todolistId: string, taskTitle: string) => (dispatch: Dispatch<ActionsType>) => {
    todolistsApi.createTask(todolistId, taskTitle)
        .then(res => {
            dispatch(addTaskAC(res.data.data.item))
        })
}
export const updateTaskTC = (taskId: string, domainModel: UpdateDomainTaskModuleType, todolistId: string) =>
    (dispatch: Dispatch<ActionsType>, getState: () => AppRootStoreType) => {
    const state = getState();
    const task = state.tasks[todolistId].find(t => t.id === taskId);

    if (!task) {
        console.warn('task not found in this state');
        return;
    }

    const apiModel: UpdateTaskModuleType = {
        deadline: task.deadline,
        description: task.description,
        priority: task.priority,
        startDate: task.startDate,
        title: task.title,
        status: task.status,
        ...domainModel
    }
    todolistsApi.updateTask(todolistId, taskId, apiModel)
        .then(res => {
            dispatch(updateTaskAC(taskId, domainModel, todolistId))
        })
}

//types

export type UpdateDomainTaskModuleType = {
    title?: string
    description?: string
    status?: TaskStatuses
    priority?: TaskPriorities
    startDate?: string
    deadline?: string
}
type ActionsType =
    | ReturnType<typeof removeTaskAC>
    | ReturnType<typeof addTaskAC>
    | ReturnType<typeof updateTaskAC>
    | ReturnType<typeof addTodolistAC>
    | AddTodolistActionType
    | RemoveTodolistActionType
    | SetTodolistsActionType
    | ReturnType<typeof setTasksAC>
export type TasksStateType = {
    [key: string]: Array<TaskType>
}







