import PropTypes from 'prop-types'

function Sidebar({setSidebar}) {

  function closeSidbar(e){
    if(e.target ){
        setSidebar(false)
    }
}

  return (
    <div className='sidebar' id='sidebar' onClick={closeSidbar}>
          <h2 className='sidebarTitle '>Popular links </h2>
          <a className='sideBarLink' href='https://pokeapi.co/' target='_blank' rel='noreferrer'>PokeApi <img className="pokeballImgSmall" src='public\pokeball.png'></img></a>
          <a className='sideBarLink' href='https://pokemon.fandom.com/es/wiki/Pok%C3%A9mon_Wiki' target='_blank' rel='noreferrer'>Pokemon Wiki <img className="pokeballImgSmall" src='./public/pokeball.png'></img></a>
          <a className='sideBarLink' href='https://www.pokemon.com/es' target='_blank' rel='noreferrer'>Official Site <img className="pokeballImgSmall" src='./public\pokeball.png'></img></a>
          <a className='sideBarLink' href='https://pokeapi.co/' target='_blank' rel='noreferrer'>Link a algo <img className="pokeballImgSmall" src='.\public\pokeball.png'></img></a>
          <a className='sideBarLink' href='https://pokeapi.co/' target='_blank' rel='noreferrer'>Link a algo <img className="pokeballImgSmall" src='./public/pokeball.png'></img></a>
       
    </div>
  )
}

Sidebar.propTypes = {
  setSidebar: PropTypes.func
}

export default Sidebar
