import React, {useEffect} from 'react'
import './App.css'
import {TodolistsList} from '../features/TodolistsList/TodolistsList'
import {useDispatch, useSelector} from 'react-redux'

import {initializeAppTC, RequestStatusType} from './app-reducer'
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import LinearProgress from '@mui/material/LinearProgress';
import {Menu} from '@mui/icons-material';
import {ErrorSnackbar} from '../components/ErrorSnackbar/ErrorSnackbar'
import {Navigate, Route, Routes} from "react-router-dom";
import {Login} from "../features/Login/Login";
import {logoutTC} from "../features/Login/login-reducer";
import {CircularProgress} from "@material-ui/core";
import { AppRootStateType } from './store'


type PropsType = {
    demo?: boolean
}

function App({demo = false}: PropsType) {

    const status = useSelector<AppRootStateType, RequestStatusType>((state) => state.app.status as RequestStatusType )
    const  isInitialized=  useSelector<AppRootStateType, boolean>((state) => state.app.isInitialized)
    const  isLoggedIn=  useSelector<AppRootStateType, boolean>((state) => state.login.isLoggedIn)
    const dispatch =useDispatch()

    useEffect( ()=> {
        dispatch(initializeAppTC())
    }, [dispatch])
    if(!isInitialized){
         return <div
            style={{position: 'fixed', top: '30%', textAlign: 'center', width: '100%'}}>
            <CircularProgress/>
        </div>
    }
    const onClickHendler =()=> {
        dispatch(logoutTC())
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
                    {isLoggedIn && <Button color="inherit" onClick={onClickHendler}>Logout</Button>}
                </Toolbar>
                {status === 'loading' && <LinearProgress/>}
            </AppBar>
            <Container fixed>
               <Routes >
                    <Route path='/' element={<TodolistsList demo={demo}/>} />
                   <Route path='my-to-do' element={<TodolistsList demo={demo}/>} />
                    <Route path='login' element={<Login />} />
                   <Route path="404" element={<h1>404: PAGE NOT FOUND</h1>}/>
                  <Route path="/*" element={<Navigate to={"/404"} />}/>
                   {/*<Route path={`/${params}`} element={<Todolist demo={demo}/> }  />*/}
                </Routes>
            </Container>
        </div>
    )
}

export default App
