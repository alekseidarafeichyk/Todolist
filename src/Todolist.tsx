import React, {ChangeEvent} from "react";
import {FilterValueType, TaskType} from './App'
import AddItemForm from "./AddItemForm";
import EditTableSpan from "./EditTableSpan";
import {Button, IconButton, Checkbox} from "@material-ui/core";
import {Delete} from "@material-ui/icons";


type PropsType = {
    id: string
    title: string,
    tasks: Array<TaskType>,
    removeTask: (id: string, todoListId: string) => void,
    changeFilter: (value: FilterValueType, id: string) => void,
    addTask: (title: string, todoListId: string) => void
    changeStatus: (id: string, isDone: boolean, todoListId: string) => void
    filter: string
    removeTodoList: (id: string) => void
    changeTaskTitle: (taskId: string, newTitle: string, todolistId: string) => void
    changeTodolistTitle: (id: string, newTitle: string) => void
}

export function TodoList(props: PropsType) {

    let jsxTask = props.tasks.map(t => {

        const onStatusChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
            let newInputValue = e.currentTarget.checked;
            props.changeStatus(t.id, newInputValue, props.id)
        }

        const onTitleChangeCallBack = (newTitle: string) => {
            props.changeTaskTitle(t.id, newTitle, props.id)
        }
        const deleteTodoList = () => {
            props.removeTask(t.id, props.id)
        }

        return (<div key={t.id} className={(props.filter === 'completed' && t.isDone) ? 'is-done' : ''}>
                <Checkbox
                    checked={t.isDone}
                    onChange={onStatusChangeHandler}
                    color={"primary"}
                />
                {/*<input type="checkbox" checked={t.isDone} onChange={onStatusChangeHandler}/>*/}
                <EditTableSpan title={t.title} saveTitle={onTitleChangeCallBack}/>
                <IconButton onClick={deleteTodoList}>
                    <Delete/>
                </IconButton>
            </div>
        )
    })

    const onAllClickHandler = () => {
        props.changeFilter('all', props.id)
    }
    const onActiveClickHandler = () => {
        props.changeFilter('active', props.id)
    }
    const onCompletedClickHandler = () => {
        props.changeFilter('completed', props.id)
    }

    const allBtnClass = props.filter === 'all' ? 'active-filter' : ''
    const activeBtnClass = props.filter === 'active' ? 'active-filter' : ''
    const completedBtnClass = props.filter === 'completed' ? 'active-filter' : ''

    const createTaskTitle = (title: string) => {
        props.addTask(title, props.id)
    }

    const changeTodolistTitle = (title: string) => {
        props.changeTodolistTitle(props.id, title);
    }

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
}