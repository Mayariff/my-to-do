import React, {SyntheticEvent} from 'react';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert, { AlertProps } from '@mui/material/Alert';
import { useDispatch, useSelector } from 'react-redux';
import { AppRootStateType } from '../../app/store';
import { setAppErrorAC } from '../../app/app-reducer';
import {SnackbarCloseReason} from "@mui/material/Snackbar/Snackbar";


const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
    props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});


export function ErrorSnackbar() {

    const error = useSelector<AppRootStateType, string>(state => state.app.error)

    const dispatch = useDispatch();

    const handleClose = (event?: React.SyntheticEvent, reason?: string) => {
        if (reason === 'clickaway') {
            return;
        }
        dispatch(setAppErrorAC({error: ''}))
    };

    return (
        <Snackbar open={error !== ''} autoHideDuration={6000} onClose={()=>dispatch(setAppErrorAC({error: ''}))}>
            <Alert onClose={handleClose} severity="error" sx={{width: '100%'}}>
                {error}
            </Alert>
        </Snackbar>
    );
}

/*
function Alert(props: AlertProps) {
    return <MuiAlert elevation={6} variant="filled" {...props} />
}

export function ErrorSnackbar() {
    //const [open, setOpen] = React.useState(true)
    const error = useSelector<AppRootStateType, string | null>(state => state.app.error);
    const dispatch = useDispatch()

    const handleClose = (event: React.SyntheticEvent<any,any> | Event, reason?: SnackbarCloseReason) => {
        if (reason === 'clickaway') {
            return
        }
        dispatch(setAppErrorAC({error: ''}));
    }


    const isOpen = error !== null;

    return (
        <Snackbar open={isOpen} autoHideDuration={6000} onClose={handleClose}>
            <Alert onClose={handleClose} severity="error">
                {error}
            </Alert>
        </Snackbar>
    )
}
*/
