import {setAppStatusAC} from '../../app/app-reducer'
import {authAPI, fieldErrorType, LoginParamsType} from "../../api/todolists-api";
import {handleServerAppError, handleServerNetworkError} from "../../utils/error-utils";
import {createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit";
import {AxiosError} from "axios";
import {clearDataAC} from "../TodolistsList/todolists-reducer";


export const loginTC = createAsyncThunk<{ isLoggedIn: boolean }, LoginParamsType,
    { rejectValue: { errors: Array<string>, fieldsErrors?: Array<fieldErrorType> } }>
('auth/login', async (param, thunkAPI) => {
    thunkAPI.dispatch(setAppStatusAC({status: 'loading'}))
    try {
        const res = await authAPI.login(param)
        if (res.data.resultCode === 0) {
            //thunkAPI.dispatch(setIsLoggedInAC({value: true}))
            thunkAPI.dispatch(setAppStatusAC({status: 'succeeded'}))
            return {isLoggedIn: true}
        } else {
            handleServerAppError(res.data, thunkAPI.dispatch);
            return thunkAPI.rejectWithValue({errors: res.data.messages, fieldsErrors: res.data.fieldsErrors})
            // return {isLoggedIn: false}
        }
    } catch (er) {
        const error = er as AxiosError

        handleServerNetworkError(error, thunkAPI.dispatch)
        //return {isLoggedIn: false}
        return thunkAPI.rejectWithValue({errors: [error.message], fieldsErrors: undefined})
    }
})
export const logoutTC = createAsyncThunk('auth/logout', async (param, thunkAPI) => {
    thunkAPI.dispatch(setAppStatusAC({status: 'loading'}))
   try {
        const res = await authAPI.logout()
        if (res.data.resultCode === 0) {
            //thunkAPI.dispatch(setIsLoggedInAC({isLoggedIn: false}))
            thunkAPI.dispatch(setAppStatusAC({status: 'succeeded'}))
            thunkAPI.dispatch(clearDataAC())
            return
        } else {
            handleServerAppError(res.data, thunkAPI.dispatch)
            return  thunkAPI.rejectWithValue({})
        }
    }
    catch(er){
        const error = er as AxiosError
            handleServerNetworkError(error, thunkAPI.dispatch)
           return  thunkAPI.rejectWithValue({})
        }
})


const slice = createSlice({
    name: 'login',
    initialState: {
        isLoggedIn: false
    },
    reducers: {
        setIsLoggedInAC(state, action: PayloadAction<{ isLoggedIn: boolean }>) {
            //принимает черновик стейта и экшен. вместо кейсов создаем маленькие редьюссеры
            state.isLoggedIn = action.payload.isLoggedIn
        },

    },
    extraReducers: builder => {
        builder.addCase(loginTC.fulfilled, (state) => {
            state.isLoggedIn = true
        });
        builder.addCase(logoutTC.fulfilled, (state) => {
            state.isLoggedIn = false
        });
    }
});

export const loginReducer = slice.reducer
export const {setIsLoggedInAC} = slice.actions

/*export const loginReducer = (state: InitialStateType = initialState, action: ActionsType): InitialStateType => {
    switch (action.type) {
        case 'login/SET-IS-LOGGED-IN':
            return {...state, isLoggedIn: action.value} //immer js
        default:
            return state
    }
}*/
// actions
/*export const setIsLoggedInAC = (value: boolean) =>
    ({type: 'login/SET-IS-LOGGED-IN', value} as const)*/

// thunks
/*export const _loginTC = (data: LoginParamsType) => (dispatch: Dispatch<ActionsType>) => {
    dispatch(setAppStatusAC({status:'loading'}))
    authAPI.login(data).then(res=> {
        if (res.data.resultCode === 0 ){
            dispatch(setIsLoggedInAC({isLoggedIn: true}))
            dispatch(setAppStatusAC({status:'succeeded'}))
        }else {
            handleServerAppError(res.data, dispatch);
        }
    })
        .catch((error) => {
            handleServerNetworkError(error, dispatch)
        })
}*/
/*
export const _logoutTC = () => (dispatch: Dispatch<ActionsType>) => {
    dispatch(setAppStatusAC({status: 'loading'}))
    authAPI.logout()
        .then(res => {
            if (res.data.resultCode === 0) {
                dispatch(setIsLoggedInAC({isLoggedIn: false}))
                dispatch(setAppStatusAC({status: 'succeeded'}))
                dispatch(clearDataAC())
            } else {
                handleServerAppError(res.data, dispatch)
            }
        })
        .catch((error) => {
            handleServerNetworkError(error, dispatch)
        })
}
*/


// types
//type ActionsType = ReturnType<typeof setIsLoggedInAC> | any
