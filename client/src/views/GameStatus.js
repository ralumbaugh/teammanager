import React, { useEffect, useState } from 'react';
import { Link } from '@reach/router';
import GameList from '../components/GameList';
import axios from 'axios';

export default (props) => {
    const {players, setPlayers, loaded} = props
    const currentGame = `game${props.id}`
    if(props.id<=3 && props.id>0){
        return (
            <div>
                <h1>Player Status - Game {props.id}</h1>
                <h3><Link to = {"/status/game/1"}>Game 1</Link> | <Link to ={"/status/game/2"}>Game 2</Link> | <Link to ={"/status/game/3"}>Game 3</Link></h3>
                <table>
                    <thead>
                        <tr>
                            <th>Player Name</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {loaded && <GameList players = {players} currentGame = {currentGame} setPlayers = {setPlayers}/>}
                    </tbody>
                </table>
            </div>
        )
    }
    else{
        return(
            <div>
                <h1>There is no Game {props.id}</h1>
            </div>
        )
    }
}