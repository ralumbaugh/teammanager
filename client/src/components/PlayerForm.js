import React, { useState } from 'react';
export default props =>{
    const { initialName, initialPreferred, onSubmitProp } = props;
    const [playerName, setPlayerName] = useState(`${initialName}`);
    const [preferred, setPreferred] = useState(`${initialPreferred}`);
    const [visiblebutton,setVisisbleButton] = useState(false);

    // Front End Validations:
    const playerNameHandler = e=>{
        e.preventDefault();
        setPlayerName(e.target.value);
        console.log(e.target.value.length)
        if(e.target.value.length < 2){
            setVisisbleButton(false);
        }
        else{
            setVisisbleButton(true);
        }
    }
    
    const onSubmitHandler = e =>{
        e.preventDefault();
        onSubmitProp(playerName, preferred);
    }

    return (
        <form onSubmit = {onSubmitHandler}>
            <p>
                <label>Name: </label>
                <input type = "text" name ="playerName" value={playerName} onChange = {playerNameHandler} />
                <label>Preferred Position: </label>
                <input type = "text" name ="preferred" value={preferred} onChange = {(e) => {setPreferred(e.target.value)}} />
            </p>
            {visiblebutton?
            <input type="submit" />:
            <p>Please start typing. Once you have a valid player name, the submit button will appear.</p>}
        </form>
    )
}