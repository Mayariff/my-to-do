import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
import {TextField} from "@material-ui/core";

type EditableSpanPropsType={
    title: string
    changeTitle: (title:string)=> void
}

export const EditableSpan=(props:EditableSpanPropsType)=>{
    const [title, setTitle] = useState<string>(props.title)
    const [editMode, setEditMode]= useState<boolean>(false)

    const changeTitle= (e:ChangeEvent<HTMLInputElement>)=> setTitle(e.currentTarget.value)


    const onEditMode =()=>setEditMode(true)
    const offEditMode =()=>{
        setEditMode(false)
        props.changeTitle(title)
    }
    const onKeyPressHandler=(e: KeyboardEvent<HTMLInputElement>)=> {
        if (e.key === 'Enter') {
            offEditMode()}
    }

    return (
        editMode ? <TextField
                variant="standard"
                value={title}
                onChange={changeTitle}
                onBlur={offEditMode}
                autoFocus={true}
                onKeyPress={onKeyPressHandler}/>
         : <span onDoubleClick={onEditMode}>{props.title}</span>
    );
};