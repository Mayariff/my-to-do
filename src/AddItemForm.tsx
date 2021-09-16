import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
import {IconButton, TextField} from "@material-ui/core";
import { AddBox} from "@material-ui/icons";

type AddItemFormPropsType ={
    addItem: (title: string) => void
}

export  const AddItemForm = React.memo(function AddItemForm( props:AddItemFormPropsType){

    const [title, setTitle] = useState<string>('')
    const [error, setError] = useState<boolean>(false)

    function onChangeAddTaskHandler(e: ChangeEvent<HTMLInputElement>) {

        setTitle(e.currentTarget.value)
        setError(false);}
    function addItem(){
        let trimedTitle = title.trim();
        if (trimedTitle) {
            props.addItem(trimedTitle);
            setTitle('');
        } else {
           setError(true);
        }
    }
    function onKeyPressHandler(e: KeyboardEvent<HTMLInputElement>) {
        if (e.key === 'Enter') {
            addItem()
        }
    }

    return (<div>
        <TextField
            value={title}
            onChange={onChangeAddTaskHandler}
            onKeyPress={onKeyPressHandler}
        variant={"outlined"}
        size={"small"}
        label={"Title"}
        error={error}
        helperText={error && "Error! Where is text? "}/>
        <IconButton size={"small"} onClick={addItem} color={"primary"}>
            <AddBox />
        </IconButton>

        {error && <div className="errorMessage">{error}</div>}
    </div>)
})