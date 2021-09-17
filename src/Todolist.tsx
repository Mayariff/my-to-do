import React, {useCallback} from 'react';
import {filterType} from "./App";
import {AddItemForm} from "./AddItemForm";
import {EditableSpan} from "./EditableSpan";
import {Button, IconButton} from "@material-ui/core";
import {Delete} from "@material-ui/icons";
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "./store/store";

import {AddTaskAC, ChangeTaskStatusAC, ChangeTaskTitleAC, RemoveTaskAC} from "./store/task-reduser";
import Task from "./Task";


export type TaskType = {
    id: string
    title: string
    isDone: boolean

}
type TodolistType = {
    id: string
    title: string
    changeFilter: (value: filterType, todolistID: string) => void
    filter: filterType
    removeTodoList: (todolistID: string) => void
    changeTodolistTitle: (title: string, todolistID: string) => void
}

export const Todolist = React.memo((props: TodolistType) => {

    let tasks = useSelector<AppRootStateType, Array<TaskType>>(state => state.tasks[props.id])
    const dispatch = useDispatch()

    const addITask = useCallback((title) => dispatch(AddTaskAC(title, props.id)), [dispatch, props.id])

    const removeTodoList = () => props.removeTodoList(props.id)
    const onClickAll = () => props.changeFilter("All", props.id)
    const onClickActive = () => props.changeFilter("Active", props.id)
    const onClickComplited = () => props.changeFilter("Complited", props.id)

    const changeTodolistTitle = (title: string) => props.changeTodolistTitle(title, props.id)

    let allTodolistTasks = tasks;
    let tasksForTodolist = allTodolistTasks;

    if (props.filter === "Active") {
        tasksForTodolist = allTodolistTasks.filter(t => !t.isDone);
    }
    if (props.filter === 'Complited') {
        tasksForTodolist = allTodolistTasks.filter(t => t.isDone);
    }
    //const RemoveTask = useCallback((taskID:string) => dispatch(RemoveTaskAC(taskID, props.id)),[dispatch, props.id])
    //const ChangeTaskStatus= useCallback((taskID: string, newIsDoneValue: boolean) => dispatch(ChangeTaskStatusAC(taskID,  newIsDoneValue, props.id) ),[dispatch, props.id])
    //const changeTaskTitle = useCallback((taskID: string, title: string) => dispatch(ChangeTaskTitleAC(taskID, title, props.id) ),[dispatch, props.id])

    return (
        <div>
            <h2>
                <EditableSpan title={props.title} changeTitle={changeTodolistTitle}/>
                <IconButton size={"small"} onClick={removeTodoList}>
                    <Delete/>
                </IconButton>
            </h2>

            <AddItemForm addItem={addITask}/>

            <ul style={{listStyle: 'none', padding: "0"}}>
                {tasksForTodolist.map(t => <Task
                    todolistID={props.id}
                    key={t.id}
                    taskID={t.id}
                    //task={t}
                    //RemoveTask ={RemoveTask}
                    //ChangeTaskStatus ={ChangeTaskStatus}
                    //changeTaskTitle={changeTaskTitle}
                />)
                }
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
})