import React, { useEffect, useState } from 'react';
import { Link } from '@reach/router';
import axios from 'axios';
// import DeleteButton from './DeleteButton';

export default (props) => {
    const {players, setPlayers, loaded} = props
    const [player, setPlayer] = useState('');
    const [gamesAttending, setGamesAttending] = useState([]);
    const [gamesNotAttending, setGamesNotAttending] = useState([]);
    const [gamesUndecided, setGamesUndecided] = useState([]);
    const [gamesLoaded, setGamesLoaded] = useState(false);

    useEffect(()=>{
        axios.get(`http://localhost:8000/api/player/${props.id}`)
            .then(res=>{
                setPlayer(res.data);
                let ga = [];
                let gna = [];
                let gu = [];
                for(let keys in res.data){
                    if(res.data[keys] === "Playing"){
                        ga.push(keys)
                        setGamesAttending(ga)
                    }
                    else if(res.data[keys] === "Not Playing"){
                        gna.push(keys)
                        setGamesNotAttending(gna)
                    }
                    else if(res.data[keys] === "Undecided"){
                        gu.push(keys)
                        setGamesUndecided(gu)
                    }
                }
                setGamesLoaded(true)
            })
            .catch(err=>console.log(err))
    },[])

    return (
        <>
            <h1>{player.playerName}</h1>
            {player.preferredPosition !== ""?
            <h3>Preferred Position: {player.preferredPosition}</h3>:
            <></>
            }
            <p><Link to ={`/players/${props.id}/edit`}>Edit {player.playerName}</Link></p>
            <h3>Games Attending:</h3>
            {gamesLoaded && gamesAttending.map((game,index)=> <p key={index}>{game}</p>)}
            <h3>Games Not Attending:</h3>
            {gamesLoaded && gamesNotAttending.map((game,index)=> <p key={index}>{game}</p>)}
            <h3>Games Undecided:</h3>
            {gamesLoaded && gamesUndecided.map((game,index)=> <p key={index}>{game}</p>)}
            
        </>
    )
}