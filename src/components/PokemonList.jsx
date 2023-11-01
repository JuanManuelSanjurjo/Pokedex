import PropTypes from 'prop-types'
import PokeCard from './PokeCard'
import Sidebar from './Sidebar'
import { useState } from 'react'


function PokemonList({pokemons, setCurrentPokemon, currentPokemon, special, setSpecial}) {
    const [sidebar, setSidebar] = useState(false);

    function handleMouse(e){
        if(e.clientX < 10){
            setSidebar(true)
        }
        if(e.clientX > 420){
            setSidebar(false)
        }
    }
    

    return (
    <div className='mainContainter' onMouseMove={handleMouse}>
        {!sidebar && <div className='sidebarTooltip'>Hover for navigation</div>}
        {sidebar && <Sidebar setSidebar={setSidebar}/>}
        <div className='cardContainer'>
        {pokemons.map(p => (
            <PokeCard tabindex={0} key={p.name} pokemon={p} special={special} setSpecial={setSpecial} setCurrentPokemon={setCurrentPokemon}  currentPokemon={currentPokemon} />
            ))} 
        </div>
    </div>
  )
}



PokemonList.propTypes = {
    pokemons: PropTypes.array,
    setCurrentPokemon: PropTypes.func,
    currentPokemon: PropTypes.object
}

export default PokemonList
