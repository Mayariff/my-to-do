import React, {ChangeEvent, KeyboardEvent, useState} from 'react';

type AddItemFormPropsType ={
    addItem: (title: string) => void
}

export  function AddItemForm( props:AddItemFormPropsType){

    const [title, setTitle] = useState<string>('')
    const [error, setError] = useState<string>("")

    function onChangeAddTaskHandler(e: ChangeEvent<HTMLInputElement>) {
        setTitle(e.currentTarget.value)}
    function addItem(){
        let trimedTitle = title.trim();
        if (trimedTitle) {
            props.addItem(trimedTitle);
            setTitle('');
        } else {
            setError("Error! Where is task?");
        }
    }
    function onKeyPressHandler(e: KeyboardEvent<HTMLInputElement>) {
        setError("");
        if (e.key === 'Enter') {
            addItem()
        }
    }

    return (<div>
        <input value={title}
               onChange={onChangeAddTaskHandler}
               onKeyPress={onKeyPressHandler}
               className={error ? "error" : ""}/>
        <button onClick={addItem}>+</button>
        {error && <div className="errorMessage">{error}</div>}
    </div>)
}