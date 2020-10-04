import axios from 'axios'


const instance = axios.create({
    withCredentials: true,
    headers: {
        'API-KEY': '628f1297-6b8a-455c-a591-d2e75c4bd3a6'
    },
    baseURL: 'https://social-network.samuraijs.com/api/1.1/'
})

export type TodolistType = {
    id: string
    title: string
    addedDate: string
    order: number
}

type ResponseType<D = {}> = {
    resultCode: number
    messages: Array<string>
    data: D
}

export type TaskType = {
    description: string
    title: string
    completed: boolean
    status: number
    priority: number
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

export type UpdateTaskType ={
    title: string
    description: string
    completed: boolean
    status: number
    priority: number
    startDate: string
    deadline: string
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
    addTaskForTodolist(todolistId: string, title: string) {
        return instance.post(`/todo-lists/${todolistId}/tasks`, {title});
    },
    updateTask(todolistId: string, taskId: string, body: UpdateTaskType) {
        return instance.put(`/todo-lists/${todolistId}/tasks/${taskId}`, body);
    },
    deleteTask(todolistId: string, taskId: string) {
        return instance.delete<ResponseType>(`/todo-lists/${todolistId}/tasks/${taskId}`);
    }
}

