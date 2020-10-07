import React from 'react';
import './App.css';
import {Menu} from '@material-ui/icons';
import {AppBar, Button, Container, IconButton, Toolbar, Typography, LinearProgress} from '@material-ui/core';
import {TodolistsList} from '../features/TodolistsList/TodolistsList';
import {ErrorSnackbar} from '../components/ErrorSnackbar/ErrorSnackbar';
import {useSelector} from 'react-redux';
import {AppRootStoreType} from './store';
import {RequestStatusType} from './app-reducer';


type PropsType = {
    demo?: boolean
}


function App({demo = false,...props}:PropsType) {

    const status = useSelector<AppRootStoreType, RequestStatusType>(state => state.app.status)

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
                    <Button color="inherit">Login</Button>
                </Toolbar>
                {status === 'loading' && <LinearProgress/>}
            </AppBar>
            <Container fixed>
                <TodolistsList demo={demo}/>
            </Container>
        </div>
    );
}


export default App;
