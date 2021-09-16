
import React, {useReducer} from 'react';
import './App.css';
import {Todolist} from "./Todolist";
import {v1} from "uuid";
import {AddItemForm} from "./AddItemForm";
import {AppBar, Button, Container, Grid, IconButton, Paper, Toolbar, Typography} from "@material-ui/core";
import {Menu} from "@material-ui/icons";
import todolistsReducer, {
    AddTodolistAC,
    ChangeFilterAC,
    ChangeTodolistTitleAC,
    RemoveTodolistAC
} from "./store/todolist-reduser";
import tasksReducer, {AddTaskAC, ChangeTaskStatusAC, ChangeTaskTitleAC, RemoveTaskAC} from "./store/task-reduser";


export type filterType = "All"|"Active"|'Complited'
export type TodolistType ={
    id: string
    title: string
    filter: filterType
}



/*function AppWithReducers() {

    const todoListID_1= v1()
    const todoListID_2= v1()

    const  [todoList, dispatchTodolist] = useReducer(todolistsReducer,
        [
        {id: todoListID_1, title: "what to learn", filter: "All"},
        {id: todoListID_2, title: "what to read", filter: "Active"}
    ])


    const [tasks, dispatchTasks]= useReducer(tasksReducer, {
        [todoListID_1]:[
            {id: v1(), title: "CSS & HTML", isDone: true},
            {id: v1(), title: "JS", isDone: false},
            {id: v1(), title: "React", isDone: true},
        ],
        [todoListID_2]: [
            {id:  v1(), title: "Lord of rings", isDone: true},
            {id:  v1(), title: "Bolein Sisters", isDone: false},
            {id:  v1(), title: "Omen", isDone: true},
        ],
    })

    //ф-я для изменения статуса фильтра по нажатию кнопки
    function changeFilter(filter: filterType, todolistID: string){
        dispatchTodolist(ChangeFilterAC(filter,todolistID ))
    }

    //удаление тасок
  function removeTask (taskID:string, todolistID: string){
      dispatchTasks(RemoveTaskAC(taskID, todolistID))
  }

    //добавление тасок
    function addTasks(trimedValue:string, todolistID: string){
        dispatchTasks( AddTaskAC(trimedValue, todolistID ))
    }

    //изменяем статус isDone
    function ChangeStatusIsDone(taskID:string, isDone: boolean, todolistID: string){
        dispatchTasks(ChangeTaskStatusAC(taskID, isDone, todolistID) )
    }
    //изменение названия тасок
    function changeTaskTitle (taskID:string, title: string, todolistID: string){
        dispatchTasks(ChangeTaskTitleAC(taskID, title, todolistID) )
    }
    //удаление todoList
    function removeTodoList(todolistID: string){
        let action= RemoveTodolistAC(todolistID)
        dispatchTodolist(action)
        dispatchTasks(action)
    }
    //добавление ToDoList
    function addTodolist (title:string){
        dispatchTodolist(AddTodolistAC (title))
    }
    //изменение назв ToDoList
    function changeTodolistTitle(title: string, todolistID: string){
        dispatchTodolist(ChangeTodolistTitleAC(title,todolistID ))
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
                                tasksForTodolist = allTodolistTasks.filter(t => t.isDone === false);
                            }
                            if (tl.filter === 'Complited') {
                                tasksForTodolist = allTodolistTasks.filter(t => t.isDone === true);
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
}*/

/*export default AppWithReducers;*/
