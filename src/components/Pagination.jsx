// import React from 'react'
import PropTypes from 'prop-types'
import { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';


function Pagination({setCurrentPage, goToNextPage,  goToPrevPage, setPokemons, setCurrentPokemon, searchError, setSearchError, special, setSpecial}) {
  const [input, setInput] = useState("");
  const [searching, setSearching] = useState(false);
  

  function searchPokemon(){
    setSearchError(false)
    setSearching(true)
      axios.get(`https://pokeapi.co/api/v2/pokemon/${input}`)
        .then(res => {
          setPokemons([res.data.species])
          setCurrentPokemon(res.data)
          setSpecial(res.data.species.is_legendary || res.data.species?.is_mythical);
          setSearching(false)
          
        }).catch(()=>{
            setSearchError(true)
            setSearching(false)
            setCurrentPage("https://pokeapi.co/api/v2/pokemon/")
            // setSpecial(false);

        })
    }

   

  function inputSearch(e){
    setInput(e.target.value.toLowerCase());
  }

  function handleEnter(e){
    if(e.key == "Enter" && input !=""){
      searchPokemon()
      // e.target.value("")
    }
  }

  function changeTheme(){
    if(document.documentElement.style.getPropertyValue("--backgroundMain") == "rgb(9, 24, 56)"){
      document.documentElement.style.setProperty("--backgroundMain", "rgb(34, 16, 58)")
      document.documentElement.style.setProperty("--paginationMainColor", "rgb(161, 13, 137)")
    }else{
      document.documentElement.style.setProperty("--backgroundMain", "rgb(9, 24, 56)")
      document.documentElement.style.setProperty("--paginationMainColor", "#b10101")
    }
    
  }
  
  return (
    <div className='paginationContainer'>
        <a href=''><img className="headerImg" title="Home" src="./Pokédex_logo.png"></img></a>    
        <div className='searchContainer'>  
          <input  className='searchBar' type='text' placeholder={'Search Pokemon name or id'} onChange={(e)=> inputSearch(e)} onKeyDown={handleEnter} />  
          <img   className="searchImg" src='./magnifying-glass-solid.svg' onClick={input ? searchPokemon : null}></img>
          <div className='searchTooltip'>Search</div>
          {searching && <span style={{color: "antiquewhite", fontWeight: 600, marginLeft: "25px", letterSpacing: "0.05rem"}}> Searching...</span>}
        </div>

{/*  A DESARROLLAR nav con mas funcionalidad */}
        {/* <nav>
          <div>  
            <a href=''>About</a>
          </div>
          <div>  
            <a href=''>Contact</a>
          </div>
          <div>Sort by
            <ul>
              <li><a href=''>Type</a></li>
              <li><a href=''> Generation</a></li>
              <li><a href=''> Game version</a></li>
            </ul>
          </div>
          <div>Find
            <ul>
              <li><a href=''>Moves</a></li>
              <li><a href=''>Abilities</a></li>
            </ul>
          </div>
          <div style={{cursor: "pointer"}} onClick={changeTheme}>
            Theme
          </div>
        </nav> */}

        <div className='pageButtons'>
            {goToPrevPage && !searchError && <button className="pageBtn" onClick={goToPrevPage}>Prev </button>}
            {goToNextPage && !searchError && <button className="pageBtn" onClick={goToNextPage}>Next </button>}
        </div>
    </div>
  )
}

Pagination.propTypes = {
    goToNextPage: PropTypes.func,
    goToPrevPage: PropTypes.func, 
    setPokemons: PropTypes.func,
    setCurrentPokemon: PropTypes.func,
    setSearchError: PropTypes.func,
    setCurrentPage: PropTypes.func,
    searchError: PropTypes.bool
}


export default Pagination
