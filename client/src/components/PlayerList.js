import React from 'react';
import { Link } from '@reach/router';
import DeleteButton from './DeleteButton';

export default ({players, removeFromDom}) => {

    return (
        <>
            {players.map((player,idx) =>{
                        return(
                            <tr key = {idx}>
                                <td><Link to = {`/players/${player._id}`}>{player.playerName}</Link></td>
                                <td>{player.preferredPosition}</td>
                                <td><DeleteButton successCallback = {() => removeFromDom(player._id)} /></td>
                            </tr>
                        )
                    })}
        </>
    )
}