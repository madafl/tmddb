import React, {Component} from 'react';
import moment from 'moment';
import DatePicker from 'react-datepicker'
import firebase from '../firebase.js'
import "react-datepicker/dist/react-datepicker.css";
import { Redirect } from 'react-router-dom';
import ListaFilme from './listaFilme';

class FilmeInCinema extends Component{
    constructor(props){
		super(props);
		this.state = {
			filme: [],
			dataAleasa: moment(new Date()).format("YYYY-MM-DD"),
			filmulAles: '',
			oraAleasa: '',
			salaAleasa: '',
			poster: '',
			redirect: null
		};
		this.handleOra = this.handleOra.bind(this);
}

//dataAleasa este data selectata din date picker 
//afiseaza filmele care ruleaza azi  
componentDidMount(){
    this.afisareFilme(this.state.dataAleasa);  
    
}
afisareFilme = (data) => {

	const dbfilme = firebase.database().ref().child('filmecinema');
	dbfilme.once('value').then(snapshot => {
		// data in firebase este YYYY-MM-DD
		const arr = [];
		snapshot.forEach(childSnapshot => {
			const item = childSnapshot.val();

			var dataPremiera = moment(new Date(item.data_premiera)).format("YYYY-MM-DD")
			var dataIncheiere = moment(new Date(item.data_incheiere)).format("YYYY-MM-DD")

			item.key = childSnapshot.key;
			if (dataPremiera <= data) {
				if (data <= dataIncheiere) {
					arr.push(item)
					this.setState({
						filme: arr
					})
				}
			}

		});
	});
}
//datepicker- afiseaza filmele care ruleaza la data selectata
onChange = (data) => {
	data = moment(new Date(data)).format("YYYY-MM-DD")
	this.afisareFilme(data);
	this.setState({
		dataAleasa: data
	})

}

handleOra=(e,titlu, sala,poster_path)=>{
        //e.targeet.value afiseaza ora pe care dau click
    this.setState({oraAleasa:e.target.value, 
                filmulAles:titlu,
                redirect:'/SelectareBilet',
                salaAleasa:sala,
                poster:poster_path
    });
    
}
 
render(){
    if(this.state.redirect){
        return(<Redirect to={{
            pathname: "/SelectareBilet",
            state: { 
            ora:this.state.oraAleasa,
            data:this.state.dataAleasa,
            film:this.state.filmulAles,
            sala:this.state.salaAleasa,
            poster:this.state.poster    
            }
          }}
        />
        )
    }
  //daca ora curenta >ora de incepere a filmului  sa nu afiseze butonul cu ora
  
    return (
        <div>
        <div className="datePicker">
        <DatePicker value={this.state.dataAleasa} onChange={this.onChange} minDate={new Date()}  />
        </div>
        <ListaFilme filme={this.state.filme} handleOra={this.handleOra}/>
		</div>
        )
}

}
export default FilmeInCinema;
