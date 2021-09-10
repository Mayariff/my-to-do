import React, {useState} from 'react';
import './App.css';
import {TaskType, Todolist} from "./Todolist";
import {v1} from "uuid";
import {AddItemForm} from "./AddItemForm";
import {AppBar, Button, Container, Grid, IconButton, Paper, Toolbar, Typography} from "@material-ui/core";
import {Menu} from "@material-ui/icons";


export type filterType = "All"|"Active"|'Complited'
export type TodolistType ={
    id: string
    title: string
    filter: filterType
}

export  type TasksStateType ={
    [key:string]: Array<TaskType>
}


function App() {

    const todoListID_1= v1()
    const todoListID_2= v1()

    const  [todoList, setTodolist] = useState<Array<TodolistType>>([
        {id: todoListID_1, title: "what to learn", filter: "All"},
        {id: todoListID_2, title: "what to read", filter: "Active"}
    ])


    const [tasks, setTasks]= useState<TasksStateType>({
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
        setTodolist( todoList.map(t=> t.id === todolistID ? {...t, filter} : t) )
    }

    //удаление тасок
  function removeTask (taskID:string, todolistID: string){
        tasks[todolistID] = tasks[todolistID].filter(t => taskID!==t.id)
      setTasks({...tasks})
  }

    //добавление тасок
    function addTasks(trimedValue:string, todolistID: string){
      let newTask = {id:v1(), title:trimedValue, isDone:false}
      tasks[todolistID] = [newTask,...tasks[todolistID] ]
        setTasks({...tasks})
    }

    //изменяем статус isDone
    function ChangeStatusIsDone(taskID:string, isDone: boolean, todolistID: string){
        tasks[todolistID] = tasks[todolistID].map( t=> t.id===taskID ? {...t, isDone}: t)
        setTasks({...tasks})
    }
    //изменение названия тасок
    function changeTaskTitle (taskID:string, title: string, todolistID: string){
        tasks[todolistID] = tasks[todolistID].map( t=> t.id===taskID? {...t, title}: t)
        setTasks({...tasks})}
    //удаление todoList
    function removeTodoList(todolistID: string){
        setTodolist(todoList.filter( t=> t.id !== todolistID))
        delete tasks[todolistID]
        setTasks({...tasks})
    }
    //добавление ToDoList
    function addTodolist (title:string){
        const newTodolistID=v1()
        const newTodolist:TodolistType ={
        id: newTodolistID,
        title,
        filter: "All"
        }
        setTodolist([...todoList, newTodolist])
        setTasks({[newTodolistID]:[],...tasks})
    }
    //изменение назв ToDoList
    function changeTodolistTitle(title: string, todolistID: string){
        setTodolist( todoList.map(t=> t.id === todolistID ? {...t, title} : t) )
    }
    // фильтруем таски для 3х кнопок
    const getTasksForRender =(todoList: TodolistType)=>{
        switch (todoList.filter) {
            case 'Complited':
                return  tasks[todoList.id].filter(t => !t.isDone)
            case "Active":
                return  tasks[todoList.id].filter(t => t.isDone)
            default:
                return tasks[todoList.id]
        }
    }
    // рисуем компоненту (просто вынесена для читабельности)
    const todolistComponents = todoList.map(tl=> {
            return (<Grid item key={tl.id}>
                <Paper style={{padding: "15px"}} elevation={4}>
                <Todolist id={tl.id}
                              title={tl.title}
                              tasks={getTasksForRender(tl)}
                              removeTask={removeTask}
                              changeFilter={changeFilter}
                              addTasks={addTasks}
                              ChangeStatusIsDone={ChangeStatusIsDone}
                              filter={tl.filter}
                              removeTodoList={removeTodoList}
                              changeTaskTitle ={changeTaskTitle}
                              changeTodolistTitle={changeTodolistTitle}/>
                </Paper>
            </Grid>)
        })

  return (
      <div className={'App'}>
          <AppBar position="static">
              <Toolbar style={{justifyContent: "space-between"}}>
                  <IconButton edge="start" color="inherit" aria-label="menu">
                      <Menu />
                  </IconButton>
                  <Typography variant="h6" >
                      toDoList's
                  </Typography>
                  <Button color="inherit"
                   variant={"outlined"}>Login</Button>
              </Toolbar>
          </AppBar>
          <Container fixed>
              <Grid container
              style={{padding: "15px 0"}}>
                  <AddItemForm addItem={addTodolist}/>
              </Grid>
              <Grid container spacing={5}>
                  {todolistComponents}
              </Grid>
          </Container>
      </div>
  );
}

export default App;