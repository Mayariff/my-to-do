import {todolistsAPI, TodolistType} from '../../api/todolists-api'
import {Dispatch} from 'redux'
import {RequestStatusType, setAppStatusAC} from '../../app/app-reducer'
import {createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit";
import {AxiosError} from "axios";
import {handleServerNetworkError} from "../../utils/error-utils";

export const fetchTodolistsTC = createAsyncThunk('todoList/fetchTodoLists',
    async (param, {dispatch, rejectWithValue}) => {
        dispatch(setAppStatusAC({status: 'loading'}))
        const res = await todolistsAPI.getTodolists()
        try {
            dispatch(setAppStatusAC({status: 'succeeded'}))
            return {todolists: res.data}

            //return res.data.forEach(tl => dispatch(fetchTasks(tl.id)))
        }
        catch (er) {
            const error = er as AxiosError
            handleServerNetworkError(error, dispatch)
            return rejectWithValue(null)
        }
    })
export const removeTodolistTC = createAsyncThunk('todoList/removeTodolistTC',
    async (todolistId: string, {dispatch, rejectWithValue}) => {
        dispatch(setAppStatusAC({status: 'loading'}))
        const res = await todolistsAPI.deleteTodolist(todolistId)
        try {
            dispatch(setAppStatusAC({status: 'succeeded'}))
            dispatch(changeTodolistEntityStatusAC({id: todolistId, status: 'loading'}))
            return {id: todolistId}
        }
        catch (er) {
            const error = er as AxiosError
            handleServerNetworkError(error, dispatch)
            return rejectWithValue(null)
        }
    })
export const addTodolistTC = createAsyncThunk('todoList/addTodolistTC',
    async (title: string, {dispatch, rejectWithValue}) => {
        dispatch(setAppStatusAC({status: 'loading'}))
        const res = await todolistsAPI.createTodolist(title)
        try {
            //dispatch(addTodolistAC({todolist: res.data.data.item}))
            dispatch(setAppStatusAC({status:'succeeded'}))
            return {todolist: res.data.data.item}
        }
        catch (er) {
            const error = er as AxiosError
            handleServerNetworkError(error, dispatch)
            return rejectWithValue(null)
        }
    })
export const changeTodolistTitleTC = createAsyncThunk('todoList/changeTodolistTitleTC',
    async (param:{id: string, title: string}, {dispatch, rejectWithValue}) => {
        dispatch(setAppStatusAC({status: 'loading'}))
        const res = await  todolistsAPI.updateTodolist(param.id, param.title)
        try {
            dispatch(setAppStatusAC({status:'succeeded'}))
            return {id: param.id, title: param.title}
        }
        catch (er) {
            const error = er as AxiosError
            handleServerNetworkError(error, dispatch)
            return rejectWithValue(null)
        }
    })



const slice = createSlice({
    name: 'todolists',
    initialState: [] as Array<TodolistDomainType>,
    reducers:{
        /*setTodolistsAC(state, action: PayloadAction<{ todolists: Array<TodolistType> }>){
            return action.payload.todolists.map(tl => ({...tl, filter: 'all', entityStatus: 'idle'}))
        },*/
        /*removeTodolistAC(state, action: PayloadAction<{ id: string }>){
            const index = state.findIndex(tl => tl.id === action.payload.id);
            if (index > -1) {
                state.splice(index, 1);
            }
        },*/
        /*addTodolistAC(state, action: PayloadAction<{ todolist: TodolistType }>){
            state.unshift({...action.payload.todolist, filter: 'all', entityStatus: 'idle',} )
        },*/
      /*  changeTodolistTitleAC(state, action: PayloadAction<{ id: string, title: string}>){
            const index = state.findIndex(tl => tl.id === action.payload.id);
            state[index].title =action.payload.title
        },*/
        changeTodolistFilterAC(state, action: PayloadAction<{ id: string, filter: FilterValuesType}>){
            const index = state.findIndex(tl => tl.id === action.payload.id)
            state[index].filter =action.payload.filter
        },
        changeTodolistEntityStatusAC(state, action: PayloadAction<{ id: string, status: RequestStatusType}>){
            const index = state.findIndex(tl => tl.id === action.payload.id)
            state[index].entityStatus =action.payload.status
        },
        clearDataAC(){
            return []
        },
    },
    extraReducers: (builder) => {
        builder.addCase(fetchTodolistsTC.fulfilled, (state, action) => {
            return action.payload.todolists.map(tl => ({...tl, filter: 'all', entityStatus: 'idle'}))
        });
        builder.addCase(removeTodolistTC.fulfilled, (state, action) => {
            const index = state.findIndex(tl => tl.id === action.payload.id);
            if (index > -1) {
                state.splice(index, 1);
            }
        });
        builder.addCase(addTodolistTC.fulfilled, (state, action) => {
            state.unshift({...action.payload.todolist, filter: 'all', entityStatus: 'idle',} )
        });
        builder.addCase(changeTodolistTitleTC.fulfilled, (state, action) => {
            const index = state.findIndex(tl => tl.id === action.payload.id);
            state[index].title =action.payload.title
        });
    }
})
export const todolistsReducer = slice.reducer;
export const {
    changeTodolistFilterAC,
    changeTodolistEntityStatusAC,clearDataAC} =slice.actions;

/*export const todolistsReducer2 = (state: Array<TodolistDomainType> = initialState, action: ActionsType): Array<TodolistDomainType> => {
    switch (action.type) {
        case 'REMOVE-TODOLIST':
            return state.filter(tl => tl.id !== action.id)
        case 'ADD-TODOLIST':
            return [{...action.todolist, filter: 'all', entityStatus: 'idle'}, ...state]

        case 'CHANGE-TODOLIST-TITLE':
            return state.map(tl => tl.id === action.id ? {...tl, title: action.title} : tl)
        case 'CHANGE-TODOLIST-FILTER':
            return state.map(tl => tl.id === action.id ? {...tl, filter: action.filter} : tl)
        case 'CHANGE-TODOLIST-ENTITY-STATUS':
            return state.map(tl => tl.id === action.id ? {...tl, entityStatus: action.status} : tl)
        case 'SET-TODOLISTS':
            return action.todolists.map(tl => ({...tl, filter: 'all', entityStatus: 'idle'}))
        case "CLEAR-TODOS":
            return  []
        default:
            return state
    }
}*/

// actions
/*export const removeTodolistAC2 = (id: string) => ({type: 'REMOVE-TODOLIST', id} as const)
export const addTodolistAC2 = (todolist: TodolistType) => ({type: 'ADD-TODOLIST', todolist} as const)
export const changeTodolistTitleAC2 = (id: string, title: string) => ({
    type: 'CHANGE-TODOLIST-TITLE',
    id,
    title
} as const)
export const changeTodolistFilterAC2 = (id: string, filter: FilterValuesType) => ({
    type: 'CHANGE-TODOLIST-FILTER',
    id,
    filter
} as const)
export const changeTodolistEntityStatusAC2 = (id: string, status: RequestStatusType) => ({
    type: 'CHANGE-TODOLIST-ENTITY-STATUS', id, status } as const)
export const setTodolistsAC2 = (todolists: Array<TodolistType>) => ({type: 'SET-TODOLISTS', todolists} as const)
export const clearDataAC2 =()=> ({type: 'CLEAR-TODOS'}) as const*/

// thunks
/*export const fetchTodolistsTC = ():AppThunk => {
    return (dispatch) => {
        dispatch(setAppStatusAC({status: 'loading'}))
        todolistsAPI.getTodolists()
            .then((res) => {
                dispatch(setTodolistsAC({todolists: res.data}))
                dispatch(setAppStatusAC({status:'succeeded'}))
                return res.data
            })
            .then( todo=> {
                todo.forEach(tl=> dispatch(fetchTasks(tl.id)) )
                }
            )
    }
}*/
/*export const removeTodolistTC = (todolistId: string) => {
    return (dispatch: Dispatch) => {
        //изменим глобальный статус приложения, чтобы вверху полоса побежала
        dispatch(setAppStatusAC({status:'loading'}))
        //изменим статус конкретного тудулиста, чтобы он мог задизеблить что надо
        dispatch(changeTodolistEntityStatusAC({id: todolistId, status: 'loading'}))
        todolistsAPI.deleteTodolist(todolistId)
            .then((res) => {
                dispatch(removeTodolistAC({id: todolistId}))
                //скажем глобально приложению, что асинхронная операция завершена
                dispatch(setAppStatusAC({status:'succeeded'}))
            })
    }
}*/
/*export const addTodolistTC = (title: string) => {
    return (dispatch: Dispatch) => {
        dispatch(setAppStatusAC({status:'loading'}))
        todolistsAPI.createTodolist(title)
            .then((res) => {
                dispatch(addTodolistAC({todolist: res.data.data.item}))
                dispatch(setAppStatusAC({status:'succeeded'}))
            })
    }
}*/
/*
export const changeTodolistTitleTC = (id: string, title: string) => {
    return (dispatch: Dispatch) => {
        todolistsAPI.updateTodolist(id, title)
            .then((res) => {
                dispatch(changeTodolistTitleAC({id: id, title: title}))
            })
    }
}
*/



// types

/*export type RemoveTodolistActionType = ReturnType<typeof removeTodolistAC>;*/
/*export type SetTodolistsActionType = ReturnType<typeof setTodolistsAC>;*/




export type FilterValuesType = 'all' | 'active' | 'completed';
export type TodolistDomainType = TodolistType & {
    filter: FilterValuesType
    entityStatus: RequestStatusType
}

