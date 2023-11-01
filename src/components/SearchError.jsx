import PropTypes from 'prop-types'

function SearchError({setSearchError}) {

  return (
    <>    
        <div className='searchError'>
            <h1>No Pokemons with that name in the database</h1>
            <button className='pageBtn' onClick={()=> setSearchError(false)}> GO BACK</button>
        </div>
    </>
  )
}

SearchError.propTypes = {
    setSearchError: PropTypes.func
}

export default SearchError
