import React from 'react';
import {action} from '@storybook/addon-actions';
import {Task} from './Task';
import {TaskPriorities, TaskStatuses} from '../../../../api/todolists-api';

export default {
    title: 'Task Component',
    component: Task,
}

const changeTaskStatusCallback = action('Status changed inside task');
const changeTaskTitleCallback = action('Title changed inside task');
const removeTaskCallback = action('Remove task');

export const TaskBaseExample = (props: any) => {
    return <>
        <Task changeStatus={changeTaskStatusCallback}
              changeTaskTitle={changeTaskTitleCallback}
              removeTask={removeTaskCallback}
              task={{
                  id: '1',
                  status: TaskStatuses.Completed,
                  title: 'CSS',
                  todoListId: 'todoListID1',
                  description: '',
                  startDate: '',
                  deadline: '',
                  addedDate: '',
                  order: 0,
                  priority: TaskPriorities.Low
              }}
              todoListId={'todoListId1'}
        />
        <Task changeStatus={changeTaskStatusCallback}
              changeTaskTitle={changeTaskTitleCallback}
              removeTask={removeTaskCallback}
              task={{id: '2',
                  status: TaskStatuses.Completed,
                  title: 'HTML',
                  todoListId: 'todoListID1',
                  description: '',
                  startDate: '',
                  deadline: '',
                  addedDate: '',
                  order: 0,
                  priority: TaskPriorities.Low}}
              todoListId={'todoListId2'}
        />
    </>
}

