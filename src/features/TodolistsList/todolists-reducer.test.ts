import {v1} from 'uuid';
import {
    addTodolistTC,
    changeTodolistEntityStatusAC,
    changeTodolistFilterAC,
    changeTodoListTitleTC,
    fetchTodolistsTC,
    FilterValueType,
    removeTodolistTC,
    TodolistDomainType,
    todoListReducer
} from './todolists-reducer';

let todoListID1: string;
let todoListID2: string;
let startState: Array<TodolistDomainType>;

beforeEach(() => {
    todoListID1 = v1()
    todoListID2 = v1()
    startState = [
        {id: todoListID1, title: 'Books', filter: 'all', addedDate: '', order: 0, entityStatus: 'idle'},
        {id: todoListID2, title: 'Songs', filter: 'active', addedDate: '', order: 0, entityStatus: 'idle'},
    ]
})

test('correct todolist should be removed', () => {
    const endState = todoListReducer(startState, removeTodolistTC.fulfilled({id: todoListID1}, 'requestId', todoListID1))

    expect(endState.length).toBe(1)
    expect(endState[0].id).toBe(todoListID2)
});


test('correct todolist should be added', () => {
    let newTodolistTitle = 'New Todolist';
    const payload = {
        todolist: {
            id: '1',
            title: newTodolistTitle,
            order: 0,
            addedDate: ''
        }
    };
    const endState = todoListReducer(startState, addTodolistTC.fulfilled(payload, 'requestId', payload.todolist.title))

    expect(endState.length).toBe(3);
    expect(endState[0].title).toBe(newTodolistTitle);
});


test('correct todolist should change its name', () => {
    let newTodolistTitle = 'New Todolist';

    const payload = {id: todoListID2, title: newTodolistTitle};
    let action = changeTodoListTitleTC.fulfilled(payload, 'requestId', payload);

    const endState = todoListReducer(startState, action);

    expect(endState[0].title).toBe('Books');
    expect(endState[1].title).toBe(newTodolistTitle);
});


test('correct filter of todolist should be changed', () => {
    let newFilter: FilterValueType = 'completed';

    const action = changeTodolistFilterAC({filter: newFilter, id: todoListID2});

    const endState = todoListReducer(startState, action);

    expect(endState[0].filter).toBe('all');
    expect(endState[1].filter).toBe(newFilter);
});


test('todolists should be set to the state', () => {

    const payload = {todolists: startState};
    const action = fetchTodolistsTC.fulfilled(payload, 'requestId');

    const endState = todoListReducer([], action);

    expect(endState.length).toBe(2);
});


test('correct entityStatus of todolist should be changed', () => {

    const action = changeTodolistEntityStatusAC({id: todoListID2, status: 'loading'});

    const endState = todoListReducer(startState, action);

    expect(endState[0].entityStatus).toBe('idle');
    expect(endState[1].entityStatus).toBe('loading');
});
