import React  from 'react';
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
import  {AddTaskAC, ChangeTaskStatusAC, ChangeTaskTitleAC, RemoveTaskAC} from "./store/task-reduser";
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "./store/store";
import {TasksStateType} from "./App";


export type filterType = "All"|"Active"|'Complited'
export type TodolistType ={
    id: string
    title: string
    filter: filterType
}



function AppWithRedux() {

    let todoList =useSelector<AppRootStateType, Array<TodolistType>>( state=> state.todolists)
    let tasks = useSelector<AppRootStateType, TasksStateType>(state=> state.tasks)

    const dispatch = useDispatch()

    //ф-я для изменения статуса фильтра по нажатию кнопки
    function changeFilter(filter: filterType, todolistID: string){
        dispatch(ChangeFilterAC(filter,todolistID ))
    }

    //удаление тасок
  function removeTask (taskID:string, todolistID: string){
      dispatch(RemoveTaskAC(taskID, todolistID))
  }

    //добавление тасок
    function addTasks(trimedValue:string, todolistID: string){
        dispatch( AddTaskAC(trimedValue, todolistID ))
    }

    //изменяем статус isDone
    function ChangeStatusIsDone(taskID:string, isDone: boolean, todolistID: string){
        dispatch(ChangeTaskStatusAC(taskID, isDone, todolistID) )
    }
    //изменение названия тасок
    function changeTaskTitle (taskID:string, title: string, todolistID: string){
        dispatch(ChangeTaskTitleAC(taskID, title, todolistID) )
    }
    //удаление todoList
    function removeTodoList(todolistID: string){
        let action= RemoveTodolistAC(todolistID)
        dispatch(action)
        dispatch(action)
    }
    //добавление ToDoList
    function addTodolist (title:string){
        dispatch(AddTodolistAC (title))
    }
    //изменение назв ToDoList
    function changeTodolistTitle(title: string, todolistID: string){
        dispatch(ChangeTodolistTitleAC(title,todolistID ))
    }

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
                            let allTodolistTasks = tasks[tl.id];
                            let tasksForTodolist = allTodolistTasks;

                            if (tl.filter === "Active") {
                                tasksForTodolist = allTodolistTasks.filter(t => !t.isDone);
                            }
                            if (tl.filter === 'Complited') {
                                tasksForTodolist = allTodolistTasks.filter(t => t.isDone);
                            }

                            return <Grid item>
                                <Paper style={{padding: "10px"}}>
                                    <Todolist
                                        key={tl.id}
                                        id={tl.id}
                                        title={tl.title}
                                        tasks={tasksForTodolist}
                                        removeTask={removeTask}
                                        changeFilter={changeFilter}
                                        addTasks={addTasks}
                                        ChangeStatusIsDone={ChangeStatusIsDone}
                                        filter={tl.filter}
                                        removeTodoList={removeTodoList}
                                        changeTaskTitle={changeTaskTitle}
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