import {addTodolistTC, TodolistDomainType, todoListReducer} from './todolists-reducer';
import {tasksReducer, TasksStateType} from './tasks-reducer';


test('ids should be equals', () => {
    const startTasksState: TasksStateType = {};
    const startTodolistsState: Array<TodolistDomainType> = [];

    const payload = {
        todolist:{
            id: '1',
            addedDate: '',
            title: "new todolist",
            order: 0
        }};
    const action = addTodolistTC.fulfilled(payload,'requestId',payload.todolist.title);

    const endTasksState = tasksReducer( startTasksState, action)
    const endTodolistsState = todoListReducer(startTodolistsState, action)

    const keys = Object.keys(endTasksState);
    const idFromTasks = keys[0];
    const idFromTodolists = endTodolistsState[0].id;

    expect(idFromTasks).toBe(action.payload.todolist.id);
    expect(idFromTodolists).toBe(action.payload.todolist.id);
});


