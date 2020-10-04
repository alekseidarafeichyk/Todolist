import React, {useEffect, useState} from 'react'
import {todolistsApi, UpdateTaskType} from '../api/todolists-api';


export default {
    title: 'API'
}

export const GetTodolists = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        todolistsApi.getTodolists()
            .then(response => {
                setState(response.data);
            })
    }, [])

    return <div> {JSON.stringify(state)}</div>
}


export const CreateTodolist = () => {

    const [state, setState] = useState<any>(null)
    const [value, setValue] = useState<any>(null)

    const createTodolist = () => {
        todolistsApi.createTodolist(value)
            .then(response => {
                setState(response.data)
            })
    }

    return (
        <div>
            <input type="text"
                   placeholder={'newTodolist'}
                   value={value}
                   onChange={(e) => {
                       setValue(e.currentTarget.value)
                   }}

            />
            <button onClick={createTodolist}>Create Todolist</button>
            {JSON.stringify(state)}
        </div>)
}


export const DeleteTodolist = () => {
    const [state, setState] = useState<any>(null)
    const [todolistId, setTodolistId] = useState<any>(null)

    const deleteTodolist = () => {
        todolistsApi.deleteTodolist(todolistId)
            .then(response => setState(response.data))
    }

    return (
        <div>
            <input type="text"
                   placeholder={todolistId}
                   value={todolistId}
                   onChange={(e) => {
                       setTodolistId(e.currentTarget.value)
                   }}
            />
            <button onClick={deleteTodolist}>delete todolist</button>
            {JSON.stringify(state)}
        </div>)
}


export const UpdateTodolistTitle = () => {
    const [state, setState] = useState<any>(null)
    const [todolistId, setTodolistId] = useState<any>(null)
    const [title, setTitle] = useState<any>(null)

    const newTitle = () => {
        todolistsApi.updateTodolistTitle(todolistId,title)
            .then(response => {
                setState(response.data)
            })
    }

    return (
        <div>
            <input type="text"
                   placeholder={'todolistId'}
                   value={todolistId}
                   onChange={(e) => {
                       setTodolistId(e.currentTarget.value)
                   }}
            />
            <input type="text"
                   placeholder={'newTitle'}
                   value={title}
                   onChange={(e) => {
                       setTitle(e.currentTarget.value)
                   }}
            />
            <button onClick={newTitle}>new Title</button>
            {JSON.stringify(state)}
        </div>
    )
}

export const GetTask = () => {
    const [state, setState] = useState<any>(null)
    const [todolistId, setTodolistId] = useState<any>(null)

    const getTaskHandler = () => {
        todolistsApi.getTasks(todolistId)
            .then(response => setState(response.data))
    }

    return <>
        <input placeholder={'todolistId'}
               onChange={(e) => {
                   setTodolistId(e.currentTarget.value)
               }}
        />
        <button onClick={getTaskHandler}>get task</button>

        <div> {JSON.stringify(state)}</div>
    </>
}

export const AddTask = () => {
    const [state, setState] = useState<any>(null)
    const [todolistId, setTodolistId] = useState<any>(null)
    const [title, setTitle] = useState<any>(null)


    const addTaskHandler = () => {
        todolistsApi.addTaskForTodolist(todolistId, title)
            .then(response => setState(response.data))
    }

    return <>
        <input placeholder={'todolistId'}
               onChange={(e) => {
                   setTodolistId(e.currentTarget.value)
               }}
        />
        <input placeholder={'title'}
               onChange={(e) => {
                   setTitle(e.currentTarget.value)
               }}
        />
        <button onClick={addTaskHandler}>add task</button>

        <div> {JSON.stringify(state)}</div>
    </>
}


const bodyForUpdateTask: UpdateTaskType = {
    title: 'asdfdsaf',
    description: 'lorem',
    completed: true,
    status: 2,
    priority: 2,
    startDate: '',
    deadline: '',
}

export const UpdateTask = () => {
    const [state, setState] = useState<any>(null)
    const [todolistId, setTodolistId] = useState<any>(null)
    const [taskId, setTaskId] = useState<any>(null)

    const updateTaskHandler = () => {
        todolistsApi.updateTask(todolistId, taskId, bodyForUpdateTask)
            .then(response => setState(response.data))
    }

    return <div>
        <input onChange={(e) => {
            setTodolistId(e.currentTarget.value)
        }}/>
        <input onChange={(e) => {
            setTaskId(e.currentTarget.value)
        }}/>
        <button onClick={updateTaskHandler}>delete</button>
        <div> {JSON.stringify(state)}</div>
    </div>

    return <div> {JSON.stringify(state)}</div>
}

export const DeleteTask = () => {
    const [state, setState] = useState<any>(null)
    const [todolistId, setTodolistId] = useState<any>(null)
    const [taskId, setTaskId] = useState<any>(null)


    const deleteTaskHandler = () => {
        todolistsApi.deleteTask(todolistId, taskId)
            .then(response => setState(response.data))
    }

    return <div>
        <input onChange={(e) => {
            setTodolistId(e.currentTarget.value)
        }}/>
        <input onChange={(e) => {
            setTaskId(e.currentTarget.value)
        }}/>
        <button onClick={deleteTaskHandler}>delete</button>
        <div> {JSON.stringify(state)}</div>
    </div>
}


