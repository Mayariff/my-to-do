export type RequestStatusType = 'idle' | 'loading' | 'succeeded' | 'failed'
export type ErrorType = string| null

const initialState = {
    status: 'idle' as RequestStatusType,
    error : null  as ErrorType
}

type InitialStateType = typeof initialState

export const appReducer = (state: InitialStateType = initialState, action: APPActionsType): InitialStateType => {
    switch (action.type) {
        case 'APP/SET-STATUS':
            return {...state, status: action.status}
        case 'APP/SET-ERROR':
            return  {...state, error: action.error}

        default:
            return state
    }
}

export const setAppStatusAC =(status: RequestStatusType)=>( {type: 'APP/SET-STATUS', status}) as const
export const setAppErrorAC =(error: ErrorType)=>( {type: 'APP/SET-ERROR', error}) as const

export type   setAppStatusAT = ReturnType<typeof setAppStatusAC>

export type APPActionsType = setAppStatusAT | ReturnType<typeof setAppErrorAC>