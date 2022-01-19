import React, {useState} from 'react';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert, {AlertProps} from '@mui/material/Alert';
import {useAppSelector} from "../../app/store";
import {ErrorType, setAppErrorAC} from "../../app/app-reducer";
import {useDispatch} from "react-redux";

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
    props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export function ErrorSnackbar() {
    const [open, setOpen] = useState(true);
    const error = useAppSelector<ErrorType>(state=> state.app.error)
const dispatch = useDispatch()

    const handleClose = (event?: React.SyntheticEvent, reason?: string)  => {
        if (reason === 'clickaway') {
            return;
        }
        //setOpen(false);
        dispatch(setAppErrorAC(null) )
    };

    return (
        <Snackbar open={error !==null} autoHideDuration={6000} onClose={()=>dispatch(setAppErrorAC(null)) }>
            <Alert onClose={handleClose} severity="error" sx={{width: '100%'}}>
                {error}
            </Alert>
        </Snackbar>
    );
}
