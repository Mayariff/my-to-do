import React, {useState} from 'react';
import './App.css';
import {TaskType, Todolist} from "./Todolist";
import {v1} from "uuid";

export type filterType = "All"|"Active"|'Complited'

function App() {

   /* let task: Array<TaskType> = [
        {id:1, name:"CSS & HTML", isDone:true},
        {id:2, name:"JS", isDone:false},
        {id:3, name:"React", isDone:true}
    ]*/
    let [task,setTask]=useState<Array<TaskType>>(
        [
            {id:v1(), name:"CSS & HTML", isDone:true},
            {id:v1(), name:"JS", isDone:false},
            {id:v1(), name:"React", isDone:true}
        ]
    )
    let[filter,setFilter]=useState<filterType>('All')

    //ф-я для изменения статуса фильтра по нажатию кнопки
    function changeFilter(value:filterType){
        setFilter(value)
    }


    /*let task2: Array<TaskType>= [
        {id:1, name:"Lord of rings", isDone: true},
        {id:2, name:"Bolein Sisters", isDone: false},
        {id:3, name:"Omen", isDone: true}
    ]*/
    //удаление тасок
  function removeTask (id:string){
     let filteredTask = task.filter( t => id!==t.id)
      setTask(filteredTask)
  }

    //добавление тасок
    function addTasks(trimedValue:string){
      let newTask = {id:v1(), name:trimedValue, isDone:false}
        let tasksNew = [newTask,...task]
        setTask(tasksNew)
    }

    //изменяем статус isDone
    function ChangeStatusIsDone(id:string, isDone: boolean){
     let findedtask = task.find( t=> id===t.id )
        if(findedtask){
          findedtask.isDone = isDone
        }
        let copyTask =[...task];
        setTask(copyTask);
    }

    // фильтруем таски для 3х кнопок
  let taskForToDoList= task
        if (filter==="Active") {
            taskForToDoList = task.filter(t => t.isDone)
        }
        if (filter=== "Complited") {
            taskForToDoList = task.filter(t => !t.isDone)}


  return (
      <div className={'App'}>
        <Todolist title="What to learn"
                  task={taskForToDoList}
                  removeTask={removeTask}
                  changeFilter={changeFilter}
                  addTasks={addTasks}
                  ChangeStatusIsDone ={ChangeStatusIsDone}
                  filter ={filter}
        />

      </div>
  );
}

export default App;
