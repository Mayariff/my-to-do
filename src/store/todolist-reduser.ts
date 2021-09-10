import {filterType, TodolistType} from "../App";
import {v1} from "uuid";


export enum ACTION_TYPE {
    remove_todolist = "REMOVE-TODOLIST",
    add_todolist = "ADD_TODOLIST",
    change_todolistTitle = "CHANGE_TODOLIST-TITLE",
    change_filter = "CHANGE_FILTER",
}



export type RemoveTodolistAT = {
    type: ACTION_TYPE.remove_todolist
    payload:{todolistID: string},
}
export type AddTodolistAT = {
    type: ACTION_TYPE.add_todolist,
    payload:{
        title: string
        todolistID:string}
}
type ChangeTodolistTitleAT = {
    type: ACTION_TYPE.change_todolistTitle,
    payload: {title: string, todolistID: string,}
}
type ChangeFilterAT = {
    type: ACTION_TYPE.change_filter
    payload:{filter: filterType,
    todolistID: string,}
}
export type ActionType = RemoveTodolistAT | AddTodolistAT | ChangeTodolistTitleAT | ChangeFilterAT

let initialState:Array<TodolistType> =[]

const todolistsReducer = (state: Array<TodolistType>= initialState, action: ActionType): Array<TodolistType> => {
    switch (action.type) {
        case ACTION_TYPE.remove_todolist:
            return state.filter(t => t.id !== action.payload.todolistID)
        case ACTION_TYPE.add_todolist:
            //const newTodolistID = v1()
            const newTodolist: TodolistType = {
                id: action.payload.todolistID,
                title: action.payload.title,
                filter: "All"
            }
        return [...state, newTodolist]

        case ACTION_TYPE.change_todolistTitle:
            return state.map(t => t.id === action.payload.todolistID ? {...t, title: action.payload.title} : t)
        case ACTION_TYPE.change_filter:
            return state.map(t => t.id === action.payload.todolistID ? {...t, filter: action.payload.filter} : t)
        default:
            return state
    }
};


export default todolistsReducer;

export const RemoveTodolistAC=( todolistID: string):RemoveTodolistAT=>{
   return {type: ACTION_TYPE.remove_todolist, payload: { todolistID } }
}
export const AddTodolistAC = (title: string):AddTodolistAT => {
    return {type: ACTION_TYPE.add_todolist, payload: {title, todolistID:v1()} }
}
export const ChangeTodolistTitleAC=(title: string, todolistID: string):ChangeTodolistTitleAT=>{
    return {type:ACTION_TYPE.change_todolistTitle, payload: {title, todolistID} }
}

export const ChangeFilterAC =(filter: filterType, todolistID: string):ChangeFilterAT =>{
    return {type: ACTION_TYPE.change_filter, payload: {filter, todolistID,}}
}