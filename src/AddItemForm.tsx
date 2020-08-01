import React, {ChangeEvent, KeyboardEvent, useState} from "react";
import {Button, IconButton, TextField} from "@material-ui/core";
import {AddBox} from "@material-ui/icons";


type AddItemFormPropsType = {
    addItem: (title: string) => void
}

function AddItemForm(props: AddItemFormPropsType) {
    let [title, setTitle] = useState<string>('')
    let [error, setError] = useState<string | null>(null)

    const onTitleChange = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)
    }

    const onKeyPressAddTask = (e: KeyboardEvent<HTMLInputElement>) => {
        setError(null)
        if (e.charCode === 13) {
            props.addItem(title)
        }
    }

    const onAddItemClick = () => {
        if (title.trim() !== '') {
            props.addItem(title)
        } else {
            setError('Title is required')
        }
        setTitle('')
    }

    return (
        <div>
            <TextField
                // type='text'
                variant={"outlined"}
                value={title}
                onChange={onTitleChange}
                onKeyPress={onKeyPressAddTask}
                error={!!error}
                label={'Title'}
                helperText={error}
                // className={error ? 'error' : ''}
            />
            <IconButton
                color={"primary"}
                onClick={onAddItemClick}>
                <AddBox/>
            </IconButton>
            {/*<Button variant={"contained"} color={"primary"} onClick={onAddItemClick}>+</Button>*/}
            {/*{error && <div className={'error-message'}>{error}</div>}*/}
        </div>
    )
}

export default AddItemForm;