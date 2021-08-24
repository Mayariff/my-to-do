import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
import {filterType} from "./App";

export type TaskType = {
    id: string
    name: string
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
}

export function Todolist(props: TodolistType) {

    const [value, setValue] = useState<string>('')
    const [error, setError] = useState<string>("")

    const addTask = () => {
        let trimedValue = value.trim();
        if (trimedValue) {
            props.addTasks(trimedValue, props.id);
            setValue('');
        } else {
            setError("Error! Where is task?");
        }
    }
    const removeTodoList=()=> props.removeTodoList(props.id)

    function onChangeAddTaskHandler(e: ChangeEvent<HTMLInputElement>) {
        setValue(e.currentTarget.value)}
    function onKeyPressHandler(e: KeyboardEvent<HTMLInputElement>) {
        setError("");
            if (e.key === 'Enter') {
                addTask()
            }
    }

    const onClickAll = () => props.changeFilter("All", props.id)
    const onClickActive = () => props.changeFilter("Active", props.id)
    const onClickComplited = () => props.changeFilter("Complited", props.id)



    return (
        <div>
            <h2>{props.title} <button onClick={removeTodoList}>x</button></h2>
            <input value={value}
                   onChange={onChangeAddTaskHandler}
                   onKeyPress={onKeyPressHandler}
                   className={error ? "error" : ""}/>
            <button onClick={addTask}>+</button>
            {error && <div className="errorMessage">{error}</div>}
            <ul>
                {
                    props.tasks.map(t => {
                        const onRemoveHandler = () => {
                            props.removeTask(t.id, props.id)
                        }
                        const onCheckboxHandler = (e: ChangeEvent<HTMLInputElement>) => {
                            props.ChangeStatusIsDone(t.id, e.currentTarget.checked, props.id)
                        }
                        return (
                            <li key={t.id} className={t.isDone ? "isDone" : ""}>
                                <input type='checkbox'
                                       onChange={onCheckboxHandler}
                                       checked={t.isDone}/>
                                <span>{t.name}</span>
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