import {TaskPriorities, TaskStatuses, TaskType, todolistsAPI, UpdateTaskModelType} from '../../api/todolists-api'
import {Dispatch} from 'redux'
import {AppRootStateType} from '../../app/store'
import {setAppStatusAC} from '../../app/app-reducer'
import {handleServerAppError, handleServerNetworkError} from '../../utils/error-utils'
import {addTodolistTC, clearDataAC, fetchTodolistsTC, removeTodolistTC} from "./todolists-reducer";
import {createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit";
import {AxiosError} from "axios";


export const fetchTasks = createAsyncThunk('tasks/fetchTasks',
    async (todolistId: string, thunkAPI) => {
        thunkAPI.dispatch(setAppStatusAC({status: 'loading'}))
        const res = await todolistsAPI.getTasks(todolistId)
        const tasks = res.data.items
        thunkAPI.dispatch(setAppStatusAC({status: 'succeeded'}))
        return {tasks, todolistId}
    })
export const removeTaskTC = createAsyncThunk('tasks/removeTask', (param: { taskId: string, todolistId: string }, thunkAPI) => {
    thunkAPI.dispatch(setAppStatusAC({status: 'loading'}))
    return todolistsAPI.deleteTask(param.todolistId, param.taskId)
        .then(res => {
            return {taskId: param.taskId, todolistId: param.todolistId}
        })
})
export const addTaskTC = createAsyncThunk('tasks/addTaskTC', async (param: { title: string, todolistId: string }, {
    dispatch,
    rejectWithValue
}) => {
    dispatch(setAppStatusAC({status: 'loading'}))
    try {
        const res = await todolistsAPI.createTask(param.todolistId, param.title)
        if (res.data.resultCode === 0) {
            const task = res.data.data.item
            dispatch(setAppStatusAC({status: 'succeeded'}))
            return task
        } else {
            handleServerAppError(res.data, dispatch);
            return rejectWithValue(null)
        }
    } catch (er) {
        const error = er as AxiosError
        handleServerNetworkError(error, dispatch)
        return rejectWithValue(null)
    }
})

export const updateTaskTC = createAsyncThunk('tasks/updateTaskTC',
    async (param: { taskId: string, model: UpdateDomainTaskModelType, todolistId: string }, {
        dispatch,
        rejectWithValue,
        getState
    }) => {
        const state = getState() as AppRootStateType
        const task = state.tasks[param.todolistId].find(t => t.id === param.taskId)
        if (!task) {
            return rejectWithValue("task not found in the state");
        }

        const apiModel: UpdateTaskModelType = {
            deadline: task.deadline,
            description: task.description,
            priority: task.priority,
            startDate: task.startDate,
            title: task.title,
            status: task.status ,
            ...param.model
        }

        try {
            const res = await todolistsAPI.updateTask(param.todolistId, param.taskId, apiModel)
            if (res.data.resultCode === 0) {
                return {taskId: param.taskId, model: apiModel, todolistId: param.todolistId}

            } else {
                handleServerAppError(res.data, dispatch);
                return rejectWithValue(null)
            }
        } catch (er) {
            const error = er as AxiosError
            handleServerNetworkError(error, dispatch)
            return rejectWithValue(null)
        }
    })


const slice = createSlice({
    name: 'tasksReducer',
    initialState: {} as TasksStateType,
    reducers: {
        /*  removeTaskAC(state, action: PayloadAction<{ taskId: string, todolistId: string }>){
              const tasks= state[action.payload.todolistId];
              const index= tasks.findIndex(t=> t.id === action.payload.taskId);
              tasks.splice(index, 1)
          },*/
        /*addTaskAC(state, action: PayloadAction<TaskType>) {
            const tasks = state[action.payload.todoListId];
            tasks.unshift(action.payload)
        },*/
        /*updateTaskAC(state, action: PayloadAction<{ taskId: string, model: UpdateDomainTaskModelType, todolistId: string }>) {
            const tasks = state[action.payload.todolistId];
            const index = tasks.findIndex(t => t.id === action.payload.taskId);
            tasks[index] = {...tasks[index], ...action.payload.model}
        },*/
        /*   setTasksAC(state, action: PayloadAction<{tasks: Array<TaskType>, todolistId: string}>){
               state[action.payload.todolistId]=action.payload.tasks
           }*/
    },
    extraReducers: (builder) => {
        builder.addCase(addTodolistTC.fulfilled, (state, action) => {
            state[action.payload.todolist.id] = []
        });
        builder.addCase(removeTodolistTC.fulfilled, (state, action) => {
            delete state[action.payload.id];
        });
        builder.addCase(fetchTodolistsTC.fulfilled, (state, action) => {
            action.payload.todolists.forEach((tl: { id: string | number }) => {
                state[tl.id] = []
            })
        });
        builder.addCase(clearDataAC, () => {
            return {}
        });
        builder.addCase(fetchTasks.fulfilled, (state, action) => {
            state[action.payload.todolistId] = action.payload.tasks
        });
        builder.addCase(removeTaskTC.fulfilled, (state, action) => {
            const tasks = state[action.payload.todolistId];
            const index = tasks.findIndex(t => t.id === action.payload.taskId);
            if (index > -1) tasks.splice(index, 1)
        });
        builder.addCase(addTaskTC.fulfilled, (state, action) => {
            const tasks = state[action.payload.todoListId];
            tasks.unshift(action.payload)
        });
        builder.addCase(updateTaskTC.fulfilled, (state, action) => {
            const tasks = state[action.payload.todolistId];
            const index = tasks.findIndex(t => t.id === action.payload.taskId);
            tasks[index] = {...tasks[index], ...action.payload.model}
        });
    }
})


export const tasksReducer = slice.reducer;
export const {/*removeTaskAC,*/   /*setTasksAC*/} = slice.actions


// thunks
/*export const _fetchTasksTC = (todolistId: string) => (dispatch: Dispatch) => {
    dispatch(setAppStatusAC({status:'loading'}))
    todolistsAPI.getTasks(todolistId)
        .then((res) => {
            const tasks = res.data.items
            dispatch(setTasksAC({tasks, todolistId}))
            dispatch(setAppStatusAC({status:'succeeded'}))
        })
}*/
/*export const _removeTaskTC = (taskId: string, todolistId: string) => (dispatch: Dispatch<TaskActionsType>) => {
    todolistsAPI.deleteTask(todolistId, taskId)
        .then(res => {
            const action = removeTaskAC({taskId, todolistId})
            dispatch(action)
        })
}*/
/*export const addTaskTC = (title: string, todolistId: string) => (dispatch: Dispatch) => {
    dispatch(setAppStatusAC({status: 'loading'}))
    todolistsAPI.createTask(todolistId, title)
        .then(res => {
            if (res.data.resultCode === 0) {
                const task = res.data.data.item
                const action = addTaskAC(task)
                dispatch(action)
                dispatch(setAppStatusAC({status: 'succeeded'}))
            } else {
                handleServerAppError(res.data, dispatch);
            }
        })
        .catch((error) => {
            handleServerNetworkError(error, dispatch)
        })
}*/
/*
export const updateTaskTC = (taskId: string, domainModel: UpdateDomainTaskModelType, todolistId: string) =>
    (dispatch: Dispatch, getState: () => AppRootStateType) => {
        const state = getState()
        const task = state.tasks[todolistId].find(t => t.id === taskId)
        if (!task) {
            //throw new Error("task not found in the state");
            console.warn('task not found in the state')
            return
        }

        const apiModel: UpdateTaskModelType = {
            deadline: task.deadline,
            description: task.description,
            priority: task.priority,
            startDate: task.startDate,
            title: task.title,
            status: task.status,
            ...domainModel
        }

        todolistsAPI.updateTask(todolistId, taskId, apiModel)
            .then(res => {
                if (res.data.resultCode === 0) {
                    const action = updateTaskAC({taskId, model: domainModel, todolistId})
                    dispatch(action)
                } else {
                    handleServerAppError(res.data, dispatch);
                }
            })
            .catch((error) => {
                handleServerNetworkError(error, dispatch);
            })
    }
*/

// types
export type UpdateDomainTaskModelType = {
    title?: string
    description?: string
    status?: TaskStatuses
    priority?: TaskPriorities
    startDate?: string
    deadline?: string
}
export type TasksStateType = {
    [key: string]: Array<TaskType>
}
export type TaskActionsType = any

