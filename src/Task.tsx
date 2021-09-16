import React, {ChangeEvent} from 'react';
import {Checkbox, IconButton} from "@material-ui/core";
import {EditableSpan} from "./EditableSpan";
import {Delete} from "@material-ui/icons";
import {TaskType} from "./Todolist";


export type TaskPropsType ={
    task: TaskType
    todolistID: string
    RemoveTask: (taskID:string) => void
    ChangeTaskStatus: (taskID: string, newIsDoneValue: boolean) => void
    changeTaskTitle: (taskID: string,  title: string) => void
}

const Task = React.memo((props:TaskPropsType) => {

    const onRemoveHandler = () =>  props.RemoveTask(props.task.id)
    const onCheckboxHandler = (e: ChangeEvent<HTMLInputElement>) => {
        let newIsDoneValue = e.currentTarget.checked;
        props.ChangeTaskStatus(props.task.id,  newIsDoneValue)}

    const changeTaskTitle = (title: string) => props.changeTaskTitle(props.task.id, title)


    return (<>
        <li key={props.task.id}>
            <Checkbox
                color={"primary"}
                onChange={onCheckboxHandler}
                checked={props.task.isDone}
                size={"small"}/>

            <EditableSpan title={props.task.title} changeTitle={changeTaskTitle}/>
            <IconButton size={"small"} onClick={onRemoveHandler}>
                <Delete/>
            </IconButton>
        </li>
    </>)
});

export default Task;