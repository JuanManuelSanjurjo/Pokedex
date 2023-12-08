import PropTypes from 'prop-types'
import { useEffect, useState } from 'react';
import axios from 'axios';
import "../index.css"


function PokeCard({pokemon, setCurrentPokemon, currentPokemon, special, setSpecial}) {
    const [current, setCurrent] = useState(currentPokemon);
    const [pokeImage, setPokeImage] = useState();  

    useEffect(()=>{
      if(currentPokemon){
        setPokeImage(currentPokemon.sprites.front_default)
      }
    },[]) 

    useEffect(() => {
         axios.get(pokemon.url)
          .then(res => {(
            setPokeImage(res.data.sprites.front_default))
            setCurrent(res.data)
          })
        
      },[currentPokemon])   // CAMBIADO DE pokemon a CURRENT POKEMON
       

        
        
    function showPokemonInfo(){
      setCurrentPokemon(current)
      document.getElementById("dialog").showModal()
    }
    function showType() {
      setCurrentPokemon(current)
      document.querySelector(".showType").classList.toggle(".visibility")
    }
    
    // if(currentPokemon != ""){
    //   return (
    //     <div className='card'  onClick={showPokemonInfo}  onMouseOver={ showType } >
    //         <img className='pokeImage' src={pokeImage} alt='no-picture'></img>
    //         <h1 className='pokeName'>{pokemon.name}</h1> 
    //         {/* <div className='showType'>{current.name}</div> */}
    //         {current && <div className='showType visibility'>{current.types[0].type.name}</div>}
    //     </div>
    //   )
    // }


    return (
        <div className={special ? "card specialCard" :'card'}  onClick={showPokemonInfo}  onMouseOver={ showType } onMouseLeave={()=> setSpecial(null)} >
            <img className='pokeImage' src={pokeImage} alt='no-picture'></img>
            <h1 className='pokeName'>{pokemon.name}</h1> 
            {/* <div className='showType'>{current.name}</div> */}
            {current && <div className='showType visibility'>{current.types[0].type.name}</div>}
        </div>
  )
  }

PokeCard.propTypes = {
    pokemon: PropTypes.object,
    setCurrentPokemon: PropTypes.func,
    currentPokemon: PropTypes.object
}

export default PokeCard
