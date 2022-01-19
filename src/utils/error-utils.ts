import {APPActionsType, setAppErrorAC, setAppStatusAC} from "../app/app-reducer";
import {Dispatch} from "redux";
import {ResponseType} from "../api/todolists-api";



export const handleServerNetworkError =(dispatch: Dispatch<APPActionsType>, message:string)=>{
    dispatch(setAppStatusAC('failed'))
    dispatch(setAppErrorAC(message))
}

export const handleServerAppError =<T>(dispatch: Dispatch<APPActionsType>,data: ResponseType<T>)=>{
        let error = data.messages[0]? data.messages[0]: 'some error'
        dispatch(setAppErrorAC(error))
        dispatch(setAppStatusAC('failed'))

}