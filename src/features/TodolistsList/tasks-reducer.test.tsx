import {addTaskTC, fetchTasksTC, removeTaskTC, tasksReducer, TasksStateType, updateTaskTC,} from './tasks-reducer';
import {addTodolistTC, fetchTodolistsTC, removeTodolistTC} from './todolists-reducer';
import {TaskPriorities, TaskStatuses} from '../../api/todolists-api';

let startState: TasksStateType;

beforeEach(() => {
    startState = {
        'todolistId1': [
            {
                id: '1',
                title: 'CSS',
                status: TaskStatuses.New, todoListId: 'todoListID1',
                description: '',
                startDate: '',
                deadline: '',
                addedDate: '',
                order: 0,
                priority: TaskPriorities.Low
            },
            {
                id: '2', title: 'JS', status: TaskStatuses.Completed,
                todoListId: 'todoListID1',
                description: '',
                startDate: '',
                deadline: '',
                addedDate: '',
                order: 0,
                priority: TaskPriorities.Low
            },
            {
                id: '3', title: 'React', status: TaskStatuses.New,
                todoListId: 'todoListID1',
                description: '',
                startDate: '',
                deadline: '',
                addedDate: '',
                order: 0,
                priority: TaskPriorities.Low
            }
        ],
        'todolistId2': [
            {
                id: '1',
                title: 'bread',
                status: TaskStatuses.New, todoListId: 'todolistId2',
                description: '',
                startDate: '',
                deadline: '',
                addedDate: '',
                order: 0,
                priority: TaskPriorities.Low
            },
            {
                id: '2',
                title: 'milk',
                status: TaskStatuses.Completed,
                todoListId: 'todolistId2',
                description: '',
                startDate: '',
                deadline: '',
                addedDate: '',
                order: 0,
                priority: TaskPriorities.Low
            },
            {
                id: '3', title: 'tea', status: TaskStatuses.New, todoListId: 'todolistId2',
                description: '',
                startDate: '',
                deadline: '',
                addedDate: '',
                order: 0,
                priority: TaskPriorities.Low
            }
        ]
    };
})


test('correct task should be deleted from correct array', () => {
    let param = {todoListId: 'todolistId2', taskId: '2'};
    const action = removeTaskTC.fulfilled(param, 'requestId', param);

    const endState = tasksReducer(startState, action)

    expect(endState['todolistId1'].length).toBe(3);
    expect(endState['todolistId2'].length).toBe(2);
    expect(endState['todolistId2'].every(t => t.id != '2')).toBeTruthy();
});


test('correct task should be added to correct array', () => {
    const task = {
        id: '1',
        title: 'juce',
        status: TaskStatuses.New,
        todoListId: 'todolistId2',
        description: '',
        startDate: '',
        deadline: '',
        addedDate: '',
        order: 0,
        priority: TaskPriorities.Low
    }
    const action = addTaskTC.fulfilled(task, 'requestId', {taskTitle: task.title, todolistId: task.todoListId});

    const endState = tasksReducer(startState, action)

    expect(endState['todolistId1'].length).toBe(3);
    expect(endState['todolistId2'].length).toBe(4);
    expect(endState['todolistId2'][0].id).toBeDefined();
    expect(endState['todolistId2'][0].title).toBe('juce');
    expect(endState['todolistId2'][0].status).toBe(TaskStatuses.New);
})


test('status of specified task should be changed', () => {
    const param = {id: '2', model: {status: TaskStatuses.New}, todoListId: 'todolistId2'}
    const action = updateTaskTC.fulfilled(param, 'requestId', {
        taskId: '2',
        domainModel: {status: TaskStatuses.New},
        todolistId: 'todolistId2'
    });
    const endState = tasksReducer(startState, action)

    expect(startState['todolistId2'][1].status).toBe(TaskStatuses.Completed);
    expect(endState['todolistId2'][1].status).toBe(TaskStatuses.New);
});


test('should change title for task', () => {
    const param = {id: '2', model: {title: 'eggs'}, todoListId: 'todolistId2'}
    const action = updateTaskTC.fulfilled(param, 'requestId', {
        taskId: '2',
        domainModel: {status: TaskStatuses.New},
        todolistId: 'todolistId2'
    });
    const endState = tasksReducer(startState, action)

    expect(startState['todolistId2'][1].title).toBe('milk');
    expect(endState['todolistId2'][1].title).toBe('eggs');
});

test('new array should be added when new todolist is added', () => {
    const payload = {
        todolist: {
            id: '1',
            title: 'new todolist',
            addedDate: '',
            order: 0
        }
    };
    const action = addTodolistTC.fulfilled(payload, 'requestId', payload.todolist.title);

    const endState = tasksReducer(startState, action)


    const keys = Object.keys(endState);
    const newKey = keys.find(k => k != 'todolistId1' && k != 'todolistId2');
    if (!newKey) {
        throw Error('new key should be added')
    }

    expect(keys.length).toBe(3);
    expect(endState[newKey]).toEqual([]);
});


test('property with todolistId should be deleted', () => {
    const action = removeTodolistTC.fulfilled({id: 'todolistId2'}, 'requestId', 'todolistId2');

    const endState = tasksReducer(startState, action)

    const keys = Object.keys(endState);

    expect(keys.length).toBe(1);
    expect(endState['todolistId2']).toBeUndefined();
});

test('empty arrays should be added when we set todolists', () => {

    const payload = {
        todolists: [
            {id: '1', title: 'title 1', order: 0, addedDate: ''},
            {id: '2', title: 'title 2', order: 0, addedDate: ''}
        ]
    };
    const action = fetchTodolistsTC.fulfilled(payload, 'requestId')

    const endState = tasksReducer({}, action)

    const keys = Object.keys(endState);

    expect(keys.length).toBe(2);
    expect(endState['1']).toStrictEqual([]);
    expect(endState['2']).toStrictEqual([]);
});


test('tasks should be added for todolist', () => {

    const action = fetchTasksTC.fulfilled({
        tasks: startState['todolistId1'],
        todolistId: 'todolistId1'
    }, 'requestId', 'todolistId1')

    const endState = tasksReducer({
        'todolistId2': [],
        'todolistId1': []
    }, action)


    expect(endState['todolistId1'].length).toBe(3);
    expect(endState['todolistId2'].length).toBe(0);

});


