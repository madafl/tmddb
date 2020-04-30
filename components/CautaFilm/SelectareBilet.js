import React, {Component} from 'react';
import { useLocation  } from 'react-router-dom'
import { Redirect } from 'react-router-dom';

const stilLabel={
    margin:'10px'
}
var filmA='',oraA='',salaA='',dataA='',poster='';

const GetFromLocation=()=>{
  const location = useLocation();
  filmA=location.state.film;
  dataA=location.state.data;
  salaA=location.state.sala;
  oraA=location.state.ora;
  poster=location.state.poster

return(
        <div>
            <p>Film:{location.state.film}</p>
            <p>Ora: {location.state.ora}</p>
            <p>Data {location.state.data}</p>  

    </div>
)}
  
const optiuni=[0,1,2,3,4,5,6,7,8,9,10]

class SelectareBilet extends Component{
    constructor(props){
        super(props)
        this.state={
            inputs:[{
                    name:'Adult',
                    pret: 21,
                    options:optiuni
               },
               {
                    name:'Student',
                    pret:18,
                    options:optiuni
                },
                {
                    name:'Elev',
                    pret: 18,
                    options:optiuni
                },
                {
                    name:'Copii ',
                    pret: 16,
                    options:optiuni
                },
                {
                    name:'Pensionar',
                    pret: 18,
                    options:optiuni
                }
            ],
                bileteAdult:0,
                bileteStudent:0,
                bileteElev:0,
                bileteCopii:0,
                biletePensionar:0,
                sumaDePlatit:0,
                totalBilete:0,
                redirect:null
        }
     this.redirect=this.redirect.bind(this)
    }

creeazaSelect(inputsOptions){
    const {options}=inputsOptions; 
    const opts=options.map((o)=>{
        return(<option value={o}>{o}</option>)
    });

    return(
       <div >
        <label style={stilLabel} >{inputsOptions.name}</label>
        <label style={stilLabel}>{inputsOptions.pret} lei</label>
        <select  onChange={this.handleChange(inputsOptions.name)}
        onClick={this.total}>  
            {opts}
        </select>
        </div>
    )}

//apelata onChange
handleChange (categorie) {
    return (e) => {
        if(categorie==='Adult'){
            this.setState({bileteAdult: Number(e.target.value)})
            }
            else{
                if(categorie==='Student'){
                    this.setState({bileteStudent:Number(e.target.value)})
                }
                else{
                    if(categorie==='Elev'){
                        this.setState({bileteElev:Number(e.target.value)})
                    }
                    else{
                        if(categorie==='Pensionar'){
                            this.setState({biletePensionar:Number(e.target.value)})
                        }else{
                                this.setState({bileteCopii:Number(e.target.value)})
                        
                    }
                }
            }
        }
        
    }
    
}
renderSelects (){
    const {inputs}=this.state; 
    return inputs.map((input)=>{
        return this.creeazaSelect(input) 
    });
}
//functia estte apelata onClick
total=()=>{
    var totalDePlata= this.state.bileteAdult*21 +this.state.bileteStudent*18+this.state.bileteCopii*16+this.state.biletePensionar*18+this.state.bileteElev*18;  
    this.setState({sumaDePlatit:totalDePlata})
    var nrBilete=this.state.bileteAdult+this.state.bileteStudent+this.state.bileteCopii+this.state.biletePensionar+this.state.bileteElev   
    this.setState({totalBilete:nrBilete})
    return (
        <div>
            <div className="totalDePlata">Total de plata:  {totalDePlata }  lei</div>
        </div>
    )
}

redirect(){
    if(this.state.sumaDePlatit!=0){
        this.setState({redirect:'/SelectareLocuri'})
     }else {
       alert('Selectati bilete!')
   }

}
handleOnClick(){
    
}

render(){
    
    if(this.state.redirect){
        return(<Redirect to={{
            pathname: "/SelectareLocuri",
            state:{
                nrbilete:this.state.totalBilete,
                totalDePlata:this.state.sumaDePlatit,
                film:filmA,
                sala:salaA,
                ora:oraA,
                data:dataA,
                poster:poster
                
            }
          }}
        />
        )
    }
return(
    <div >
        <GetFromLocation/>
            {this.renderSelects()}
            <hr></hr>
            <p>Total de plata: {this.state.sumaDePlatit}</p>
            <p>Numar bilete: {this.state.totalBilete}</p>
            <hr></hr>
            <button className="btn btn-primary" onClick={this.redirect} >Selecteaza locurile</button>
    </div>

)

  }
}



export default SelectareBilet;