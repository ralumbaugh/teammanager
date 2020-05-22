import React, {useState, useEffect} from 'react';
import { Router, Link } from '@reach/router';
import axios from 'axios';
import Main from './views/Main';
import AddPlayer from './views/AddPlayer';
import GameStatus from './views/GameStatus';
import ViewPlayer from './views/ViewPlayer';
import EditPlayer from './views/EditPlayer';

function App() {
  const[players, setPlayers] = useState({});
  const[loaded, setLoaded] = useState(false);

  useEffect(()=>{
    console.log("About to get the players!")
    axios.get("http://localhost:8000/api/players")
      .then(res =>{
        setPlayers(res.data);
        setLoaded(true);
      })
  }, [])

  const removeFromDom = playerID =>{
    if(window.confirm("Are you sure you want to delete that player?") === true){
      axios.delete(`http://localhost:8000/api/player/${playerID}`)
      setPlayers(players.filter(player => player._id !== playerID));
    }
  }

  return (
    <div className="App">
      <h1><Link to ={"players/list"}>Manage Players</Link> | <Link to = {"status/game/1"}>Manage Player Status</Link></h1>
      <Router>
        <Main path="players/list" players={players} setPlayers = {setPlayers} loaded = {loaded} removeFromDom = {removeFromDom}/>
        <AddPlayer path="players/addplayer" players={players} setPlayers = {setPlayers} />
        <GameStatus path="status/game/:id" players={players} setPlayers = {setPlayers} loaded = {loaded}/>
        <ViewPlayer path="players/:id" players = {players} setPlayers = {setPlayers} loaded = {loaded} />
        <EditPlayer path="/players/:id/edit" players = {players} setPlayers = {setPlayers} loaded = {loaded} />
      </Router>
    </div>
  );
}

export default App;