import { Dispatch } from 'redux'
import { setAppStatusAC } from '../../app/app-reducer'
import {authAPI, LoginParamsType} from "../../api/todolists-api";
import {handleServerAppError, handleServerNetworkError} from "../../utils/error-utils";
import {clearDataAC} from "../TodolistsList/todolists-reducer";
import {createSlice, PayloadAction} from "@reduxjs/toolkit";

const initialState = {
    isLoggedIn: false
}
//type InitialStateType = typeof initialState

const slice = createSlice({
    name: 'login',
    initialState: initialState,
    reducers: {
        setIsLoggedInAC(stateDraft, action: PayloadAction<{value: boolean}>){
            //принимает черновик стейта и экшен. вместо кейсов создаем маленькие редьюссеры
           stateDraft.isLoggedIn =  action.payload.value
        }
    }
})

export const loginReducer= slice.reducer
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
export const loginTC = (data: LoginParamsType) => (dispatch: Dispatch<ActionsType>) => {
    dispatch(setAppStatusAC({status:'loading'}))
    authAPI.login(data).then(res=> {
        if (res.data.resultCode === 0 ){
            dispatch(setIsLoggedInAC({value: true}))
            dispatch(setAppStatusAC({status:'succeeded'}))
        }else {
            handleServerAppError(res.data, dispatch);
        }
    })
        .catch((error) => {
            handleServerNetworkError(error, dispatch)
        })


}
export const logoutTC = () => (dispatch: Dispatch<ActionsType>) => {
    dispatch(setAppStatusAC({status:'loading'}))
    authAPI.logout()
        .then(res => {
            if (res.data.resultCode === 0) {
                dispatch(setIsLoggedInAC({value: false}))
                dispatch(setAppStatusAC({status:'succeeded'}))
                dispatch(clearDataAC())
            } else {
                handleServerAppError(res.data, dispatch)
            }
        })
        .catch((error) => {
            handleServerNetworkError(error, dispatch)
        })
}


// types
type ActionsType = ReturnType<typeof setIsLoggedInAC> | any
