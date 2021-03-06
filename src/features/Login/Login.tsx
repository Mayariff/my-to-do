import React, {useEffect} from 'react'
import Grid from '@mui/material/Grid';
import Checkbox from '@mui/material/Checkbox';
import FormControl from '@mui/material/FormControl';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormGroup from '@mui/material/FormGroup';
import FormLabel from '@mui/material/FormLabel';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import {FormikHelpers, FormikValues, useFormik} from "formik";
import {useDispatch, useSelector} from "react-redux";
import {loginTC} from "./login-reducer";
import {appDispatchType, AppRootStateType, useAppDispatch} from "../../app/store";
import {Navigate} from "react-router-dom";
import {LoginParamsType} from "../../api/todolists-api";
import {fetchTodolistsTC} from "../TodolistsList/todolists-reducer";
import {Simulate} from "react-dom/test-utils";


type FormValuesType = {
    email: string
    password: string
    rememberMe: boolean
}

export const Login = () => {

    //const dispatch: appDispatchType = useDispatch()
    const dispatch = useAppDispatch()
    const isLoggedIn = useSelector<AppRootStateType, boolean>(state => state.login.isLoggedIn)


    let formik = useFormik({
        initialValues: {
            email: '79027972026@yandex.ru',
            password: '19051991',
            rememberMe: false
        },
        validate: (values) => {
            const errors: Partial<Omit<LoginParamsType, 'captcha'>> = {};
            if (!values.email) {
                errors.email = 'Required';
            } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
                errors.email = 'Invalid email address';
            }
            if (!values.password) {
                errors.password = 'Required';
            } else if (values.password.length < 6) {
                errors.password = 'Must be 6 characters or more'
            }
            return errors
        },
        onSubmit: async (values: FormValuesType, formikHelpers: FormikHelpers<FormValuesType>) => {
            const action = await dispatch(loginTC(values))

            if (loginTC.rejected.match(action)) {
                if (action.payload?.fieldsErrors?.length) {
                    const error = action.payload.fieldsErrors[0]
                    formikHelpers.setFieldError(error.field, error.error)
                }
            }
            formik.resetForm()
        }
    })

    useEffect(() => {
        if (!isLoggedIn) {
            return
        }
        dispatch(fetchTodolistsTC())
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    if (isLoggedIn) {
        return <Navigate to={'/'}/>
    }

    return <Grid container justifyContent={'center'}>
        <Grid item justifyContent={'center'}>
            <form onSubmit={formik.handleSubmit}>
                <FormControl>
                    <FormLabel>
                        <p>To log in get registered
                            <a href={'https://social-network.samuraijs.com/'}
                               target={'_blank'}> here
                            </a>
                        </p>
                        <p>or use common test account credentials:</p>
                        <p>Email: free@samuraijs.com</p>
                        <p>Password: free</p>
                    </FormLabel>
                    <FormGroup>
                        <TextField label="Email"
                                   margin="normal"
                                   {...formik.getFieldProps("email")}
                            /*onChange={formik.handleChange}
                            value={formik.values.email}
                 onBlur={formik.handleBlur}*//>
                        {formik.touched.email && formik.errors.email ?
                            <div style={{color: 'red'}}>{formik.errors.email}</div> : null}
                        <TextField type="password"
                                   label="Password"
                                   margin="normal"
                                   id="password"
                                   name={"password"}
                                   onChange={formik.handleChange}
                                   value={formik.values.password}
                                   onBlur={formik.handleBlur}
                        />
                        {formik.touched.password && formik.errors.password &&
                        <div style={{color: 'red'}}>{formik.errors.password}</div>}
                        <FormControlLabel label={'Remember me'}
                                          control={<Checkbox
                                              {...formik.getFieldProps("rememberMe")}
                                          />}
                        />
                        <Button type={'submit'} variant={'contained'} color={'primary'}>
                            Login
                        </Button>
                    </FormGroup>
                </FormControl></form>
        </Grid>
    </Grid>
}

