import React, { useState } from 'react';
import { Link, navigate } from '@reach/router';
import PlayerForm from '../components/PlayerForm';
import axios from 'axios';

export default ({players, setPlayers}) => {
    const [errors, setErrors] = useState([]);

    const createPlayer = (player, preferred) =>{
        axios.post('http://localhost:8000/api/player', {
            "playerName":player,
            "preferredPosition":preferred})
            .then(res=>{
                setPlayers([...players, res.data]);
            })
            .then(res=>{
                navigate('/players/list')
            })
            .catch(err=>{
                const errorResponse = err.response.data.errors;
                const errorArr = [];
                for (const key of Object.keys(errorResponse)){
                    errorArr.push(errorResponse[key].message)
                }
                setErrors(errorArr);
            })
    }

    return (
        <div>
            <h1><span style={{fontWeight:"normal"}}><Link to="/players/list">List</Link></span> | <Link to="/players/addplayer">Add Player</Link></h1>
            <div>
                {errors.map((err, index) => <p key={index}>{err}</p>)}
                <PlayerForm onSubmitProp = {createPlayer} initialName = "" initialPreferred = ""/>
            </div>
        </div>
    )
}