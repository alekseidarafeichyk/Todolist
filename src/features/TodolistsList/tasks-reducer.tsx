import {addTodolistAC, removeTodoListAC, setTodolistsAC} from './todolists-reducer';
import {TaskPriorities, TaskStatuses, TaskType, todolistsApi, UpdateTaskModuleType} from '../../api/todolists-api';
import {AppRootStoreType} from '../../app/store';
import {setAppStatusAC} from '../../app/app-reducer';
import {handleServerAppError, handleServerNetworkError} from '../../utils/error-utils';
import {createSlice, Dispatch, PayloadAction} from '@reduxjs/toolkit';


let initialState: TasksStateType = {};

const slice = createSlice({
    name: 'tasks',
    initialState: initialState,
    reducers: {
        removeTaskAC(state, action: PayloadAction<{ id: string, todoListId: string }>) {
            const tasks = state[action.payload.todoListId]
            const index = tasks.findIndex(t => t.id === action.payload.id)
            if (index > -1) {
                tasks.splice(index, 1)
            }
        },
        addTaskAC(state, action: PayloadAction<TaskType>) {
            state[action.payload.todoListId].unshift(action.payload)
        },
        updateTaskAC(state, action: PayloadAction<{ id: string, model: UpdateDomainTaskModuleType, todoListId: string }>) {
            const tasks = state[action.payload.todoListId]
            const index = tasks.findIndex(t => t.id === action.payload.id)

            if (index > -1) {
                tasks[index] = {...tasks[index], ...action.payload.model}
            }
        },
        setTasksAC(state, action: PayloadAction<{ tasks: Array<TaskType>, todolistId: string }>) {
            state[action.payload.todolistId] = action.payload.tasks
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(addTodolistAC, (state, action) => {
                state[action.payload.todolist.id] = []
            })
            .addCase(removeTodoListAC, (state, action) => {
                delete state[action.payload.id]
            })
            .addCase(setTodolistsAC, (state, action) => {
                action.payload.todolists.forEach(tl => {
                    state[tl.id] = []
                })
            })
    }
})

export const tasksReducer = slice.reducer
export const {
    removeTaskAC, addTaskAC, updateTaskAC, setTasksAC
} = slice.actions

//thunk

export const fetchTasksTC = (todolistId: string) => (dispatch: Dispatch) => {
    dispatch(setAppStatusAC({status: 'loading'}))
    todolistsApi.getTasks(todolistId)
        .then(res => {
            dispatch(setTasksAC({todolistId: todolistId, tasks: res.data.items}));
            dispatch(setAppStatusAC({status: 'succeeded'}))
        })
}
export const removeTaskTC = (todoListId: string, id: string) => (dispatch: Dispatch) => {
    dispatch(setAppStatusAC({status: 'loading'}))
    todolistsApi.deleteTask(todoListId, id)
        .then(res => {
            if (res.data.resultCode === 0) {
                dispatch(removeTaskAC({id, todoListId}))
                dispatch(setAppStatusAC({status: 'succeeded'}))
            }
        })
}
export const addTaskTC = (todolistId: string, taskTitle: string) => (dispatch: Dispatch) => {
    dispatch(setAppStatusAC({status: 'loading'}))
    todolistsApi.createTask(todolistId, taskTitle)
        .then(res => {
            if (res.data.resultCode === 0) {
                dispatch(addTaskAC(res.data.data.item))
                dispatch(setAppStatusAC({status: 'succeeded'}))
            } else {
                handleServerAppError(res.data, dispatch)
            }
        })
        .catch(error => {
            handleServerNetworkError(error, dispatch)
        })
}
export const updateTaskTC = (taskId: string, domainModel: UpdateDomainTaskModuleType, todolistId: string) =>
    (dispatch: Dispatch, getState: () => AppRootStoreType) => {

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
        dispatch(setAppStatusAC({status: 'loading'}))
        todolistsApi.updateTask(todolistId, taskId, apiModel)
            .then(res => {
                if (res.data.resultCode === 0) {
                    dispatch(updateTaskAC({id: taskId, todoListId: todolistId, model: domainModel}))
                    dispatch(setAppStatusAC({status: 'succeeded'}))
                } else {
                    handleServerAppError(res.data, dispatch)
                    dispatch(setAppStatusAC({status: 'failed'}))

                }
            })
            .catch(error => {
                handleServerNetworkError(error, dispatch)
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

export type TasksStateType = {
    [key: string]: Array<TaskType>
}







