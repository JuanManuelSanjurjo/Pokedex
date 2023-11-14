/* eslint-disable react/prop-types */

import { Link } from "react-router-dom"


function Sidebar({setSidebar}) {

  function closeSidbar(e){
    if(e.target ){
        setSidebar(false)
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
    <div className='sidebar' id='sidebar' onClick={closeSidbar}>
          <h2 className='sidebarTitle '>Links </h2>
          <Link to={`/Pokedex/About`}> 
            <a className='sideBarLink' >About <img className="pokeballImgSmall" src='./pokeball.png'></img></a>
          </Link>
          <a className='sideBarLink' onClick={changeTheme} style={{cursor: "pointer"}}>Switch Theme <img className="pokeballImgSmall" src='./pokeball.png'></img></a>
          <a className='sideBarLink' href='https://pokeapi.co/' target='_blank' rel='noreferrer'>PokeApi <img className="pokeballImgSmall" src='./pokeball.png'></img></a>
          <a className='sideBarLink' href='https://pokemon.fandom.com/es/wiki/Pok%C3%A9mon_Wiki' target='_blank' rel='noreferrer'>Pokemon Wiki <img className="pokeballImgSmall" src='./pokeball.png'></img></a>
          <a className='sideBarLink' href='https://www.pokemon.com/es' target='_blank' rel='noreferrer'>Pokemon Official Site <img className="pokeballImgSmall" src='./pokeball.png'></img></a>
       
    </div>
  )
}


export default Sidebar
