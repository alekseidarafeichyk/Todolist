import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
import {IconButton, TextField} from '@material-ui/core';
import {AddBox} from '@material-ui/icons';


type AddItemFormPropsType = {
    addItem: (title: string) => void
}

export const AddItemForm = React.memo((props: AddItemFormPropsType) => {
    console.log('Add item form')

    let [title, setTitle] = useState<string>('')
    let [error, setError] = useState<string | null>(null)


    const onTitleChange = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)
    }

    const onKeyPressAddTask = (e: KeyboardEvent<HTMLInputElement>) => {
        if (error !== null) {
            setError(null)
        }

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
                variant={'outlined'}
                value={title}
                onChange={onTitleChange}
                onKeyPress={onKeyPressAddTask}
                error={!!error}
                label={'Title'}
                helperText={error}
            />
            <IconButton
                color={'primary'}
                onClick={onAddItemClick}>
                <AddBox/>
            </IconButton>
        </div>
    )
})

export default AddItemForm;