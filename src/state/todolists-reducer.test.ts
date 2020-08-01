import {v1} from 'uuid';
import {TodoListType, FilterValueType} from '../App';
import {
    addTodolistAC,
    changeTodolistFilterAC,
    changeTodoListTitleAC,
    removeTodoListAC,
    todoListReducer
} from './todolists-reducer';

let todoListID1: string;
let todoListID2: string;
let startState: Array<TodoListType>;

beforeEach(() => {
     todoListID1 = v1()
     todoListID2 = v1()
    startState = [
        {id: todoListID1, title: 'Books', filter: 'all'},
        {id: todoListID2, title: 'Songs', filter: 'active'},
    ]
})

test('correct todolist should be removed', () => {
    const endState = todoListReducer(startState, removeTodoListAC(todoListID1))

    expect(endState.length).toBe(1)
    expect(endState[0].id).toBe(todoListID2)
});

beforeEach(() => {
    todoListID1 = v1()
    todoListID2 = v1()
    startState = [
        {id: todoListID1, title: 'Books', filter: 'all'},
        {id: todoListID2, title: 'Songs', filter: 'active'},
    ]
})

test('correct todolist should be added', () => {
    let newTodolistTitle = 'New Todolist';
    const endState = todoListReducer(startState, addTodolistAC(newTodolistTitle))

    expect(endState.length).toBe(3);
    expect(endState[2].title).toBe(newTodolistTitle);
});

beforeEach(() => {
    todoListID1 = v1()
    todoListID2 = v1()
    startState = [
        {id: todoListID1, title: 'Books', filter: 'all'},
        {id: todoListID2, title: 'Songs', filter: 'active'},
    ]
})

test('correct todolist should change its name', () => {
    let newTodolistTitle = 'New Todolist';

    let action = changeTodoListTitleAC(todoListID2, newTodolistTitle);

    const endState = todoListReducer(startState, action);

    expect(endState[0].title).toBe('Books');
    expect(endState[1].title).toBe(newTodolistTitle);
});

beforeEach(() => {
    todoListID1 = v1()
    todoListID2 = v1()
    startState = [
        {id: todoListID1, title: 'Books', filter: 'all'},
        {id: todoListID2, title: 'Songs', filter: 'active'},
    ]
})

test('correct filter of todolist should be changed', () => {
    let newFilter: FilterValueType = 'completed';

    const action = changeTodolistFilterAC(newFilter, todoListID2);

    const endState = todoListReducer(startState, action);

    expect(endState[0].filter).toBe('all');
    expect(endState[1].filter).toBe(newFilter);
});
