import React, {ChangeEvent} from 'react';
import {filterType} from "./App";
import {AddItemForm} from "./AddItemForm";
import {EditableSpan} from "./EditableSpan";

export type TaskType = {
    id: string
    title: string
    isDone: boolean

}
type TodolistType = {
    id: string
    title: string
    tasks: Array<TaskType>
    removeTask: (id: string,todolistID: string) => void
    changeFilter: (value: filterType,todolistID: string) => void
    addTasks: (value: string,todolistID: string) => void
    ChangeStatusIsDone: (id: string, isDone: boolean, todolistID: string) => void
    filter: filterType
    removeTodoList: (todolistID: string)=> void
    changeTaskTitle: (taskID:string, title: string, todolistID: string)=>void
    changeTodolistTitle: (title: string, todolistID: string)=>void
}

export function Todolist(props: TodolistType) {



    const removeTodoList=()=> props.removeTodoList(props.id)

    const onClickAll = () => props.changeFilter("All", props.id)
    const onClickActive = () => props.changeFilter("Active", props.id)
    const onClickComplited = () => props.changeFilter("Complited", props.id)
    const addTask = (title:string) => props.addTasks(title, props.id)
    const changeTodolistTitle =(title: string)=> props.changeTodolistTitle(title, props.id)


    return (
        <div>
            <h2>
                <EditableSpan title={props.title} changeTitle={changeTodolistTitle}/>
                <button onClick={removeTodoList}>x</button></h2>
            <AddItemForm addItem={addTask} />

            <ul>
                {
                    props.tasks.map(t => {
                        const onRemoveHandler = () => props.removeTask(t.id, props.id)
                        const onCheckboxHandler = (e: ChangeEvent<HTMLInputElement>) => props.ChangeStatusIsDone(t.id, e.currentTarget.checked, props.id)
                        const changeTaskTitle= (title: string)=> props.changeTaskTitle(t.id,title, props.id)

                        return (
                            <li key={t.id} className={t.isDone ? "isDone" : ""}>
                                <input type='checkbox'
                                       onChange={onCheckboxHandler}
                                       checked={t.isDone}/>
                                <EditableSpan title={t.title} changeTitle={changeTaskTitle}/>
                                <button onClick={onRemoveHandler}>x</button>
                            </li>
                        )
                    })
                }
            </ul>
            <div>
                <button onClick={onClickAll} className={props.filter === "All" ? 'activeFilter' : ""}>All</button>
                <button onClick={onClickActive} className={props.filter === "Active" ? 'activeFilter' : ""}>Active
                </button>
                <button onClick={onClickComplited}
                        className={props.filter === "Complited" ? 'activeFilter' : ""}> Complited
                </button>
            </div>
        </div>
    )
}