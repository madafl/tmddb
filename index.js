import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import * as serviceWorker from './serviceWorker';
import { Route, Link, BrowserRouter } from 'react-router-dom'
import FilmeInCinema from './components/CautaFilm/FilmeInCinema';
import SelectareBilet from  './components/CautaFilm/SelectareBilet';
import SelectareLocuri from'./components/CautaFilm/SelectareLocuri';
import DateUtilizator from './components/CautaFilm/DateUtilizator';


const routing=(
    
	  <withRouter>
    <BrowserRouter>
    <div>
          <Route exact path="/FilmeInCinema">
              <FilmeInCinema/>
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
          
           </div>
      </BrowserRouter>
      </withRouter>
  
)
ReactDOM.render(routing, document.getElementById('root')); 


// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
