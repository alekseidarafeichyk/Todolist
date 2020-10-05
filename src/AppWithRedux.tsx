import React, {useCallback, useEffect} from 'react';
import './App.css';
import {TodoList} from './Todolist';
import AddItemForm from './AddItemForm';
import {Menu} from '@material-ui/icons';
import {AppBar, Button, Container, Grid, IconButton, Paper, Toolbar, Typography} from '@material-ui/core';
import {addTaskAC, changeTaskStatusAC, changeTaskTitleAC, removeTaskAC} from './state/tasks-reducer';
import {
    addTodolistAC,
    changeTodolistFilterAC,
    changeTodoListTitleAC, fetchTodolistsTC,
    FilterValueType,
    removeTodoListAC,
    TodolistDomainType
} from './state/todolists-reducer';
import {useDispatch, useSelector} from 'react-redux';
import {AppRootStoreType} from './state/store';
import {TaskStatuses, TaskType} from './api/todolists-api';


export type TasksStateType = {
    [key: string]: Array<TaskType>
}


function AppWithRedux() {
    const todoLists = useSelector<AppRootStoreType, Array<TodolistDomainType>>(state => state.todolists);
    const tasks = useSelector<AppRootStoreType, TasksStateType>(state => state.tasks);
    const dispatch = useDispatch();

    useEffect(() => {
       dispatch(fetchTodolistsTC())
    },[])

    const removeTask = useCallback((id: string, todoListId: string) => {
        dispatch(removeTaskAC(id, todoListId))
    }, [dispatch])

    const addTask = useCallback((title: string, todoListId: string) => {
        dispatch(addTaskAC(title, todoListId))
    }, [dispatch])


    const changeStatus = useCallback((id: string, status: TaskStatuses, todoListId: string) => {
        dispatch(changeTaskStatusAC(id, status, todoListId))
    }, [dispatch])

    const changeTaskTitle = useCallback((id: string, title: string, todoListId: string) => {
        dispatch(changeTaskTitleAC(id, title, todoListId))
    }, [dispatch])


    const changeFilter = useCallback((value: FilterValueType, id: string) => {
        dispatch(changeTodolistFilterAC(value, id))
    }, [dispatch])

    const changeTodolistTitle = useCallback((id: string, title: string) => {
        dispatch(changeTodoListTitleAC(id, title))
    }, [dispatch])

    const removeTodo = useCallback((id: string) => {
        dispatch(removeTodoListAC(id))
    }, [dispatch])

    const addTodoList = useCallback((title: string) => {
        dispatch(addTodolistAC(title));
    }, [dispatch])

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
                        return (
                            <Grid item key={tl.id}>
                                <Paper elevation={3} style={{padding: '10px'}}>
                                    <TodoList
                                        id={tl.id}
                                        title={tl.title}
                                        tasks={tasks[tl.id]}
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

export default AppWithRedux;
