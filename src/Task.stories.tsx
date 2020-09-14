import React from 'react';
import {action} from '@storybook/addon-actions';
import {Task} from './Task';

export default {
    title: 'Task Component',
    component: Task,
}

const changeTaskStatusCallback = action('Status changed inside task');
const changeTaskTitleCallback = action('Title changed inside task');
const removeTaskCallback = action('Remove task');

export const TaskBaseExample = () =>{
    return <>
    <Task changeStatus={changeTaskStatusCallback}
          changeTaskTitle={changeTaskTitleCallback}
          removeTask={removeTaskCallback}
          task={ {id : '1',isDone : true, title: 'CSS'} }
          todoListId={'todoListId1'}
    />
        <Task changeStatus={changeTaskStatusCallback}
              changeTaskTitle={changeTaskTitleCallback}
              removeTask={removeTaskCallback}
              task={ {id : '2',isDone : false, title: 'HTML'} }
              todoListId={'todoListId2'}
        />
    </>
}