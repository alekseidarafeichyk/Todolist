import React, {useCallback, useEffect,} from 'react';
import './App.css';
import {Menu} from '@material-ui/icons';
import {
    AppBar,
    Button,
    Container,
    IconButton,
    Toolbar,
    Typography,
    LinearProgress,
    CircularProgress
} from '@material-ui/core';
import {TodolistsList} from '../features/TodolistsList/TodolistsList';
import {ErrorSnackbar} from '../components/ErrorSnackbar/ErrorSnackbar';
import {useDispatch, useSelector} from 'react-redux';
import {AppRootStoreType} from './store';
import {initializeAppTC, RequestStatusType} from './app-reducer';
import { Route,Switch,Redirect } from 'react-router-dom';
import {Login} from '../features/Login/Login';
import {logoutTC} from '../features/Login/auth-reducer';

type PropsType = {
    demo?: boolean
}

function App({demo = false,...props}:PropsType) {

    const status = useSelector<AppRootStoreType, RequestStatusType>(state => state.app.status)
    const isInitialized = useSelector<AppRootStoreType, boolean>(state => state.app.isInitialized)
    const isLoggedIn = useSelector<AppRootStoreType, boolean>(state => state.auth.isLoggedIn)
    const dispatch = useDispatch()

    useEffect(()=>{
        dispatch(initializeAppTC())
    },[])

    const logoutHandler = useCallback(()=>{
        dispatch(logoutTC())
    },[])

    if (!isInitialized) {
        return <div
            style={{position: 'fixed', top: '30%', textAlign: 'center', width: '100%'}}>
            <CircularProgress/>
        </div>
    }

    return (
        <div className="App">
            <ErrorSnackbar/>
            <AppBar position="static">
                <Toolbar>
                    <IconButton edge="start" color="inherit" aria-label="menu">
                        <Menu/>
                    </IconButton>
                    <Typography variant="h6">
                        News
                    </Typography>

                    {isLoggedIn &&   <Button color="inherit"
                                             onClick={logoutHandler}
                    >Log Out</Button>}
                </Toolbar>
                {status === 'loading' && <LinearProgress/>}
            </AppBar>
            <Container fixed>
                <Switch>
                    <Route exact path={'/'} render={() => <TodolistsList demo={demo}/>}/>
                    <Route path={'/login'} render={() => <Login/>}/>
                    <Route path={'*'} render={() => <h1>404</h1>}/>

                    {/*<Route path={'/404'} render={() => <h1>404</h1>}/>*/}
                    {/*<Redirect from={'*'} to={'/404'}/>*/}
                </Switch>
            </Container>
        </div>
    );
}

export default App;
