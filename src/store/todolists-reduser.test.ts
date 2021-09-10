import {v1} from 'uuid';
import {filterType, TodolistType} from '../App';
import todolistsReducer, {
    ACTION_TYPE,
    ActionType,
    AddTodolistAC,
    ChangeFilterAC,
    ChangeTodolistTitleAC,
    RemoveTodolistAC
} from "./todolist-reduser";

let startState: Array<TodolistType>
let todolistId1:string
let todolistId2:string

beforeEach(()=>{
    let todolistId1:string= v1();
    let todolistId2: string = v1();

    const startState: Array<TodolistType>= [
        {id: todolistId1, title: "What to learn", filter: "All"},
        {id: todolistId2, title: "What to buy", filter: "All"}
    ]
})

test('correct todolist should be removed', () => {

    const endState = todolistsReducer(startState, RemoveTodolistAC(todolistId1) )
    expect(endState.length).toBe(1);
    expect(endState[0].id).toBe(todolistId2);
});
test('correct todolist should be added', () => {

    let newTodolistTitle = "New Todolist";

    const endState = todolistsReducer(startState, AddTodolistAC(newTodolistTitle))

    expect(endState.length).toBe(3);
    expect(endState[2].title).toBe(newTodolistTitle);
});
test('correct todolist should change its name', () => {
    let newTodolistTitle = "New Todolist";
    const action:ActionType = {
        type: ACTION_TYPE.change_todolistTitle,
        payload:{
            todolistID: todolistId2,
            title: newTodolistTitle, }
    };

    const endState = todolistsReducer(startState, ChangeTodolistTitleAC(newTodolistTitle,todolistId2));

    expect(endState[0].title).toBe("What to learn");
    expect(endState[1].title).toBe(newTodolistTitle);
});
test('correct filter of todolist should be changed', () => {
    let newFilter: filterType = "Complited";

    const action: ActionType = {
        type: ACTION_TYPE.change_filter,
        payload:{todolistID: todolistId2,
        filter: newFilter}
    };

    const endState = todolistsReducer(startState, ChangeFilterAC(newFilter, todolistId2));

    expect(endState[0].filter).toBe("All");
    expect(endState[1].filter).toBe(newFilter);
});
