import {Dispatch} from 'redux'
import {authAPI} from '../api/todolists-api';
import {setIsLoggedInAC} from '../features/Login/auth-reducer';
import {createSlice, PayloadAction} from '@reduxjs/toolkit';

const initialState: InitialStateType = {
    status: 'idle',
    error: null,
    isInitialized: false
}

const slice = createSlice({
    name: 'app',
    initialState : initialState,
    reducers : {
        setAppErrorAC(state, action : PayloadAction<{error: string | null}>){
            state.error = action.payload.error
        },
        setAppStatusAC(state,action : PayloadAction<{status : RequestStatusType}>){
            state.status = action.payload.status
        },
        setIsInitializedAC(state,action : PayloadAction<{isInitialized: boolean}>) {
            state.isInitialized = action.payload.isInitialized
        }
    }
})

export const appReducer = slice.reducer
export const {setAppErrorAC,setAppStatusAC,setIsInitializedAC} = slice.actions

//thunks
export const initializeAppTC = () => (dispatch: Dispatch) => {
    authAPI.me().then(res => {
        if (res.data.resultCode === 0) {
            dispatch(setIsLoggedInAC({value : true}));
        } else {
        }
        dispatch(setIsInitializedAC({isInitialized: true}))
    })
}

//types
export type SetAppErrorActionType = ReturnType<typeof setAppErrorAC>;
export type SetAppStatusActionType = ReturnType<typeof setAppStatusAC>;
export type SetAppInitActionType = ReturnType<typeof setIsInitializedAC>;
export type RequestStatusType = 'idle' | 'loading' | 'succeeded' | 'failed'
export type InitialStateType = {
    status: RequestStatusType
    // происходит ли сейчас взаимодействие с сервером
    error: string | null
    isInitialized: boolean
}
