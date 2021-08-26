import {filterType, TodolistType} from "../App";
import {v1} from "uuid";

export enum ACTION_TYPE {
    remove_todolist = "REMOVE-TODOLIST",
    add_todolist = "ADD_TODOLIST",
    change_todolistTitle = "CHANGE_TODOLIST-TITLE",
    change_filter = "CHANGE_FILTER",
}



type RemoveTodolistAT = {
    type: "REMOVE-TODOLIST"
    todolistID: string
}
type AddTodolistAT = {
    type: "ADD_TODOLIST"
    title: string
}
type ChangeTodolistTitleAT = {
    type: "CHANGE_TODOLIST-TITLE",
    title: string,
    todolistID: string,
}
type ChangeFilterAT = {
    type: "CHANGE_FILTER",
    filter: filterType,
    todolistID: string
}
export type ActionType = RemoveTodolistAT | AddTodolistAT | ChangeTodolistTitleAT | ChangeFilterAT

const todolistsReducer = (todoLists: Array<TodolistType>, action: ActionType): Array<TodolistType> => {
    switch (action.type) {
        case ACTION_TYPE.remove_todolist:
            return todoLists.filter(t => t.id !== action.todolistID)
        case ACTION_TYPE.add_todolist:
            const newTodolistID = v1()
            const newTodolist: TodolistType = {
                id: newTodolistID,
                title: action.title,
                filter: "All"
            }
            return [...todoLists, newTodolist]
        case ACTION_TYPE.change_todolistTitle:
            return todoLists.map(t => t.id === action.todolistID ? {...t, title: action.title} : t)
        case ACTION_TYPE.change_filter:
            return todoLists.map(t => t.id === action.todolistID ? {...t, filter: action.filter} : t)
        default:
            return todoLists
    }
};

export default todolistsReducer;

export const RemoveTodolistAC=( todolistID: string):RemoveTodolistAT=>{
   return {type: "REMOVE-TODOLIST", todolistID:todolistID}
}
export const AddTodolistAC = (title: string):AddTodolistAT => {
    return {type: "ADD_TODOLIST", title: title}
}
export const ChangeTodolistTitleAC=(title: string, todolistID: string):ChangeTodolistTitleAT=>{
    return {type: "CHANGE_TODOLIST-TITLE", title, todolistID}
}

export const ChangeFilterAC =(filter: filterType, todolistID: string):ChangeFilterAT =>{
    return {type: "CHANGE_FILTER", filter, todolistID}
}