import React, {Component} from 'react';
import firebase from '../firebase.js'
import {useLocation} from 'react-router-dom';

var nrBilete='', total='',film='',ora='',sala='',data='',poster='';
var locuri=[];

const Detalii=()=>{
    const location = useLocation();
    nrBilete=location.state.nrbilete;

    film=location.state.film;
    ora=location.state.ora;
    data=location.state.data;
    sala=location.state.sala;
    total=location.state.totalDePlata;
    poster=location.state.poster;
    locuri=location.state.locuri
   
  return(
        <div>
           Locuri selectate: {location.state.locuri.map((loc)=>{
            return(
            <p>{loc}</p>
            )})}
        <img src={poster}/>
        <p>{film}</p>
        <p>{ora}</p>
      </div>
  )
}

class DateUtilizator extends Component{
    constructor(props){
        super(props)
        this.state={
            nume:'',
            email:'',
            telefon:''
        }
        this.handleChange=this.handleChange.bind(this)
        this.handleSubmit=this.handleSubmit.bind(this)
    }

handleChange=(e)=>{
    this.setState({[e.target.name]:e.target.value})

}

handleSubmit=(e)=>{
        e.preventDefault();
        if(this.state.nume==='' || this.state.email==='' || this.state.telefon===''){
            alert('Introduceti datele!')
        }
        else{
            this.detaliiRezervare()
            this.setState({nume:'',email:'',telefon:''})
            alert('Rezervare efectuata cu succes!')   
        }
    }

detaliiRezervare(){
    const dbRezervari= firebase.database().ref().child('rezervari');
        var rezervare= dbRezervari.push();
        rezervare.set({
            nume:this.state.nume,
            email:this.state.email,
            telefon:this.state.telefon,
            ora:ora,
            data:data,
            locuri:locuri,
            film:film
        });
}


render(){ 
   return(
        <div>
        <form >
            <label >Nume:</label>
            <input type="text" className="form-control" name="nume" value={this.state.nume} onChange={this.handleChange} required="required"/>
            <label>Email:</label>
            <input type="text" className="form-control" name="email" value={this.state.email}  onChange={this.handleChange} placeholder="nume@exemplu.com"></input>
            <label>Telefon:</label>
            <input type="text" className="form-control" name="telefon" value={this.state.telefon} onChange={this.handleChange} ></input>
            <button type="submit" className="btn btn-primary" onClick={this.handleSubmit}>REZERVA</button>
        </form>
        <div className="detaliiRezervare">
         
        </div>
        <Detalii/>
        </div>
   )
}
} 

export default DateUtilizator