import React, { useState } from 'react';
import { Link } from '@reach/router';
import axios from 'axios';

export default ({players, currentGame, setPlayers}) => {
    const updateHandler = (player, game, status) => {
        axios.put(`http://localhost:8000/api/player/${player._id}`,{
            [game] : status
        })
            .then(res=>{
                axios.get('http://localhost:8000/api/players')
                    .then(res=>{
                        setPlayers(res.data)
                    })
            })
    }

    return (
        <>
            {players.map((player,idx) =>{
                        return(
                            <tr key = {idx}>
                                <td><Link to ={`/players/${player._id}`}>{player.playerName}</Link></td>
                                <td>
                                    {player[currentGame]=== "Playing"?<button style={{backgroundColor:"green"}} onClick={(e)=>{updateHandler(player,currentGame,"Playing")}}>Playing</button>:<button onClick={(e)=>{updateHandler(player,currentGame,"Playing")}}>Playing</button>}
                                    {player[currentGame]=== "Not Playing"?<button style={{backgroundColor:"red"}} onClick={(e)=>{updateHandler(player,currentGame,"Not Playing")}}>Not Playing</button>:<button onClick={(e)=>{updateHandler(player,currentGame,"Not Playing")}}>Not Playing</button>}
                                    {player[currentGame]=== "Undecided"?<button style={{backgroundColor:"yellow"}} onClick={(e)=>{updateHandler(player,currentGame,"Undecided")}}>Undecided</button>:<button onClick={(e)=>{updateHandler(player,currentGame,"Undecided")}}>Undecided</button>}
                                </td>
                            </tr>
                        )
                    })}
        </>
    )
}