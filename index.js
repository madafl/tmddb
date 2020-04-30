import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import * as serviceWorker from './serviceWorker';import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
  } from "react-router-dom";
import FilmeInCinema from './components/CautaFilm/FilmeInCinema';
import SelectareBilet from  './components/CautaFilm/SelectareBilet';
import SelectareLocuri from'./components/CautaFilm/SelectareLocuri';
import DateUtilizator from './components/CautaFilm/DateUtilizator';


export default function Routing (){
    return(
    <Router>
        <div>
        <Link to="/">Acum in cinema</Link>
        </div>
	<Switch>
          <Route exact path="/">
              <InCinema/>
          </Route>
          <Route exact path="/FilmeInCinema" >
              <FilmeInCinema />
          </Route>
          <Route exact path="/SelectareBilet" >
              <SelectareBilet />
          </Route>
          <Route exact path="/SelectareLocuri" >
              <SelectareLocuri />
          </Route>
          <Route exact path="/DateUtilizator" >
              <DateUtilizator />
          </Route>
          
      </Switch>
      </Router>
    )
}
function InCinema() {
    return(
        <div>
        <FilmeInCinema/>
        </div>
    )
}
ReactDOM.render(<Routing/>, document.getElementById('root')); 


// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
