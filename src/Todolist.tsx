import React, {useCallback} from 'react';
import AddItemForm from './AddItemForm';
import EditTableSpan from './EditTableSpan';
import {Button} from '@material-ui/core';
import {Delete} from '@material-ui/icons';
import {Task} from './Task';
import {TaskStatuses, TaskType} from './api/todolists-api';
import {FilterValueType} from './state/todolists-reducer';


type PropsType = {
    id: string
    title: string
    tasks: Array<TaskType>
    removeTask: (id: string, todoListId: string) => void
    changeFilter: (value: FilterValueType, id: string) => void
    addTask: (title: string, todoListId: string) => void
    changeStatus: (id: string, status: TaskStatuses, todoListId: string) => void
    filter: string
    removeTodoList: (id: string) => void
    changeTaskTitle: (taskId: string, newTitle: string, todolistId: string) => void
    changeTodolistTitle: (id: string, newTitle: string) => void
}

export const TodoList = React.memo ((props: PropsType) => {
    console.log('Todolist called')

    let allTodolistTasks = props.tasks;
    let tasksForTodoList = allTodolistTasks;

    if (props.filter === 'active') {
        tasksForTodoList = tasksForTodoList.filter(taska => taska.status === TaskStatuses.New)
    }
    if (props.filter === 'completed') {
        tasksForTodoList = tasksForTodoList.filter(taska => taska.status === TaskStatuses.Completed)
    }

    let jsxTask = tasksForTodoList.map(t => {
        return <Task
            key={t.id}
            changeStatus={props.changeStatus}
            changeTaskTitle={props.changeTaskTitle}
            removeTask={props.removeTask}
            task={t}
            todoListId={props.id}
        />
    })


    const onAllClickHandler = useCallback(() => {
        props.changeFilter('all', props.id)
    },[props.changeFilter,props.id])
    const onActiveClickHandler = useCallback(() => {
        props.changeFilter('active', props.id)
    },[props.changeFilter,props.id])
    const onCompletedClickHandler = useCallback(() => {
        props.changeFilter('completed', props.id)
    },[props.changeFilter,props.id])


    //
    // const allBtnClass = props.filter === 'all' ? 'active-filter' : '';
    // const activeBtnClass = props.filter === 'active' ? 'active-filter' : '';
    // const completedBtnClass = props.filter === 'completed' ? 'active-filter' : '';


    const createTaskTitle = useCallback((title: string) => {
        props.addTask(title, props.id);
    }, [props.addTask,props.id])

    const changeTodolistTitle = useCallback ((title: string) => {
        props.changeTodolistTitle(props.id, title);
    }, [props.changeTodolistTitle,props.id])

    const removeTodoList = () => {
        props.removeTodoList(props.id)
    }


    return (
        <div>
            <h3>
                <EditTableSpan title={props.title} saveTitle={changeTodolistTitle}/>
                <Button onClick={removeTodoList}>
                    <Delete/>
                </Button>
            </h3>


            <AddItemForm addItem={createTaskTitle}/>
            <ul>
                {jsxTask}
            </ul>
            <div>
                <Button
                    onClick={onAllClickHandler}
                    color={props.filter === 'all' ? 'secondary' : 'primary'}
                    variant={"outlined"}
                >All
                </Button>
                <Button
                    onClick={onActiveClickHandler}
                    color={props.filter === 'active' ? 'secondary' : 'primary'}
                    variant={"outlined"}
                >Active
                </Button>
                <Button
                    onClick={onCompletedClickHandler}
                    variant={"outlined"}
                    color={props.filter === 'completed' ? 'secondary' : 'primary'}
                >Completed
                </Button>
            </div>
        </div>
    );
})

