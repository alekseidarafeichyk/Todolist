import React, {useReducer} from 'react';
import './App.css';
import {TodoList} from './Todolist';
import {v1} from 'uuid';
import AddItemForm from './AddItemForm';
import {Menu} from '@material-ui/icons';
import {AppBar, Button, Container, Grid, IconButton, Paper, Toolbar, Typography} from '@material-ui/core';
import {addTaskAC, removeTaskAC, tasksReducer, UpdateTaskAC} from './state/tasks-reducer';
import {
    addTodolistAC,
    changeTodolistFilterAC,
    changeTodoListTitleAC,
    FilterValueType,
    removeTodoListAC,
    todoListReducer
} from './state/todolists-reducer';
import {TaskPriorities, TaskStatuses, TaskType} from './api/todolists-a-p-i';

export type TasksStateType = {
    [key: string]: Array<TaskType>
}

function AppWithReducers() {

    let todoListID1 = v1()
    let todoListID2 = v1()

    let [todoLists, dispatchToTodolist] = useReducer(todoListReducer, [
        {id: todoListID1, title: 'Books', filter: 'all',addedDate:'',order:0},
        {id: todoListID2, title: 'Songs', filter: 'active',addedDate:'',order:0},
    ])

    let [tasks, dispatchToTasks] = useReducer(tasksReducer, {
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
            },{
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
            }
            ,],
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
            }
           ,
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
            }
           ,
        ]
    });


    function removeTask(id: string, todoListId: string) {
        dispatchToTasks(removeTaskAC(id, todoListId))
    }

    function addTask(title: string, todoListId: string) {
        dispatchToTasks(addTaskAC({
                id: '1',
                title: title,
                status: TaskStatuses.New,
                todoListId: todoListId,
                description: '',
                startDate: '',
                deadline: '',
                addedDate: '',
                order: 0,
                priority: TaskPriorities.Low}))
    }


    function changeStatus(id: string, status: TaskStatuses, todoListId: string) {
        dispatchToTasks(UpdateTaskAC(id, {status}, todoListId))
    }

    function changeTaskTitle(id: string, title: string, todoListId: string) {
        dispatchToTasks(UpdateTaskAC(id, {title}, todoListId))
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
        let action = addTodolistAC({
            id: v1(),
            addedDate: '',
            order: 0,
            title: title
        })
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
                            tasksForTodoList = allTodoListTasks.filter(t => t.status === TaskStatuses.New)
                        }
                        if (tl.filter === 'completed') {
                            tasksForTodoList = allTodoListTasks.filter(t => t.status === TaskStatuses.Completed)
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
