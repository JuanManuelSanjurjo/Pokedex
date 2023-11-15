import React from 'react'
import { Link } from 'react-router-dom'
import Footer from './Footer'

function About() {
  return (
    <>
        <div className='paginationContainer'style={{maxHeight:"8vh"}} >
            <Link to={`/Pokedex/`} >
                <img className="headerImg" title="Home" src="./Pokédex_logo.png"></img>  
            </Link>
        </div>
        <div className='aboutSection'>
            <h1>About</h1>

            <p>This project was created using the PokeAPI, an open-source API for retrieving Pokémon data, as a practice project. The PokeAPI provides comprehensive information about Pokémon species, abilities, moves, and more.</p>
            
            <p>For more information about this great API, please visit their official website: <a href="https://pokeapi.co/" target="_blank" rel="noopener noreferrer">https://pokeapi.co/</a></p>
            
            <h2>Project Creator</h2>
            
            <p>This project was created by Juan Manuel Sanjurjo.</p>
            
            <p>GitHub profile: <a href="https://github.com/JuanManuelSanjurjo" target="_blank" rel="noopener noreferrer">github.com/JuanManuelSanjurjo</a></p>
            
            <p>LinkedIn: <a href="https://www.linkedin.com/in/juanmanuelsanjurjo/" target="_blank" rel="noopener noreferrer">LinkedIn</a></p>

        </div>
        <Footer />
    </>
  )
}

export default About