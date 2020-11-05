import {addTodolistAC, TodolistDomainType, todoListReducer} from './todolists-reducer';
import {tasksReducer, TasksStateType} from './tasks-reducer';


test('ids should be equals', () => {
    const startTasksState: TasksStateType = {};
    const startTodolistsState: Array<TodolistDomainType> = [];

    const action = addTodolistAC({todolist:{
            id: '1',
            addedDate: '',
            title: "new todolist",
            order: 0
        }});

    const endTasksState = tasksReducer( startTasksState, action)
    const endTodolistsState = todoListReducer(startTodolistsState, action)

    const keys = Object.keys(endTasksState);
    const idFromTasks = keys[0];
    const idFromTodolists = endTodolistsState[0].id;

    expect(idFromTasks).toBe(action.payload.todolist.id);
    expect(idFromTodolists).toBe(action.payload.todolist.id);
});


