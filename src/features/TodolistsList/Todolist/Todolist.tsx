import React, {useCallback, useEffect} from 'react';
import AddItemForm from '../../../components/AddItemForm/AddItemForm';
import EditableSpan from '../../../components/EditableSpan/EditableSpan';
import {Button} from '@material-ui/core';
import {Delete} from '@material-ui/icons';
import {Task} from './Task/Task';
import {TaskStatuses, TaskType} from '../../../api/todolists-api';
import {FilterValueType, TodolistDomainType} from '../todolists-reducer';
import {useDispatch} from 'react-redux';
import {fetchTasksTC} from '../tasks-reducer';


type PropsType = {
    todolist: TodolistDomainType
    tasks: Array<TaskType>
    removeTask: (id: string, todoListId: string) => void
    changeFilter: (value: FilterValueType, id: string) => void
    addTask: (title: string, todoListId: string) => void
    changeStatus: (id: string, status: TaskStatuses, todoListId: string) => void
    removeTodoList: (id: string) => void
    changeTaskTitle: (taskId: string, newTitle: string, todolistId: string) => void
    changeTodolistTitle: (id: string, newTitle: string) => void
    demo?: boolean
}

export const TodoList = React.memo(({demo = false, ...props}: PropsType) => {
    console.log('Todolist called')

    const dispatch = useDispatch();

    useEffect(() => {
        if (demo) {
            return;
        }
        dispatch(fetchTasksTC(props.todolist.id))
    }, [])


    let allTodolistTasks = props.tasks;
    let tasksForTodoList = allTodolistTasks;

    if (props.todolist.filter === 'active') {
        tasksForTodoList = tasksForTodoList.filter(taska => taska.status === TaskStatuses.New)
    }
    if (props.todolist.filter === 'completed') {
        tasksForTodoList = tasksForTodoList.filter(taska => taska.status === TaskStatuses.Completed)
    }

    let jsxTask = tasksForTodoList.map(t => {
        return <Task
            key={t.id}
            changeStatus={props.changeStatus}
            changeTaskTitle={props.changeTaskTitle}
            removeTask={props.removeTask}
            task={t}
            todoListId={props.todolist.id}
        />
    })


    const onAllClickHandler = useCallback(() => {
        props.changeFilter('all', props.todolist.id)
    }, [props.changeFilter, props.todolist.id])
    const onActiveClickHandler = useCallback(() => {
        props.changeFilter('active', props.todolist.id)
    }, [props.changeFilter, props.todolist.id])
    const onCompletedClickHandler = useCallback(() => {
        props.changeFilter('completed', props.todolist.id)
    }, [props.changeFilter, props.todolist.id])


    const createTaskTitle = useCallback((title: string) => {
        props.addTask(title, props.todolist.id);
    }, [props.addTask, props.todolist.id])

    const changeTodolistTitle = useCallback((title: string) => {
        props.changeTodolistTitle(props.todolist.id, title);
    }, [props.changeTodolistTitle, props.todolist.id])

    const removeTodoList = () => {
        props.removeTodoList(props.todolist.id)
    }


    return (
        <div>
            <h3>
                <EditableSpan title={props.todolist.title} saveTitle={changeTodolistTitle}/>
                <Button onClick={removeTodoList} disabled={props.todolist.entityStatus === 'loading'}>
                    <Delete/>
                </Button>
            </h3>


            <AddItemForm addItem={createTaskTitle}
                         disabled={props.todolist.entityStatus === 'loading'}
            />
            <ul>
                {jsxTask}
            </ul>
            <div>
                <Button
                    onClick={onAllClickHandler}
                    color={props.todolist.filter === 'all' ? 'secondary' : 'primary'}
                    variant={'outlined'}
                >All
                </Button>
                <Button
                    onClick={onActiveClickHandler}
                    color={props.todolist.filter === 'active' ? 'secondary' : 'primary'}
                    variant={'outlined'}
                >Active
                </Button>
                <Button
                    onClick={onCompletedClickHandler}
                    variant={'outlined'}
                    color={props.todolist.filter === 'completed' ? 'secondary' : 'primary'}
                >Completed
                </Button>
            </div>
        </div>
    );
})

