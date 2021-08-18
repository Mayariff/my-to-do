import React, {ChangeEvent, ChangeEventHandler, KeyboardEvent, useState} from 'react';
import {filterType} from "./App";

export type TaskType = {
    id: string
    name: string
    isDone: boolean

}

type TodolistType = {
    title: string
    task: Array<TaskType>
    removeTask: (id: string) => void
    changeFilter: (value: filterType) => void
    addTasks: (value: string) => void
    ChangeStatusIsDone: (id: string, isDone: boolean) => void
    filter: filterType
}

export function Todolist(props: TodolistType) {

    const [value, setValue] = useState<string>('')
    const [error, setError] = useState<string>("")

    const addTask = () => {
        let trimedValue = value.trim();
        if (trimedValue) {
            props.addTasks(trimedValue);
            setValue('');
        } else {
            setError("Error! Where is task?");
        }
    }

    function onChangeAddTaskHandler(e: ChangeEvent<HTMLInputElement>) {
        setValue(e.currentTarget.value)
    }

    function onKeyPressHandler(e: KeyboardEvent<HTMLInputElement>) {
        setError("");
        {
            if (e.key === 'Enter') {
                addTask()
            }
        }
    }

    const onClickAll = () => {
        props.changeFilter("All")
    }
    const onClickActive = () => {
        props.changeFilter("Active")
    }
    const onClickComplited = () => {
        props.changeFilter("Complited")
    }


    return (
        <div>
            <h2>{props.title}</h2>
            <input value={value}
                   onChange={onChangeAddTaskHandler}
                   onKeyPress={onKeyPressHandler}
                   className={error ? "error" : ""}/>
            <button onClick={addTask}>+</button>
            {error && <div className="errorMessage">{error}</div>}
            <ul>
                {
                    props.task.map(t => {
                        const onRemoveHandler = () => {
                            props.removeTask(t.id)
                        }
                        const onCheckboxHandler = (e: ChangeEvent<HTMLInputElement>) => {
                            props.ChangeStatusIsDone(t.id, e.currentTarget.checked)
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