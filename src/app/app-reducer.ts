import { Dispatch } from "redux"
import {authAPI} from '../api/todolists-api';
import {setIsLoggedInAC} from '../features/Login/auth-reducer';

const initialState: InitialStateType = {
    status: 'idle',
    error: null,
    isInitialized: false
}

export const appReducer = (state: InitialStateType = initialState, action: ActionsType): InitialStateType => {
    switch (action.type) {
        case 'APP/SET-STATUS':
            return {...state, status: action.status}
        case 'APP/SET-ERROR':
            return {...state, error: action.error}
        case 'APP/SET-APP-INITIALIZED':
            return  {...state,isInitialized: true}
        default:
            return state
    }
}

//actions
export const setAppErrorAC = (error: string | null) => ({type: 'APP/SET-ERROR',error} as const)
export const setAppStatusAC = (status: RequestStatusType) => ({type: 'APP/SET-STATUS',status} as const)
export const setIsInitializedAC  = () => ({type: 'APP/SET-APP-INITIALIZED',} as const)

//thunks
export const initializeAppTC = () => (dispatch: Dispatch) => {
    authAPI.me().then(res => {
        if (res.data.resultCode === 0) {
            dispatch(setIsLoggedInAC(true));
        } else {
        }
        dispatch(setIsInitializedAC())
    })
}

//types
export type SetAppErrorActionType = ReturnType<typeof setAppErrorAC>;
export type SetAppStatusActionType = ReturnType<typeof setAppStatusAC>;
export type SetAppInitActionType = ReturnType<typeof setIsInitializedAC>;
type ActionsType =
    | SetAppErrorActionType
    | SetAppStatusActionType
    | SetAppInitActionType
export type RequestStatusType = 'idle' | 'loading' | 'succeeded' | 'failed'
export type InitialStateType = {
    status: RequestStatusType
    // происходит ли сейчас взаимодействие с сервером
    error: string | null
    isInitialized: boolean
}
