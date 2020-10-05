import React, {useEffect, useState} from 'react'
import {todolistsAPI, UpdateTaskModuleType} from '../api/todolists-a-p-i';


export default {
    title: 'API'
}

export const GetTodolists = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        todolistsAPI.getTodolists()
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
        todolistsAPI.createTodolist(value)
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
        todolistsAPI.deleteTodolist(todolistId)
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
        todolistsAPI.updateTodolistTitle(todolistId, title)
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
        todolistsAPI.getTasks(todolistId)
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
        todolistsAPI.createTask(todolistId, title,)
            .then(response =>
                setState(response.data)
            )
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


const bodyForUpdateTask: UpdateTaskModuleType = {
    title: 'asdfdsaf',
    description: 'lorem',
    status: 2,
    priority: 2,
    startDate: '',
    deadline: '',
}

export const UpdateTask = () => {
    const [state, setState] = useState<any>(null)
    const [todolistId, setTodolistId] = useState<any>(null)
    const [taskId, setTaskId] = useState<any>(null)
    const [newTitle, setNewTitle] = useState<any>(null)


    const updateTaskHandler = () => {
        todolistsAPI.updateTask(todolistId, taskId,
            {
                ...bodyForUpdateTask,
                title: newTitle
            })
            .then(response => setState(response.data))
    }

    return <div>
        <input value={todolistId}
               placeholder={'todolistId'}
               onChange={(e) => {
                   setTodolistId(e.currentTarget.value)
               }}/>
        <input placeholder={'taskId'}
               value={taskId}

               onChange={(e) => {
                   setTaskId(e.currentTarget.value)
               }}/>
        <input
            value={newTitle}
            placeholder={'newTitle'}
            onChange={(e) => {
                setNewTitle(e.currentTarget.value)
            }}/>
        <button onClick={updateTaskHandler}>update task</button>
        <div> {JSON.stringify(state)}</div>
    </div>

    return <div> {JSON.stringify(state)}</div>
}

export const DeleteTask = () => {
    const [state, setState] = useState<any>(null)
    const [todolistId, setTodolistId] = useState<any>(null)
    const [taskId, setTaskId] = useState<any>(null)


    const deleteTaskHandler = () => {
        todolistsAPI.deleteTask(todolistId, taskId)
            .then(response => setState(response.data))
    }

    return <div>
        <input value={todolistId}
               placeholder={'todolistId'}
               onChange={(e) => {
                   setTodolistId(e.currentTarget.value)
               }}/>
        <input value={taskId}
               placeholder={'taskId'}
               onChange={(e) => {
                   setTaskId(e.currentTarget.value)
               }}/>
        <button onClick={deleteTaskHandler}>delete</button>
        <div> {JSON.stringify(state)}</div>
    </div>
}


