import React from 'react';
import {action} from '@storybook/addon-actions';
import {Task} from './Task';
import EditTableSpan from './EditTableSpan';

export default {
    title: 'EditableSpan Component',
    component: EditTableSpan,
}

const titleChangedCallback = action('Title changed');

export const EditableSpanBaseExample = () =>{
    return <EditTableSpan title={'startValue'} saveTitle={titleChangedCallback}/>
}