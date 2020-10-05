import React, {useState} from 'react';
import './App.css';
import {TodoList} from './Todolist';
import {v1} from 'uuid';
import AddItemForm from './AddItemForm';
import {Menu} from '@material-ui/icons';
import {AppBar, Button, Container, Grid, IconButton, Paper, Toolbar, Typography} from '@material-ui/core';
import {TaskPriorities, TaskStatuses, TaskType} from './api/todolists-a-p-i';
import {FilterValueType, TodolistDomainType} from './state/todolists-reducer';


export type TasksStateType = {
    [key: string]: Array<TaskType>
}


function App() {

    let todoListID1 = v1()
    let todoListID2 = v1()

    let [todoLists, setTodoLists] = useState<Array<TodolistDomainType>>([
        {id: todoListID1, title: 'Books', filter: 'all', addedDate: '', order: 0},
        {id: todoListID2, title: 'Songs', filter: 'active', addedDate: '', order: 0},
    ])

    let [tasks, setTask] = useState<TasksStateType>({
        [todoListID1]: [
            {
                id: v1(),
                status: TaskStatuses.Completed,
                title: 'JS',
                todoListId: todoListID1,
                description: '',
                startDate: '',
                deadline: '',
                addedDate: '',
                order: 0,
                priority: TaskPriorities.Low
            },
            {
                id: v1(),
                status: TaskStatuses.Completed,
                title: 'React',
                todoListId: todoListID1,
                description: '',
                startDate: '',
                deadline: '',
                addedDate: '',
                order: 0,
                priority: TaskPriorities.Low
            },
            {
                id: v1(),
                status: TaskStatuses.Completed,
                title: 'Redux',
                todoListId: todoListID1,
                description: '',
                startDate: '',
                deadline: '',
                addedDate: '',
                order: 0,
                priority: TaskPriorities.Low
            },
        ],
        [todoListID2]: [
            {
                id: v1(),
                status: TaskStatuses.Completed,
                title: 'RestApi',
                todoListId: todoListID2,
                description: '',
                startDate: '',
                deadline: '',
                addedDate: '',
                order: 0,
                priority: TaskPriorities.Low
            },
            {
                id: v1(),
                status: TaskStatuses.Completed,
                title: 'GraphQl',
                todoListId: todoListID2,
                description: '',
                startDate: '',
                deadline: '',
                addedDate: '',
                order: 0,
                priority: TaskPriorities.Low
            },
        ]
    });


    function removeTask(id: string, todoListId: string) {
        let todoListTasks = tasks[todoListId]
        tasks[todoListId] = todoListTasks.filter(t => t.id !== id)
        setTask({...tasks})
    }

    function addTask(title: string, todoListId: string) {
        let task = {
            id: v1(),
            title: title,
            status: TaskStatuses.New,
            todoListId: todoListId,
            description: '',
            startDate: '',
            deadline: '',
            addedDate: '',
            order: 0,
            priority: TaskPriorities.Low
        }
        let todoListTasks = tasks[todoListId]
        tasks[todoListId] = [task, ...todoListTasks]
        setTask({...tasks})
    }


    function changeStatus(id: string, status: TaskStatuses, todoListId: string) {
        let todoListTasks = tasks[todoListId]
        let task = todoListTasks.find(t => t.id === id)
        if (task) {
            task.status = status
            setTask({...tasks})
        }
    }

    function changeTaskTitle(id: string, title: string, todoListId: string) {
        let todoListTasks = tasks[todoListId]
        let task = todoListTasks.find(t => t.id === id)
        if (task) {
            task.title = title
            setTask({...tasks})
        }
    }


    function changeFilter(value: FilterValueType, id: string) {
        let todoList = todoLists.find(tl => tl.id === id)
        if (todoList) {
            todoList.filter = value
            setTodoLists([...todoLists])
        }
    }

    function changeTodolistTitle(id: string, title: string) {
        // найдём нужный todolist
        const todolist = todoLists.find(tl => tl.id === id);
        if (todolist) {
            // если нашёлся - изменим ему заголовок
            todolist.title = title;
            setTodoLists([...todoLists]);
        }
    }

    function removeTodo(id: string) {
        setTodoLists(todoLists.filter(tl => tl.id !== id))
        delete tasks[id]
        setTask({...tasks})
    }

    function addTodoList(title: string) {
        let newTodoListId = v1()
        let newTodoList: TodolistDomainType = {
            id: newTodoListId,
            title: title,
            filter: 'all',
            addedDate: '',
            order: 0
        }
        setTodoLists([newTodoList, ...todoLists])
        setTask({
            ...tasks,
            [newTodoListId]: []
        })
    }

    return (

        <div className="App">
            <AppBar position="static">
                <Toolbar>
                    <IconButton edge="start" color="inherit" aria-label="menu">
                        <Menu/>
                    </IconButton>
                    <Typography variant="h6">
                        News
                    </Typography>
                    <Button color="inherit">Login</Button>
                </Toolbar>
            </AppBar>

            <Container fixed>
                <Grid container style={{padding: '20px'}}>
                    <AddItemForm addItem={addTodoList}/>
                </Grid>
                <Grid container spacing={3}>
                    {todoLists.map(tl => {
                        let allTodoListTasks = tasks[tl.id]

                        let tasksForTodoList = allTodoListTasks;
                        if (tl.filter === 'active') {
                            tasksForTodoList = allTodoListTasks.filter(t => t.status === TaskStatuses.New)
                        }
                        if (tl.filter === 'completed') {
                            tasksForTodoList = allTodoListTasks.filter(t => t.status === TaskStatuses.Completed)
                        }

                        return (
                            <Grid item key={tl.id}>
                                <Paper elevation={3} style={{padding: '10px'}}>
                                    <TodoList
                                        id={tl.id}
                                        title={tl.title}
                                        tasks={tasksForTodoList}
                                        removeTask={removeTask}
                                        changeFilter={changeFilter}
                                        addTask={addTask}
                                        changeStatus={changeStatus}
                                        filter={tl.filter}
                                        removeTodoList={removeTodo}
                                        changeTaskTitle={changeTaskTitle}
                                        changeTodolistTitle={changeTodolistTitle}
                                    /></Paper>
                            </Grid>
                        )
                    })}</Grid>
            </Container>
        </div>
    );
}

export default App;
