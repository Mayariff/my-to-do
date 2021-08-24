import React, {useState} from 'react';
import './App.css';
import {TaskType, Todolist} from "./Todolist";
import {v1} from "uuid";

export type filterType = "All"|"Active"|'Complited'
type TodolistType ={
    id: string
    title: string
    filter: filterType
}

type TasksStateType ={
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
            {id: v1(), name: "CSS & HTML", isDone: true},
            {id: v1(), name: "JS", isDone: false},
            {id: v1(), name: "React", isDone: true},
        ],
        [todoListID_2]: [
            {id:  v1(), name: "Lord of rings", isDone: true},
            {id:  v1(), name: "Bolein Sisters", isDone: false},
            {id:  v1(), name: "Omen", isDone: true},
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
      let newTask = {id:v1(), name:trimedValue, isDone:false}
      tasks[todolistID] = [newTask,...tasks[todolistID] ]
        setTasks({...tasks})
    }

    //изменяем статус isDone
    function ChangeStatusIsDone(taskID:string, isDone: boolean, todolistID: string){
        tasks[todolistID] = tasks[todolistID].map( t=> t.id===taskID ? {...t, isDone}: t)
        setTasks({...tasks})
    }

    //удаление todoList
    function removeTodoList(todolistID: string){
        setTodolist(todoList.filter( t=> t.id !== todolistID))
        delete tasks[todolistID]
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
            return (<Todolist id={tl.id}
                              key={tl.id}
                              title={tl.title}
                              tasks={getTasksForRender(tl)}
                              removeTask={removeTask}
                              changeFilter={changeFilter}
                              addTasks={addTasks}
                              ChangeStatusIsDone={ChangeStatusIsDone}
                              filter={tl.filter}
                              removeTodoList={removeTodoList}
            />)
        })

  return (
      <div className={'App'}>
          {todolistComponents}
      </div>
  );
}

export default App;
