import React, {useCallback} from 'react';
import './App.css';
import { Todolist} from "./Todolist";
import {AddItemForm} from "./AddItemForm";
import {AppBar, Button, Container, Grid, IconButton, Paper, Toolbar, Typography} from "@material-ui/core";
import {Menu} from "@material-ui/icons";
import  {
    AddTodolistAC,
    ChangeFilterAC,
    ChangeTodolistTitleAC,
    RemoveTodolistAC
} from "./store/todolist-reduser";

import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "./store/store";


export type filterType = "All"|"Active"|'Complited'
export type TodolistType ={
    id: string
    title: string
    filter: filterType
}


function AppWithRedux() {

    let todoList =useSelector<AppRootStateType, Array<TodolistType>>( state=> state.todolists)
    const dispatch = useDispatch()


    //ф-я для изменения статуса фильтра по нажатию кнопки
    const changeFilter = useCallback((filter: filterType, todolistID: string)=>{
        dispatch(ChangeFilterAC(filter,todolistID ))
    },[dispatch])
    //удаление todoList
    const removeTodoList= useCallback((todolistID: string) => {
        let action= RemoveTodolistAC(todolistID)
        dispatch(action)
        dispatch(action)
    }, [dispatch])
    //добавление ToDoList
    const addTodolist = useCallback((title:string)=> {
        dispatch(AddTodolistAC (title))
    },[dispatch])
    //изменение назв ToDoList
    const changeTodolistTitle= useCallback((title: string, todolistID: string)=>{
        dispatch(ChangeTodolistTitleAC(title,todolistID ))
    },[dispatch])

    return (

        <div className="App">
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
            <Container fixed>
                <Grid container style={{padding: "20px"}}>
                    <AddItemForm addItem={addTodolist}/>
                </Grid>
                <Grid container spacing={3}>
                    {
                        todoList.map(tl => {
                            return <Grid item key={tl.id}>
                                <Paper style={{padding: "10px"}}>
                                    <Todolist
                                        key={tl.id}
                                        id={tl.id}
                                        title={tl.title}
                                        changeFilter={changeFilter}
                                       filter={tl.filter}
                                       removeTodoList={removeTodoList}
                                       changeTodolistTitle={changeTodolistTitle}
                                    />
                                </Paper>
                            </Grid>
                        })
                    }
                </Grid>
            </Container>
        </div>
    );
}

export default AppWithRedux;