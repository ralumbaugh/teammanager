import React, { useEffect, useState } from 'react';
import { Link } from '@reach/router';
import PlayerList from '../components/PlayerList';
import axios from 'axios';

export default ({players, setPlayers, loaded, removeFromDom}) => {
    return (
        <div>
            <h1><Link to="/players/list">List</Link> | <span style={{fontWeight:"normal"}}><Link to="/players/addplayer">Add Player</Link></span></h1>
            <table>
                <thead>
                    <tr>
                        <th>Player Name</th>
                        <th>Preferred Position</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {loaded && <PlayerList players = {players} removeFromDom = {removeFromDom}/>}
                </tbody>
            </table>
        </div>
    )
}