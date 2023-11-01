import { useEffect, useState } from "react"
import PokemonList from "./components/PokemonList";
import axios from "axios";
import Pagination from "./components/Pagination";
import PokemonInfo from "./components/PokemonInfo"
import Loading from "./components/Loading";
import SearchError from "./components/SearchError";
import Footer from "./components/Footer";

function App() {
  const [pokemons, setPokemons] = useState();
  const [currentPage, setCurrentPage] = useState("https://pokeapi.co/api/v2/pokemon/");
  const [nextPage, setNextPage] = useState("https://pokeapi.co/api/v2/pokemon/");
  const [prevPage, setPrevPage] = useState("https://pokeapi.co/api/v2/pokemon/");
  const [loading, setLoading] = useState(true);
  const [currentPokemon, setCurrentPokemon] = useState();
  const [searchError, setSearchError] = useState(false);
  const [special, setSpecial] = useState(false)

   
  useEffect(() => {
    setLoading(true)
    const abort = new AbortController;
    axios.get(currentPage, {signal: abort.signal})
      .then(res => {
        setLoading(false)
        setNextPage(res.data.next)
        setPrevPage(res.data.previous)
        setPokemons(res.data.results.map(p => p ))
      }).catch((error) => {
        if (axios.isCancel(error)) {
          console.log("Request canceled:", error.message);
        } else {
          console.log("Another error occurred:", error.message);
        }
      });
    return () => {
      abort.abort();
    }
  }, [currentPage])

  // useEffect(() => {
  //   setLoading(true)
  //   let cancel;
  //   axios.get(currentPage, {cancelToken: new axios.CancelToken( c => cancel = c)})
  //     .then(res => {
  //       setLoading(false)
  //       setNextPage(res.data.next)
  //       setPrevPage(res.data.previous)
  //       setPokemons(res.data.results.map(p => p ))
  //     }).catch((error) => {
  //       if (axios.isCancel(error)) {
  //         console.log("Request canceled:", error.message);
  //       } else {
  //         console.log("Another error occurred:", error.message);
  //       }
  //     });
  //   return () => {
  //       cancel();
  //   }
  // }, [currentPage])


  function goToNextPage(){
    setCurrentPage(nextPage)
    setSearchError(false)
  }

  function goToPrevPage(){
    setCurrentPage(prevPage)
     setSearchError(false)
  }

  if(loading) {
    return (
      <Loading />  /* HACER COMPONENTE DE CARGA A PARTE CON UNA POKEBOLA*/
    )
  }

  return (
    <>
      
      <div id="app">
        <Pagination special={special} setSpecial={setSpecial} setSearchError={setSearchError} searchError={searchError} setCurrentPage={setCurrentPage} goToNextPage={nextPage ? goToNextPage : null }   goToPrevPage={prevPage ? goToPrevPage : null} setPokemons={setPokemons}  setCurrentPokemon={setCurrentPokemon}   />
        {!searchError && <PokemonList pokemons={pokemons} setPokemons={setPokemons}  special={special} setSpecial={setSpecial}  setCurrentPokemon={setCurrentPokemon} currentPokemon={currentPokemon}/> }
        {currentPokemon && <PokemonInfo  pokeInfo={currentPokemon}  special={special} setSpecial={setSpecial}/>}
        {searchError && <SearchError setSearchError={setSearchError} />}
      </div>
      <Footer />
      </>
  )
}

export default App
