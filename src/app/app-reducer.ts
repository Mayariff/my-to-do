import {handleServerAppError, handleServerNetworkError} from "../utils/error-utils";
import {Dispatch} from "redux";
import {authAPI} from "../api/todolists-api";
import {setIsLoggedInAC} from "../features/Login/login-reducer";
import {createSlice, PayloadAction} from "@reduxjs/toolkit";

export const initialState = {
    status: 'idle',
    error: '' ,
    isInitialized: false
}

//immer JS
const slice = createSlice({
    name: 'APP',
    initialState: initialState,
    reducers : {
        setAppStatusAC(state, action: PayloadAction<{status:RequestStatusType}>){
            state.status = action.payload.status
        },
        setAppErrorAC(state, action: PayloadAction<{error: string }>){
            if (state.error !== '') {state.error = action.payload.error}
        },
        setIsInitializedAC(state, action: PayloadAction<{isInitialized: boolean}>){
            state.isInitialized = action.payload.isInitialized
        }
    }
})

export const appReducer= slice.reducer;

export const  {setAppErrorAC, setAppStatusAC, setIsInitializedAC} =slice.actions



export type RequestStatusType = 'idle' | 'loading' | 'succeeded' | 'failed'


export const initializeAppTC = () => (dispatch: Dispatch) => {
    authAPI.me().then(res => {
        if (res.data.resultCode === 0) {
            dispatch(setIsLoggedInAC({value: true}));
        }  else {
            handleServerAppError(res.data, dispatch);
        }
    })
        .catch((error) => {
            handleServerNetworkError(error, dispatch)
        })
        .finally(()=>  dispatch(setIsInitializedAC({isInitialized:true})))
}
