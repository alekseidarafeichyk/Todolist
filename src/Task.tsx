import React, {ChangeEvent, useCallback} from 'react';
import {TaskType} from './App';
import {Checkbox, IconButton} from '@material-ui/core';
import EditTableSpan from './EditTableSpan';
import {Delete} from '@material-ui/icons';


type TaskPropsType = {
    changeStatus: (id: string, isDone: boolean, todoListId: string) => void
    changeTaskTitle: (taskId: string, newTitle: string, todolistId: string) => void
    removeTask: (id: string, todoListId: string) => void
    task: TaskType
    todoListId: string
}

export const Task = React.memo((props: TaskPropsType) => {
    const onStatusChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        let newInputValue = e.currentTarget.checked;
        props.changeStatus(props.task.id, newInputValue, props.todoListId)
    }

    const onTitleChangeCallBack = useCallback((newTitle: string) => {
        props.changeTaskTitle(props.task.id, newTitle, props.todoListId)
    }, [props.changeTaskTitle, props.task.id, props.todoListId])
    const deleteTodoList = () => {
        props.removeTask(props.task.id, props.todoListId)
    }


    return (<div key={props.task.id} className={props.task.isDone ? 'is-done' : ''}>
        <Checkbox
            checked={props.task.isDone}
            onChange={onStatusChangeHandler}
            color={'primary'}
        />
        <EditTableSpan title={props.task.title} saveTitle={onTitleChangeCallBack}/>
        <IconButton onClick={deleteTodoList}>
            <Delete/>
        </IconButton>
    </div>)
})