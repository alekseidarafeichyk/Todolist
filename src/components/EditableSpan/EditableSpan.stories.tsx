import React from 'react';
import {action} from '@storybook/addon-actions';
import {Task} from '../../features/TodolistsList/Todolist/Task/Task';
import EditableSpan from './EditableSpan';

export default {
    title: 'EditableSpan Component',
    component: EditableSpan,
}

const titleChangedCallback = action('Title changed');

export const EditableSpanBaseExample = () =>{
    return <EditableSpan title={'startValue'} saveTitle={titleChangedCallback}/>
}