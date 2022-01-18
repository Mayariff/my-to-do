import {todolistsAPI, TodolistType} from '../api/todolists-api'
import {Dispatch} from "redux";

export type RemoveTodolistActionType = {
    type: 'REMOVE-TODOLIST',
    id: string
}
export type AddTodolistActionType = {
    type: 'ADD-TODOLIST',
    //title: string
    //todolistId: string
    todolist: TodolistType
}
export type ChangeTodolistTitleActionType = {
    type: 'CHANGE-TODOLIST-TITLE',
    id: string
    title: string
}
export type ChangeTodolistFilterActionType = {
    type: 'CHANGE-TODOLIST-FILTER',
    id: string
    filter: FilterValuesType
}

export type setTodolistActionType ={
    type: "SET-TODOLISTS",
    todolists: Array<TodolistType>
}

type ActionsType = RemoveTodolistActionType | AddTodolistActionType
    | ChangeTodolistTitleActionType
    | ChangeTodolistFilterActionType
    |setTodolistActionType

const initialState: Array<TodolistDomainType> = [
    /*{id: todolistId1, title: 'What to learn', filter: 'all', addedDate: '', order: 0},
    {id: todolistId2, title: 'What to buy', filter: 'all', addedDate: '', order: 0}*/
]

export type FilterValuesType = 'all' | 'active' | 'completed';
export type TodolistDomainType = TodolistType & {
    filter: FilterValuesType
}

export const todolistsReducer = (state: Array<TodolistDomainType> = initialState, action: ActionsType): Array<TodolistDomainType> => {
    switch (action.type) {

        case 'REMOVE-TODOLIST': {
            return state.filter(tl => tl.id !== action.id)
        }
        case 'ADD-TODOLIST': {
            let newTodo:TodolistDomainType = {...action.todolist, filter: 'all'}
            return [ newTodo, ...state]
           /* return [{
                id: action.todolistId,
                title: action.title,
                filter: 'all',
                addedDate: '',
                order: 0
            }, ...state]*/
        }
        case 'CHANGE-TODOLIST-TITLE': {
            const todolist = state.find(tl => tl.id === action.id);
            if (todolist) {
                // если нашёлся - изменим ему заголовок
                todolist.title = action.title;
            }
            return [...state]
        }
        case 'CHANGE-TODOLIST-FILTER': {
            const todolist = state.find(tl => tl.id === action.id);
            if (todolist) {
                // если нашёлся - изменим ему заголовок
                todolist.filter = action.filter;
            }
            return [...state]
        }
        case "SET-TODOLISTS":
            return action.todolists.map(tl=> ({...tl, filter: 'all'}) )
        default:
            return state;
    }
}

export const removeTodolistAC = (todolistId: string): RemoveTodolistActionType => {
    return {type: 'REMOVE-TODOLIST', id: todolistId}
}
//export const addTodolistAC = (title: string): AddTodolistActionType => {
   // return {type: 'ADD-TODOLIST', title: title, todolistId: v1()}
//}

export const addTodolistAC = (todolist: TodolistType): AddTodolistActionType=> {
    return {type: 'ADD-TODOLIST', todolist}
}
export const changeTodolistTitleAC = (id: string, title: string): ChangeTodolistTitleActionType => {
    return {type: 'CHANGE-TODOLIST-TITLE', id: id, title: title}
}
export const changeTodolistFilterAC = (id: string, filter: FilterValuesType): ChangeTodolistFilterActionType => {
    return {type: 'CHANGE-TODOLIST-FILTER', id: id, filter: filter}
}

export const setTodolistAC= (todolists: TodolistType[]):setTodolistActionType =>({type: "SET-TODOLISTS",todolists })

export const setTodolistsThunk=(dispatch:Dispatch)=>{
    todolistsAPI.getTodolists()
        .then(res=> dispatch(setTodolistAC(res.data)))
}

export const removeTodolistAT=(todolistId: string)=>(dispatch: Dispatch)=>{
    todolistsAPI.deleteTodolist(todolistId)
        .then( res=> dispatch(removeTodolistAC(todolistId)))
}


export const addTodolistAT =(title: string)=>(dispatch: Dispatch)=>{
    todolistsAPI.createTodolist(title)
        .then(res=> {
            let todolist = res.data.data.item
            dispatch(addTodolistAC(todolist))
        }
   )
}

export const changeTodolistTitleAT =(id: string, title: string)=>(dispatch: Dispatch)=>{
    todolistsAPI.updateTodolist(id, title)
        .then(res=> dispatch(changeTodolistTitleAC(id, title)))
}