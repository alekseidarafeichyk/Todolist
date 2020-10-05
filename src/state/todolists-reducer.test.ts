import {v1} from 'uuid';
import {
    addTodolistAC,
    changeTodolistFilterAC,
    changeTodoListTitleAC, FilterValueType,
    removeTodoListAC, setTodolistsAC, TodolistDomainType,
    todoListReducer
} from './todolists-reducer';

let todoListID1: string;
let todoListID2: string;
let startState: Array<TodolistDomainType>;

beforeEach(() => {
     todoListID1 = v1()
     todoListID2 = v1()
    startState = [
        {id: todoListID1, title: 'Books', filter: 'all',addedDate:'',order:0},
        {id: todoListID2, title: 'Songs', filter: 'active',addedDate:'',order:0},
    ]
})

test('correct todolist should be removed', () => {
    const endState = todoListReducer(startState, removeTodoListAC(todoListID1))

    expect(endState.length).toBe(1)
    expect(endState[0].id).toBe(todoListID2)
});


test('correct todolist should be added', () => {
    let newTodolistTitle = 'New Todolist';
    const endState = todoListReducer(startState, addTodolistAC(newTodolistTitle))

    expect(endState.length).toBe(3);
    expect(endState[0].title).toBe(newTodolistTitle);
});


test('correct todolist should change its name', () => {
    let newTodolistTitle = 'New Todolist';

    let action = changeTodoListTitleAC(todoListID2, newTodolistTitle);

    const endState = todoListReducer(startState, action);

    expect(endState[0].title).toBe('Books');
    expect(endState[1].title).toBe(newTodolistTitle);
});


test('correct filter of todolist should be changed', () => {
    let newFilter: FilterValueType = 'completed';

    const action = changeTodolistFilterAC(newFilter, todoListID2);

    const endState = todoListReducer(startState, action);

    expect(endState[0].filter).toBe('all');
    expect(endState[1].filter).toBe(newFilter);
});


test('todolists should be set to the state', () => {

    const action = setTodolistsAC(startState);

    const endState = todoListReducer([], action);

    expect(endState.length).toBe(2);
});
