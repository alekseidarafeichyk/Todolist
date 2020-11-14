import React, {useCallback, useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {AppRootStoreType} from '../../app/store';
import {
    addTodolistTC,
    changeTodolistFilterAC,
    changeTodoListTitleTC,
    fetchTodolistsTC,
    FilterValueType,
    removeTodolistTC,
    TodolistDomainType
} from './todolists-reducer';
import {addTaskTC, removeTaskTC, TasksStateType, updateTaskTC} from './tasks-reducer';
import {TaskStatuses} from '../../api/todolists-api';
import {Grid, Paper} from '@material-ui/core';
import AddItemForm from '../../components/AddItemForm/AddItemForm';
import {TodoList} from './Todolist/Todolist';
import {Redirect} from 'react-router-dom';

type TodolistsListPropsType = {
    demo?: boolean
}

export const TodolistsList: React.FC<TodolistsListPropsType> = ({demo = false,...props}) => {
    const todoLists = useSelector<AppRootStoreType, Array<TodolistDomainType>>(state => state.todolists);
    const tasks = useSelector<AppRootStoreType, TasksStateType>(state => state.tasks);
    const dispatch = useDispatch();
    const isLoggedIn = useSelector<AppRootStoreType,boolean>(state => state.auth.isLoggedIn)


    useEffect(() => {
        if (demo || !isLoggedIn) {
            return
        }
        dispatch(fetchTodolistsTC())
    }, [])

    const removeTask = useCallback((taskId: string, todoListId: string) => {
        dispatch(removeTaskTC({todoListId, taskId}))
    }, [dispatch])

    const addTask = useCallback((taskTitle: string, todolistId: string) => {
        dispatch(addTaskTC({todolistId, taskTitle}))
    }, [dispatch])


    const changeStatus = useCallback((id: string, status: TaskStatuses, todoListId: string) => {
        dispatch(updateTaskTC({taskId: id,domainModel:{status},todolistId:  todoListId}))
    }, [dispatch])

    const changeTaskTitle = useCallback((id: string, title: string, todoListId: string) => {
        dispatch(updateTaskTC({taskId: id,domainModel:{title},todolistId:  todoListId}))
    }, [dispatch])


    const changeFilter = useCallback((value: FilterValueType, id: string) => {
        dispatch(changeTodolistFilterAC({filter: value, id: id}))
    }, [dispatch])

    const changeTodolistTitle = useCallback((id: string, title: string) => {
        dispatch(changeTodoListTitleTC({id, title}))
    }, [dispatch])

    const removeTodo = useCallback((id: string) => {
        dispatch(removeTodolistTC(id))
    }, [dispatch])

    const addTodoList = useCallback((title: string) => {
        dispatch(addTodolistTC(title));
    }, [dispatch])

    if (!isLoggedIn) {
        return <Redirect to={'/login'}/>
    }

    return <>
        <Grid container style={{padding: '20px'}}>
            <AddItemForm addItem={addTodoList}/>
        </Grid>
        <Grid container spacing={3}>
            {todoLists.map(tl => {
                return (
                    <Grid item key={tl.id}>
                        <Paper elevation={3} style={{padding: '10px'}}>
                            <TodoList
                                todolist={tl}
                                tasks={tasks[tl.id]}
                                removeTask={removeTask}
                                changeFilter={changeFilter}
                                addTask={addTask}
                                changeStatus={changeStatus}
                                removeTodoList={removeTodo}
                                changeTaskTitle={changeTaskTitle}
                                changeTodolistTitle={changeTodolistTitle}
                                demo={demo}
                            /></Paper>
                    </Grid>
                )
            })}</Grid>
    </>
}