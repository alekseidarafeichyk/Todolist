import React, {useReducer} from 'react';
import './App.css';
import {TodoList} from './Todolist';
import {v1} from 'uuid';
import AddItemForm from './AddItemForm';
import {Menu} from '@material-ui/icons';
import {AppBar, Button, Container, Grid, IconButton, Paper, Toolbar, Typography} from '@material-ui/core';
import {addTaskAC, changeTaskStatusAC, changeTaskTitleAC, removeTaskAC, tasksReducer} from './state/tasks-reducer';
import {
    addTodolistAC,
    changeTodolistFilterAC,
    changeTodoListTitleAC,
    removeTodoListAC,
    todoListReducer
} from './state/todolists-reducer';

export type TaskType = {
    id: string,
    isDone: boolean,
    title: string
}

export type TodoListType = {
    id: string,
    title: string,
    filter: FilterValueType,
}

export type TasksStateType = {
    [key: string]: Array<TaskType>
}

export type FilterValueType = 'all' | 'active' | 'completed'

function AppWithReducers() {

    let todoListID1 = v1()
    let todoListID2 = v1()

    let [todoLists, dispatchToTodolist] = useReducer(todoListReducer, [
        {id: todoListID1, title: 'Books', filter: 'all'},
        {id: todoListID2, title: 'Songs', filter: 'active'},
    ])

    let [tasks, dispatchToTasks] = useReducer(tasksReducer, {
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
        dispatchToTasks(removeTaskAC(id, todoListId))
    }

    function addTask(title: string, todoListId: string) {
        dispatchToTasks(addTaskAC(title, todoListId))
    }


    function changeStatus(id: string, isDone: boolean, todoListId: string) {
        dispatchToTasks(changeTaskStatusAC(id, isDone, todoListId))
    }

    function changeTaskTitle(id: string, title: string, todoListId: string) {
        dispatchToTasks(changeTaskTitleAC(id, title, todoListId))
    }


    function changeFilter(value: FilterValueType, id: string) {
        dispatchToTodolist(changeTodolistFilterAC(value, id))
    }

    function changeTodolistTitle(id: string, title: string) {
        dispatchToTodolist(changeTodoListTitleAC(id, title))
    }

    function removeTodo(id: string) {
        dispatchToTodolist(removeTodoListAC(id))
        dispatchToTasks(removeTodoListAC(id))
    }

    function addTodoList(title: string) {
        let action = addTodolistAC(title)
        dispatchToTodolist(action)
        dispatchToTasks(action)
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
                            tasksForTodoList = allTodoListTasks.filter(t => t.isDone === false)
                        }
                        if (tl.filter === 'completed') {
                            tasksForTodoList = allTodoListTasks.filter(t => t.isDone === true)
                        }
                        debugger
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

export default AppWithReducers;
