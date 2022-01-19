import React from 'react'
import './App.css'
import { TodolistsList } from '../features/TodolistsList/TodolistsList'


import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import { Menu } from '@mui/icons-material';
import {LinearProgress} from "@mui/material";
import { RequestStatusType} from "./app-reducer";
import {ErrorSnackbar} from "../components/ErrorSnackbar/ErrorSnackbar";
import {useSelector} from "react-redux";
import {AppRootStateType} from "./store";




function App() {
   const status = useSelector<AppRootStateType, RequestStatusType>(state => state.app.status)
    //const status = useAppSelector<RequestStatusType>(state=> state.app.status)


    return (
        <div className="App">
            <ErrorSnackbar />
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
            </AppBar>
            { status === 'loading' && <LinearProgress color="secondary"/>}
            <Container fixed>
                <TodolistsList/>
            </Container>
        </div>
    )
}

export default App
