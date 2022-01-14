import React, {ChangeEvent, useCallback} from 'react';
import {Checkbox, IconButton} from "@material-ui/core";
import {EditableSpan} from "./EditableSpan";
import {Delete} from "@material-ui/icons";
import {TaskType} from "./Todolist";
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "./store/store";
import {ChangeTaskStatusAC, ChangeTaskTitleAC, RemoveTaskAC} from "./store/task-reduser";


export type TaskPropsType ={
    //task: TaskType
    todolistID: string
    taskID:string
    //RemoveTask: (taskID:string) => void
    //ChangeTaskStatus: (taskID: string, newIsDoneValue: boolean) => void
    //changeTaskTitle: (taskID: string,  title: string) => void
}

const Task = React.memo(({taskID, todolistID}:TaskPropsType)=>{
        console.log('task')
   const task= useSelector<AppRootStateType, TaskType>( state=> state.tasks[todolistID]
        .filter(task=> task.id===taskID)[0])
        const dispatch = useDispatch()


    const onRemoveHandler =  useCallback(() =>dispatch(RemoveTaskAC(taskID, todolistID)),[dispatch, taskID, todolistID])
        //props.RemoveTask(props.task.id)
    const onCheckboxHandler = useCallback((e: ChangeEvent<HTMLInputElement>) => {
        let newIsDoneValue = e.currentTarget.checked;
        dispatch(ChangeTaskStatusAC(taskID,newIsDoneValue, todolistID))},[dispatch, taskID, todolistID])
        //props.ChangeTaskStatus(props.task.id,  newIsDoneValue)}

    const changeTaskTitle = useCallback((title: string) => dispatch(ChangeTaskTitleAC(taskID,title, todolistID)),[dispatch, taskID, todolistID])
        //props.changeTaskTitle(props.task.id, title)


    return (<>
        <li key={task.id}>
            <Checkbox
                color={"primary"}
                onChange={onCheckboxHandler}
                checked={task.isDone}
                size={"small"}/>
            <EditableSpan title={task.title} changeTitle={changeTaskTitle}/>
            <IconButton size={"small"} onClick={onRemoveHandler}>
                <Delete/>
            </IconButton>
        </li>
    </>)
}
);

export default Task;