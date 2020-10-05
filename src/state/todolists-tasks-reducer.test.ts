import {TasksStateType, } from '../App';
import {addTodolistAC, TodolistDomainType, todoListReducer} from './todolists-reducer';
import {tasksReducer} from './tasks-reducer';


test('ids should be equals', () => {
    const startTasksState: TasksStateType = {};
    const startTodolistsState: Array<TodolistDomainType> = [];

    const action = addTodolistAC({
        id: '1',
        addedDate: '',
        title: "new todolist",
        order: 0
    });

    const endTasksState = tasksReducer(startTasksState, action)
    const endTodolistsState = todoListReducer(startTodolistsState, action)

    const keys = Object.keys(endTasksState);
    const idFromTasks = keys[0];
    const idFromTodolists = endTodolistsState[0].id;

    expect(idFromTasks).toBe(action.todolist.id);
    expect(idFromTodolists).toBe(action.todolist.id);
});


