import React, {ChangeEvent, useCallback} from 'react';
import {Checkbox, IconButton} from '@material-ui/core';
import EditTableSpan from './EditTableSpan';
import {Delete} from '@material-ui/icons';
import {TaskStatuses, TaskType} from './api/todolists-api';


type TaskPropsType = {
    changeStatus: (id: string, status: TaskStatuses, todoListId: string) => void
    changeTaskTitle: (taskId: string, newTitle: string, todolistId: string) => void
    removeTask: (id: string, todoListId: string) => void
    task: TaskType
    todoListId: string
}

export const Task = React.memo((props: TaskPropsType) => {
    const onStatusChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        let newIsDoneValue = e.currentTarget.checked;
        props.changeStatus(props.task.id, newIsDoneValue ? TaskStatuses.Completed : TaskStatuses.New, props.todoListId)
    }

    const onTitleChangeCallBack = useCallback((newTitle: string) => {
        props.changeTaskTitle(props.task.id, newTitle, props.todoListId)
    }, [props.changeTaskTitle, props.task.id, props.todoListId])
    const deleteTodoList = () => {
        props.removeTask(props.task.id, props.todoListId)
    }


    return (<div key={props.task.id} className={props.task.status === TaskStatuses.Completed ? 'is-done' : ''}>
        <Checkbox
            checked={props.task.status === TaskStatuses.Completed}
            onChange={onStatusChangeHandler}
            color={'primary'}
        />
        <EditTableSpan title={props.task.title} saveTitle={onTitleChangeCallBack}/>
        <IconButton onClick={deleteTodoList}>
            <Delete/>
        </IconButton>
    </div>)
})