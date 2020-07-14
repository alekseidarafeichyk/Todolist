import React, {useState} from 'react';
import './App.css';
import {TodoList} from "./Todolist";
import {v1} from "uuid";
import AddItemForm from "./AddItemForm";
import {Menu} from "@material-ui/icons";
import {AppBar, Button, Container, Grid, IconButton, Paper, Toolbar, Typography} from "@material-ui/core";

export type TaskType = {
    id: string,
    isDone: boolean,
    title: string
}

type TodoListType = {
    id: string,
    title: string,
    filter: FilterValueType,
}

type TaskStateType = {
    [key: string]: Array<TaskType>
}

export type FilterValueType = 'all' | 'active' | 'completed'

function App() {

    let todoListID1 = v1()
    let todoListID2 = v1()

    let [todoLists, setTodoLists] = useState<Array<TodoListType>>([
        {id: todoListID1, title: 'Books', filter: 'all'},
        {id: todoListID2, title: 'Songs', filter: 'active'},
    ])

    let [tasks, setTask] = useState<TaskStateType>({
        [todoListID1]: [
            {id: v1(), isDone: true, title: 'JS'},
            {id: v1(), isDone: true, title: 'React'},
            {id: v1(), isDone: false, title: 'Redux'},],
        [todoListID2]: [
            {id: v1(), isDone: false, title: 'RestApi'},
            {id: v1(), isDone: false, title: 'GraphQl'},
        ]
    });


    function removeTask(id: string, todoListId: string) {
        let todoListTasks = tasks[todoListId]
        tasks[todoListId] = todoListTasks.filter(t => t.id !== id)
        setTask({...tasks})
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

    function addTask(title: string, todoListId: string) {
        let task = {id: v1(), title: title, isDone: false}
        let todoListTasks = tasks[todoListId]
        tasks[todoListId] = [task, ...todoListTasks]
        setTask({...tasks})
    }

    function changeStatus(id: string, isDone: boolean, todoListId: string) {
        let todoListTasks = tasks[todoListId]
        let task = todoListTasks.find(t => t.id === id)
        if (task) {
            task.isDone = isDone
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


    function removeTodo(id: string) {
        setTodoLists(todoLists.filter(tl => tl.id !== id))
        delete tasks[id]
        setTask({...tasks})
    }

    function addTodoList(title: string) {
        let newTodoListId = v1()
        let newTodoList: TodoListType = {
            id: newTodoListId,
            title: title,
            filter: "all"
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
                <Grid container  style={{padding: '20px'}}>
                    <AddItemForm addItem={addTodoList}/>
                </Grid>
                <Grid container spacing={3}>
                    {todoLists.map(tl => {
                        let allTodoListTasks = tasks[tl.id]

                        let tasksForTodoList = allTodoListTasks;
                        if (tl.filter === 'active') {
                            tasksForTodoList = allTodoListTasks.filter(t => t.isDone === false)
                        }
                        if (tl.filter === 'completed') {
                            tasksForTodoList = allTodoListTasks.filter(t => t.isDone === true)
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
