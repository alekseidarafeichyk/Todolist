import React, {ChangeEvent, useState} from "react";
import {TextField} from "@material-ui/core";

type EditTableSpanPropsType = {
    title: string
    saveTitle: (newTitle: string) => void
}

export const  EditableSpan = React.memo ((props: EditTableSpanPropsType) => {
    console.log('Editablespan called')
    let [editMode, setEditMode] = useState(false)
    let [title, setTitle] = useState(props.title)

    const onEditMode = () => {
        setEditMode(true)
    }

    const offEditMode = () => {
        setEditMode(false)
        props.saveTitle(title)
        setTitle('')
    }

    const changeTitle = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)
    }

    return editMode ?
        <TextField
            variant={"outlined"}
            value={title}
            autoFocus
            onBlur={offEditMode}
            onChange={changeTitle}
        /> :
        <span onDoubleClick={onEditMode}>{props.title}</span>
})

export default EditableSpan