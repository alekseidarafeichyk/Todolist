import {TasksStateType} from '../App';
import {AddTodolistActionType, RemoveTodolistActionType, SetTodolistsActionType} from './todolists-reducer';
import {TaskPriorities, TaskStatuses, TaskType, todolistsAPI, UpdateTaskModuleType} from '../api/todolists-a-p-i';
import {Dispatch} from 'redux';
import {AppRootStoreType} from './store';


type ActionsType = RemoveTaskActionType
    | AddTaskActionType | UpdateTaskActionType
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
    task: TaskType
}

export type UpdateTaskActionType = {
    type: 'UPDATE_TASK'
    id: string,
    model: UpdateDomainTaskModuleType,
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
            return {
                ...state,
                [action.task.todoListId]: [action.task, ...state[action.task.todoListId]]
            }
        }
        case 'UPDATE_TASK' :
            return {
                ...state,
                [action.todoListId]: state[action.todoListId].map(tl => tl.id === action.id ? {
                    ...tl,
                    ...action.model
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
            stateCopy[action.todolist.id] = []
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
export const addTaskAC = (task: TaskType): AddTaskActionType => {
    return {type: 'ADD_TASK', task};
}

export const UpdateTaskAC = (id: string, model: UpdateDomainTaskModuleType, todoListId: string): UpdateTaskActionType => {
    return {type: 'UPDATE_TASK', id, model, todoListId};
}

export const changeTaskTitleAC = (taskId: string, newTitle: string, todoListId: string): ChangeTaskTitleActionType => {
    return {type: 'CHANGE_TASK_TITLE', taskId, newTitle, todoListId};
}

export const setTasksAC = (tasks: Array<TaskType>, todolistId: string): SetTasksActionType => {
    return {type: 'SET-TASKS', tasks, todolistId}
}

//thunk

export const fetchTasksTC = (todolistId: string) => (dispatch: Dispatch) => {
    todolistsAPI.getTasks(todolistId)
        .then(res => {
            dispatch(setTasksAC(res.data.items, todolistId));
        })
}

export const removeTaskTC = (todoListId: string, id: string) => (dispatch: Dispatch) => {
    todolistsAPI.deleteTask(todoListId, id)
        .then(res => {
            if (res.data.resultCode === 0) {
                dispatch(removeTaskAC(id, todoListId))
            }
        })
}

export const addTaskTC = (todolistId: string, taskTitle: string) => (dispatch: Dispatch) => {
    todolistsAPI.createTask(todolistId, taskTitle)
        .then(res => {
            dispatch(addTaskAC(res.data.data.item))
        })
}


export type UpdateDomainTaskModuleType = {
    title?: string
    description?: string
    status?: TaskStatuses
    priority?: TaskPriorities
    startDate?: string
    deadline?: string
}

export const updateTaskTC = (taskId: string, domainModel: UpdateDomainTaskModuleType, todolistId: string) => (dispatch: Dispatch, getState: () => AppRootStoreType) => {
    const state = getState();
    const task = state.tasks[todolistId].find(t => t.id === taskId);

    if(!task) {
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
    todolistsAPI.updateTask(todolistId, taskId, apiModel)
        .then(res => {
           dispatch(UpdateTaskAC(taskId,domainModel,todolistId))
        })
}







