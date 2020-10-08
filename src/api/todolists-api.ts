import axios from 'axios'


const instance = axios.create({
    withCredentials: true,
    headers: {
        'API-KEY': '628f1297-6b8a-455c-a591-d2e75c4bd3a6'
    },
    baseURL: 'https://social-network.samuraijs.com/api/1.1/'
})

//api
export const authAPI = {
    login(data: LoginParamsType) {
        return instance.post<ResponseType<{ userId: string }>>('auth/login', data);
    },
    logout() {
        return instance.delete<ResponseType>('auth/login');
    },
    me() {
        return instance.get<ResponseType<AuthMe>>('auth/me')
    }
}
export const todolistsApi = {
    getTodolists() {
        return instance.get<Array<TodolistType>>('todo-lists');
    },
    createTodolist(title: string) {
        return instance.post<ResponseType<{ item: TodolistType }>>('todo-lists', {title});
    },
    deleteTodolist(todolistId: string) {
        return instance.delete<ResponseType>(`/todo-lists/${todolistId}`);
    },
    updateTodolistTitle(todolistId: string, newTitle: string) {
        return instance.put<ResponseType>(`todo-lists/${todolistId}`, {title: newTitle});
    },
    getTasks(todolistId: string) {
        return instance.get<GetTaskResponse>(`/todo-lists/${todolistId}/tasks`);
    },
    createTask(todolistId: string, taskTitle: string) {
        return instance.post<ResponseType<{ item: TaskType }>>(`/todo-lists/${todolistId}/tasks`, {title: taskTitle});
    },
    updateTask(todolistId: string, taskId: string, model: UpdateTaskModuleType) {
        return instance.put<ResponseType<TaskType>>(`/todo-lists/${todolistId}/tasks/${taskId}`, model);
    },
    deleteTask(todolistId: string, taskId: string) {
        return instance.delete<ResponseType>(`/todo-lists/${todolistId}/tasks/${taskId}`);
    }
}

//types
type AuthMe = {
    id: number
    email: string
    login: string
}
export type TodolistType = {
    id: string
    title: string
    addedDate: string
    order: number
}
export type ResponseType<D = {}> = {
    resultCode: number
    messages: Array<string>
    data: D
}
export enum TaskStatuses {
    New = 0,
    InProgress = 1,
    Completed = 2,
    Draft = 3
}
export enum TaskPriorities {
    Low = 0,
    Middle = 1,
    Hi = 2,
    Urgently = 3,
    Later = 4
}
export type TaskType = {
    description: string
    title: string
    status: TaskStatuses
    priority: TaskPriorities
    startDate: string
    deadline: string
    id: string
    todoListId: string
    order: number
    addedDate: string
}
type GetTaskResponse = {
    items: Array<TaskType>
    totalCount: number
    error: string | null
}
export type UpdateTaskModuleType = {
    title: string
    description: string
    status: TaskStatuses
    priority: TaskPriorities
    startDate: string
    deadline: string
}
export type LoginParamsType = {
    email: string
    password: string
    rememberMe: boolean
    captcha?: string
}


