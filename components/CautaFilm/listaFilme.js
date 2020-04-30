import React from 'react';

const dimensiune={
    width:'200px',
    height:'285px'

}
 const ListaFilme =(props) => {

		return (
			<div>
                <div className="container">
		{
			props.filme.map((film,i)=>(
                
                <div className="card" key={i}  >
                    
                <div className="title"  data-key="{film.title}" >
                    <p>{film.titlu}</p> 
                    
                </div>
                
                 
                 <div className="Poster">
                     {
                         film.poster_path == null  || film.poster_path== " " ?
                         <img src={`https://www.csaff.org/wp-content/uploads/csaff-no-poster.jpg`}  alt="unavailable" style={dimensiune} /> : <img src={film.poster_path} alt="poster" style={dimensiune} />
                     }
                </div>
                <div className="sala" id="sala">	
                     <p> Sala:{film.sala} </p>
                    
                </div>
                <div className="durata">
                        <p>{film.durata} minute</p> 
                </div>
                <div className="obs">
                        {film.observatii}
                </div>
                 
                <div className="ora">
                         {
                            Object.values(film.ora).map((o,j)=>{
                                //o afiseaza fiecare ora. 
                                
                                 return(
                                
                                 <button className="buton" id="btn" key={j} value={o}
                                  onClick={(e)=>props.handleOra(e, film.title, film.sala,film.poster_path)}>
									 
                                     {o} 
                                 </button>
                                 )
                             })
                         }
                </div>	
                </div> 
            ))}
		</div>
        
        </div>
		
		)}
	 export default ListaFilme;

