import React, { useState, useEffect } from 'react';
import { Link, navigate } from '@reach/router';
import PlayerForm from '../components/PlayerForm';
import axios from 'axios';

export default (props) => {
    const {players, setPlayers} = props
    const [errors, setErrors] = useState([]);
    const [player, setPlayer] = useState([]);
    const [loaded, setLoaded] = useState(false);

    useEffect(()=>{
        axios.get(`http://localhost:8000/api/player/${props.id}`)
            .then(res=>{
                setPlayer(res.data);
                setLoaded(true);
            })
            .catch(err=>console.log(err))
    },[])

    const editPlayer = (player, preferred) =>{
        axios.put(`http://localhost:8000/api/player/${props.id}`, {
            "playerName":player,
            "preferredPosition":preferred})
            .then(res=>{
                axios.get("http://localhost:8000/api/players")
                .then(res=>{
                    setPlayers(res.data);
                })
                .then(res=>{
                    navigate(`/players/${props.id}`)
                })
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

    console.log(players)

    return (
        <div>
            <h1><span style={{fontWeight:"normal"}}><Link to="/players/list">List</Link></span> | <Link to="/players/addplayer">Add Player</Link></h1>
            <div>
                {errors.map((err, index) => <p key={index}>{err}</p>)}
                {loaded && <PlayerForm onSubmitProp = {editPlayer} initialName = {player.playerName} initialPreferred = {player.preferredPosition}/>}
            </div>
        </div>
    )
}