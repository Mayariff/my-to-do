import {handleServerAppError, handleServerNetworkError} from "../utils/error-utils";
import {Dispatch} from "redux";
import {authAPI} from "../api/todolists-api";
import {setIsLoggedInAC} from "../features/Login/login-reducer";
import {createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit";
import {AxiosError} from "axios";

export const initializeAppTC = createAsyncThunk('app/initializeApp', async (param, {dispatch}) => {
    dispatch(setAppStatusAC({status: 'loading'}))
    try{
        const res = await authAPI.me()
        if (res.data.resultCode === 0) {
            dispatch(setIsLoggedInAC({isLoggedIn: true}));
            dispatch(setAppStatusAC({status: 'succeeded'}))
        } else {
            handleServerAppError(res.data, dispatch)
        }
    }
    catch(er){
        const error = er as AxiosError
        handleServerNetworkError(error, dispatch)

    }
})


//immer JS
const slice = createSlice({
    name: 'APP',
    initialState: {
        status: 'idle',
        error: '',
        isInitialized: false
    },
    reducers: {
        setAppStatusAC(state, action: PayloadAction<{ status: RequestStatusType }>) {
            state.status = action.payload.status
        },
        setAppErrorAC(state, action: PayloadAction<{ error: string }>) {
            if (state.error !== '') {
                state.error = action.payload.error
            }
        },
    },
    extraReducers: builder => {
        builder.addCase(initializeAppTC.fulfilled, (state) => {
            state.isInitialized = true
        });
    }
})

export const appReducer = slice.reducer;
export const {setAppErrorAC, setAppStatusAC} = slice.actions


export type RequestStatusType = 'idle' | 'loading' | 'succeeded' | 'failed'


/*export const _initializeAppTC = () => (dispatch: Dispatch) => {
    authAPI.me().then(res => {
        if (res.data.resultCode === 0) {
            dispatch(setIsLoggedInAC({isLoggedIn: true}));
        } else {
            handleServerAppError(res.data, dispatch);
        }
    })
        .catch((error) => {
            handleServerNetworkError(error, dispatch)
        })
        .finally(() => dispatch(setIsInitializedAC({isInitialized: true})))
}*/

export type SetAppErrorActionType = ReturnType<typeof setAppErrorAC>
export type SetAppStatusActionType = ReturnType<typeof setAppStatusAC>


