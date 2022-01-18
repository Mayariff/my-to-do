import {TasksStateType} from '../App';
import {AddTodolistActionType, RemoveTodolistActionType, setTodolistActionType} from './todolists-reducer';
import {TaskStatuses, TaskType, todolistsAPI, UpdateTaskModelType} from '../api/todolists-api'
import {Dispatch} from "redux";
import {AppRootStateType} from "./store";

export type RemoveTaskActionType = {
    type: 'REMOVE-TASK',
    todolistId: string
    taskId: string
}

export type AddTaskActionType = {
    type: 'ADD-TASK',
    task: TaskType
}

export type ChangeTaskStatusActionType = {
    type: 'CHANGE-TASK-STATUS',
    todolistId: string
    taskId: string
    status: TaskStatuses
}

export type ChangeTaskTitleActionType = {
    type: 'CHANGE-TASK-TITLE',
    todolistId: string
    taskId: string
    title: string
}

export type setTasksAT = ReturnType<typeof setTasksAC>

type ActionsType = RemoveTaskActionType | AddTaskActionType
    | ChangeTaskStatusActionType
    | ChangeTaskTitleActionType
    | AddTodolistActionType
    | RemoveTodolistActionType |setTodolistActionType |setTasksAT

const initialState: TasksStateType = {
    /*"todolistId1": [
        { id: "1", title: "CSS", status: TaskStatuses.New, todoListId: "todolistId1", description: '',
            startDate: '', deadline: '', addedDate: '', order: 0, priority: TaskPriorities.Low },
        { id: "2", title: "JS", status: TaskStatuses.Completed, todoListId: "todolistId1", description: '',
            startDate: '', deadline: '', addedDate: '', order: 0, priority: TaskPriorities.Low },
        { id: "3", title: "React", status: TaskStatuses.New, todoListId: "todolistId1", description: '',
            startDate: '', deadline: '', addedDate: '', order: 0, priority: TaskPriorities.Low }
    ],
    "todolistId2": [
        { id: "1", title: "bread", status: TaskStatuses.New, todoListId: "todolistId2", description: '',
            startDate: '', deadline: '', addedDate: '', order: 0, priority: TaskPriorities.Low },
        { id: "2", title: "milk", status: TaskStatuses.Completed, todoListId: "todolistId2", description: '',
            startDate: '', deadline: '', addedDate: '', order: 0, priority: TaskPriorities.Low },
        { id: "3", title: "tea", status: TaskStatuses.New, todoListId: "todolistId2", description: '',
            startDate: '', deadline: '', addedDate: '', order: 0, priority: TaskPriorities.Low }
    ]*/

}

export const tasksReducer = (state: TasksStateType = initialState, action: ActionsType): TasksStateType => {
    switch (action.type) {
        case 'SET-TODOLISTS':{
            let copy= {...state}
            action.todolists.forEach(tl=> {copy[tl.id]=[]})
            return copy
        }
        case 'SET-TASKS': {
            let copy= {...state}
           copy[action.todolistId] = action.tasks
            return copy
        }
        case 'REMOVE-TASK': {
            const stateCopy = {...state}
            const tasks = stateCopy[action.todolistId];
            const newTasks = tasks.filter(t => t.id !== action.taskId);
            stateCopy[action.todolistId] = newTasks;
            return stateCopy;
        }
        case 'ADD-TASK': {
            const stateCopy = {...state}

            const tasks = stateCopy[action.task.todoListId];
            const newTasks = [action.task, ...tasks];
            stateCopy[action.task.todoListId] = newTasks;
            return stateCopy;
        }
        case 'CHANGE-TASK-STATUS': {
            let todolistTasks = state[action.todolistId];
            let newTasksArray = todolistTasks
                .map(t => t.id === action.taskId ? {...t, status: action.status} : t);

            state[action.todolistId] = newTasksArray;
            return ({...state});
        }
        case 'CHANGE-TASK-TITLE': {
            let todolistTasks = state[action.todolistId];
            // найдём нужную таску:
            let newTasksArray = todolistTasks
                .map(t => t.id === action.taskId ? {...t, title: action.title} : t);

            state[action.todolistId] = newTasksArray;
            return ({...state});
        }
        case 'ADD-TODOLIST': {
            return {
                ...state,
                [action.todolist.id]: []
            }
        }
        case 'REMOVE-TODOLIST': {
            const copyState = {...state};
            delete copyState[action.id];
            return copyState;
        }
        default:
            return state;
    }
}

export const removeTaskAC = (taskId: string, todolistId: string): RemoveTaskActionType => {
    return {type: 'REMOVE-TASK', taskId: taskId, todolistId: todolistId}
}
export const addTaskAC = (task: TaskType): AddTaskActionType => {
    return {type: 'ADD-TASK', task}
}
export const changeTaskStatusAC = (taskId: string, status: TaskStatuses, todolistId: string): ChangeTaskStatusActionType => {
    return {type: 'CHANGE-TASK-STATUS', status, todolistId, taskId}
}
export const changeTaskTitleAC = (taskId: string, title: string, todolistId: string): ChangeTaskTitleActionType => {
    return {type: 'CHANGE-TASK-TITLE', title, todolistId, taskId}
}

export const setTasksAC =(todolistId: string, tasks: TaskType[])=>({type: 'SET-TASKS',  todolistId, tasks}) as const

export const setTasksTC=(todolistId: string)=> {
   return (dispatch: Dispatch) => {
        todolistsAPI.getTasks(todolistId)
            .then(res => dispatch(setTasksAC(todolistId, res.data.items)))
    }
}

export const removeTasksTC = (todolistId: string, taskId: string)=> (dispatch: Dispatch)=>{
    todolistsAPI.deleteTask(todolistId, taskId)
        .then(res=> res.data.resultCode==0 && dispatch(removeTaskAC(taskId, todolistId)))
}

export const addTaskTC =(todoListId: string, title: string)=> (dispatch: Dispatch)=>{
    todolistsAPI.createTask(todoListId, title)
        .then(res=>{
            let task = res.data.data.item
             res.data.resultCode==0 &&  dispatch(addTaskAC(task))
})
}

export const updateTaskStatusTC=(todolistId: string, taskId: string, status: TaskStatuses)=> {
    return (dispatch: Dispatch, getState:()=>AppRootStateType) => {
       const AllTasks = getState().tasks
       const tasksForOneTodo = AllTasks[todolistId]
        const task = tasksForOneTodo.find(t=> t.id === taskId)
if (task) {
    let model: UpdateTaskModelType = {
        title: task.title,
        description: task.description,
        status: status,
        priority: task.priority,
        startDate: task.startDate,
        deadline: task.deadline
    }
    todolistsAPI.updateTask(todolistId, taskId, model)
        .then((res) => {
            res.data.resultCode == 0 && dispatch(changeTaskStatusAC(taskId, status, todolistId))
        })
}
    };
}

export const changeTaskTitleAT =(taskId: string, title: string, todolistId: string)=> (dispatch: Dispatch, getStore:()=>AppRootStateType)=>{

    const AllTasks= getStore().tasks
    const TodoTasks = AllTasks[todolistId]
    const task = TodoTasks.find(t=> t.id=== taskId)

    if(task){
        let model ={...task, title}
        todolistsAPI.updateTask(todolistId, taskId, model)
            .then(res => res.data.resultCode===0 && dispatch(changeTaskTitleAC(taskId, title, todolistId))
            )
    }

}

