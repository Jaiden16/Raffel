import React from 'react'
import './App.css';
import {Switch,Route} from 'react-router-dom'
import Home from './Components/Home';
import RafflePage from './Components/RafflePage'
import RaffleParticipants from './Components/RaffleParticipants';
import Winner from "./Container/Winner"


function App() {
  return (
    <div className="App">
      <h1>Raffle APP</h1>
      <Switch>
        <Route path='/raffles/:id/winner' component ={Winner}/>
        <Route path='/raffles/:id/participants' component={RaffleParticipants}/>
        <Route path='/raffles/:id' component={RafflePage}/>
        <Route exactPath='/' component={Home}/>
      </Switch>
    </div>
  );
}

export default App;
