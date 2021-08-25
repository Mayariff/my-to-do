import React, {ChangeEvent} from 'react';
import {filterType} from "./App";
import {AddItemForm} from "./AddItemForm";
import {EditableSpan} from "./EditableSpan";
import {Button, Card, CardContent, Checkbox, IconButton} from "@material-ui/core";
import {Delete} from "@material-ui/icons";

export type TaskType = {
    id: string
    title: string
    isDone: boolean

}
type TodolistType = {
    id: string
    title: string
    tasks: Array<TaskType>
    removeTask: (id: string, todolistID: string) => void
    changeFilter: (value: filterType, todolistID: string) => void
    addTasks: (value: string, todolistID: string) => void
    ChangeStatusIsDone: (id: string, isDone: boolean, todolistID: string) => void
    filter: filterType
    removeTodoList: (todolistID: string) => void
    changeTaskTitle: (taskID: string, title: string, todolistID: string) => void
    changeTodolistTitle: (title: string, todolistID: string) => void
}

export function Todolist(props: TodolistType) {


    const removeTodoList = () => props.removeTodoList(props.id)

    const onClickAll = () => props.changeFilter("All", props.id)
    const onClickActive = () => props.changeFilter("Active", props.id)
    const onClickComplited = () => props.changeFilter("Complited", props.id)
    const addTask = (title: string) => props.addTasks(title, props.id)
    const changeTodolistTitle = (title: string) => props.changeTodolistTitle(title, props.id)


    return (
        <div>
            <h2>
                <EditableSpan title={props.title} changeTitle={changeTodolistTitle}/>
                <IconButton size={"small"} onClick={removeTodoList}>
                    <Delete/>
                </IconButton>
            </h2>

            <AddItemForm addItem={addTask}/>

            <ul style={{listStyle: 'none', padding: "0"}}>
                {props.tasks.map(t => {
                        const onRemoveHandler = () => props.removeTask(t.id, props.id)
                        const onCheckboxHandler = (e: ChangeEvent<HTMLInputElement>) => props.ChangeStatusIsDone(t.id, e.currentTarget.checked, props.id)
                        const changeTaskTitle = (title: string) => props.changeTaskTitle(t.id, title, props.id)

                        return (<>
                            <li key={t.id}>
                                <Checkbox
                                    color={"primary"}
                                    onChange={onCheckboxHandler}
                                    checked={t.isDone}
                                size={"small"}/>

                                <EditableSpan title={t.title} changeTitle={changeTaskTitle}/>
                                <IconButton size={"small"} onClick={onRemoveHandler}>
                                    <Delete/>
                                </IconButton>
                            </li>
                        </>)
                    })}
            </ul>
            <div>
                <Button variant="contained" size={"small"}
                        color={props.filter === "All" ? 'primary' : "default"}
                        onClick={onClickAll}>
                    All
                </Button>
                <Button
                    style={{margin: "0 5px"}}
                    variant="contained" size={"small"}
                        color={props.filter === "Active" ? 'primary' : "default"}
                        onClick={onClickActive}>
                    Active
                </Button>
                <Button
                    variant="contained" size={"small"}
                        color={props.filter === "Complited" ? 'primary' : "default"}
                        onClick={onClickComplited}>
                    Complited
                </Button>
            </div>
            </div>
    )
}