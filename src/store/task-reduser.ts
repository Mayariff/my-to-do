import {TasksStateType} from "../App";
import {v1} from "uuid";
import {AddTodolistAT, RemoveTodolistAT} from "./todolist-reduser";


export enum ACTION_TYPE {
    remove_task = "REMOVE_TASK",
    add_task = "ADD_TASK",
    change_taskTitle = "CHANGE_TASK_TITLE",
    change_task_status = "CHANGE_TASK_STATUS",
}


export  type RemoveTaskAT = {
    type: ACTION_TYPE.remove_task,
    payload: {
        taskID: string,
        todolistID: string
    }
}
export type AddTaskAT = {
    type: ACTION_TYPE.add_task,
    payload: {
        title: string,
        todolistID: string,
    }

}
type ChangeTaskStatusAT = {
    type: ACTION_TYPE.change_task_status,
    payload: {
        taskID: string,
        isDone: boolean,
        todolistID: string,
    }
}
type ChangeTaskTitleAT = {
    type: ACTION_TYPE.change_taskTitle,
    payload: {taskID:string, title: string, todolistID: string,}
}

export type ActionType = AddTaskAT | ChangeTaskStatusAT | RemoveTaskAT |ChangeTaskTitleAT |AddTodolistAT |RemoveTodolistAT

const tasksReducer = (tasks: TasksStateType, action: ActionType) => {
       let CopyTasks = {...tasks}
    switch (action.type) {
        case ACTION_TYPE.add_task:
            let newTask = {id: v1(), title: action.payload.title, isDone: false}
            return {
                ...tasks,
                [action.payload.todolistID]: [
                    newTask, ...tasks[action.payload.todolistID]]
            }
        case ACTION_TYPE.remove_task:
            CopyTasks[action.payload.todolistID] = CopyTasks[action.payload.todolistID].filter(t => action.payload.taskID !== t.id)
            return CopyTasks
        case ACTION_TYPE.change_task_status:
            CopyTasks[action.payload.todolistID] = CopyTasks[action.payload.todolistID]
                .map(t => t.id === action.payload.taskID ? {
                ...t,
                isDone: action.payload.isDone} : t)
            return CopyTasks
        case ACTION_TYPE.change_taskTitle:
            CopyTasks[action.payload.todolistID] = CopyTasks[action.payload.todolistID].map( t=> t.id===action.payload.taskID? {...t, title: action.payload.title}: t)
            return CopyTasks
        case  "ADD_TODOLIST":
            return {...tasks,
                [action.payload.todolistID]: []}
        case "REMOVE-TODOLIST":
            delete CopyTasks[action.payload.todolistID]
            return CopyTasks
        default:
            return tasks
    }
};

export default tasksReducer;

export const RemoveTaskAC = (taskID: string, todolistID: string): RemoveTaskAT => {
    return {type: ACTION_TYPE.remove_task, payload: {taskID, todolistID} }
}
export const AddTaskAC = (title: string, todolistID: string): AddTaskAT => {
    return {type: ACTION_TYPE.add_task, payload: {title, todolistID}}
}
export const ChangeTaskStatusAC = (taskID: string, isDone: boolean, todolistID: string): ChangeTaskStatusAT => {
    return {type: ACTION_TYPE.change_task_status, payload: {taskID, isDone, todolistID} }
}
export const ChangeTaskTitleAC=(taskID:string, title: string, todolistID: string):ChangeTaskTitleAT => {
    return { type: ACTION_TYPE.change_taskTitle, payload: {taskID, title, todolistID} }
}