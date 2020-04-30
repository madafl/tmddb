import React, {Component} from 'react';
import csslocuri from './csslocuri.css'
import { useLocation  } from 'react-router-dom'
import { Redirect } from 'react-router-dom';
import firebase from '../firebase.js'

var nrBilete='', total='',filmA='',oraA='',salaA='',dataA='',poster='';

const GetNrBilete=()=>{
    const location = useLocation();
    nrBilete=location.state.nrbilete;

    filmA=location.state.film;
    oraA=location.state.ora;
    dataA=location.state.data;
    salaA=location.state.sala;
    total=location.state.totalDePlata
    poster=location.state.poster
    return (
        <p>Va rugam selectati {nrBilete} locuri!</p>)
      
}

class SelectareLocuri extends Component{
    constructor(props){
        super(props)
        this.state={
            randuri:['A','B','C','D','E','F','G','H','I','J'],
            locuri: [1,2,3,4,5,6,0,7,8,9,10,11,12],
            locuriSelectate:[],
            locuriDisponibile:[],
            locuriOc:[],
            redirect:null
        }
        this.paginaUrmatoare=this.paginaUrmatoare.bind(this)
    }

componentDidMount(){
    this.locuriOcupate(filmA,oraA,dataA)
}
// Daca locul nu este deja rezervat si nu este selectat -> locuriSelectate
// daca este deselectat, devine disponibil
onClick(loc){
    if (!this.state.locuriOc.includes(loc))
    {
        if (this.state.locuriSelectate.indexOf(loc) > -1)
        {
            this.setState(
            {
                locuriDisponibile: this.state.locuriDisponibile.concat(loc) 
            })
            this.setState(
            {
                locuriSelectate: this.state.locuriSelectate.filter(res => res !== loc) 
            })
        }
        else
        {
            if (this.state.locuriSelectate.length < nrBilete)
            {
                this.setState(
                {
                    locuriSelectate: this.state.locuriSelectate.concat(loc)
                })
                this.setState(
                {
                    locuriDisponibile: this.state.locuriDisponibile.filter(res => res !== loc)
                })
            }
            else
            {
                alert('Poti selecta doar ' + nrBilete + ' bilete');
            }
        }
    }
    else
    {
        alert('Locul a fost deja rezervat!')
    }
}
//cauta in bd in functie de film, ora si data
locuriOcupate(f, o, d) {

	const dbfilme = firebase.database().ref().child('rezervari');
	dbfilme.once('value').then(snapshot => { 

		snapshot.forEach(childSnapshot => {
			const item = childSnapshot.val();

			if (item.film === f && item.ora === o && item.data === d) {
				Object.values(item.locuri).map((l) => {

					this.state.locuriOc.push(l)
				})
			}
		});
	});

}

paginaUrmatoare(){
    if(this.state.locuriSelectate.length===nrBilete){
        this.setState({redirect:'/DateUtilizator'})
     }else {
       alert('Selectati locuri!')
   }
}

render(){
        
        if(this.state.redirect){
            return(<Redirect to={{
                pathname: "/DateUtilizator",
                state:{
                locuri:this.state.locuriSelectate,
                film:filmA,
                sala:salaA,
                ora:oraA,
                data:dataA,
                poster:poster,
                nrBilete:nrBilete,
                totalDePlata:total
                }
              }}
            />
            )
        }

        return(
           
        <div className='container'> 
        <GetNrBilete/>
        
        <div className="glow">Ecran</div>
            <table>
                <tbody>
                    { this.state.randuri.map((rand)=>(
                      <tr key={rand}>
                        {this.state.locuri.map((loc)=>(loc===0 ? <td className="culoar"></td> :
                            <td className={
                            this.state.locuriOc.includes(loc+rand) ? 'ocupat' : this.state.locuriSelectate.includes(loc+rand) ? 'rezervat':'liber' }
                        key={loc} onClick={(e)=>this.onClick(loc+rand)} >
                            </td>
                        ))}
                    </tr>
                    ))}
                </tbody>
                </table>
                <div className='legenda'>
                    <td className="liber">Disponibil</td>
                    <td className="rezervat">Selectat</td>
                    <td className="ocupat">Rezervat</td>
                </div>
            <button onClick={this.paginaUrmatoare}>Pasul urmator</button>
         
        </div>
        )
        }
    }
                
export default SelectareLocuri
