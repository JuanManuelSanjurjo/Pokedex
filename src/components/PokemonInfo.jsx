import PropTypes from 'prop-types'
import { useState, useEffect } from 'react';
import axios from "axios";
import MoveInfo from './MoveInfo';
import EvolutionChain from './EvolutionChain';
import AbilityInfo from './AbilityInfo';


function PokemonInfo({pokeInfo, special, setSpecial}) {
  const [species, setSpecies] = useState();
  const [moveName, setMoveName] = useState();
  const [abilityName, setAbilityName] = useState();
  const [evolChainUrl, setEvolChainUrl] = useState()
  const [evolChain, setEvolChain] = useState()


  
  useEffect(() => {
    let cancel; 
    axios.get(`https://pokeapi.co/api/v2/pokemon-species/${pokeInfo.name}`, {cancelToken: new axios.CancelToken( c => cancel = c)})
      .then(res => { setSpecies(res.data) 
        setSpecial(res.data?.is_legendary || res.data?.is_mythical);
      }).catch( ()=> {
        setSpecial(false)
      })
      return () => {
        cancel();
      }
  }, [pokeInfo])
  
  function handleCloseDialog(e){  // ()=>  e.target.close() funciona pero tira warns cuando el evento es incorrecto
      // setMove(false)
      if(e.target.close){
        e.target.close()
      } 
    }
    function handleAbilityDialog(name){
      document.getElementById("abilityDialog").showModal()
      setAbilityName(name);
    }
    function handleMoveDialog(name){
      document.getElementById("dialogInfo").showModal()
      setMoveName(name);
    }

    function handleEvolutionChainDialog(url){
      setEvolChainUrl(url)
      document.getElementById("evolutionChain").showModal()
    }
  

    useEffect(()=>{
      let cancel; 
      axios.get(evolChainUrl, {cancelToken: new axios.CancelToken( c => cancel = c)})
        .then(res => { 
          setEvolChain(res.data) 
        }).catch( ()=> {
          setEvolChain("") 
        })
        return () => {
          cancel();
        }
    },[evolChainUrl])



    function makeEvolutionChain(){
      let chain= {};

      if(evolChain?.chain?.species?.name){
        chain.firstForm = evolChain?.chain?.species?.name;
      }
      if(evolChain?.chain?.evolves_to[0]?.species?.name){
        chain.secondForm = evolChain?.chain?.evolves_to[0]?.species?.name;
      }
      if(evolChain?.chain?.evolves_to[0]?.evolves_to[0]?.species?.name){
        chain.thirdForm = evolChain?.chain?.evolves_to[0]?.evolves_to[0]?.species?.name;
      }
      if(evolChain?.chain?.evolves_to[0]?.evolution_details[0]?.min_level){
        chain.minLvl1st = evolChain?.chain?.evolves_to[0]?.evolution_details[0]?.min_level;
      }
      if(evolChain?.chain?.evolves_to[0]?.evolves_to[0]?.evolution_details[0]?.min_level){
        chain.minLvl2nd = evolChain?.chain?.evolves_to[0]?.evolves_to[0]?.evolution_details[0]?.min_level;
      }
      return chain;
    }
   
   
  return (
    <>
    <dialog  id="dialog"  className={special ? "pokeInfo specialsAnimation" : "pokeInfo"} /*style={style}*/   onClick={(handleCloseDialog)} > 

        <div className='infoContainer'>
            <div className='infoNameImageContainer'>
                <div>
                  <h2 className='infoName'>{ `${pokeInfo.name}` }</h2>
                  <div className='infoTypeContainer'>{pokeInfo.types.map( t => {
                    return ( <h4  key={pokeInfo.types.indexOf(t)} className={`infoType ${t.type.name}`} >{ `${t.type.name}` } </h4>
                    )})}
                  </div>
                </div>
                <img className='infoImage' src={pokeInfo.sprites.other["official-artwork"].front_default}></img> 
            </div>
            <div className='infoStats'>
            { species &&  
              <div style={{display: "grid", gridTemplateColumns:" 1fr 1fr"}}>
                <div>
                    {species.is_legendary && <p className="special" style={{color: "red"}} > { "Legendary"   } </p>} 
                    {species.is_mythical && <p className="special" style={{color: "orangered"}} > { "Mythical"   } </p>} 
                    {!species.is_mythical && !species.is_legendary &&<p className="noSpecial"> { "Normal"} </p>} 
                    {/* <p>Evolves from: {species.evolves_from_species ? species.evolves_from_species.name : "none"} </p> */}
                    <p>{`Evolution Chain:  `}</p>
                    <p>{species.generation.name ? species.generation.name.replace("-", ": "): "-"} </p>
                    <p>{`Introduction:`}<span> {`Pokemon  ${pokeInfo.game_indices[0]?.version.name}`}</span></p> 
                    
                </div>
                <div>
                    <p>{`id: `}<span>{pokeInfo.id}</span></p>
                     <button className='btnEvolChain' onClick={()=> handleEvolutionChainDialog(species.evolution_chain.url) }>Show</button>
                    <p>{`Height:  `} <span>{pokeInfo.height}</span></p>
                    <p>{`Weight:  `} <span>{pokeInfo.weight}</span></p>
                    
                </div>
              </div>
            }
                  <hr style={{margin: "15px auto", width: "95%"}}/> 
                <div className='statsAndAbilities'>
                    <div >
                      <p style={{textTransform:"none"}}>Base stats:</p>
                      {pokeInfo.stats.map( s => {
                        return (<p key={pokeInfo.stats.indexOf(s)}> {`${s.stat.name}:` }   <span> {`${s.base_stat}` } </span> </p>)      
                      })}
                    </div>
                    <div className='infoSecondColumn'>
                      <div>
                        <p style={{textTransform:"none"}}>Abilities : </p>
                        {pokeInfo.abilities.map( a => {
                          return (<p className='ability' onClick={()=> handleAbilityDialog(a.ability.name)} key={pokeInfo.abilities.indexOf(a)}> {`${a.ability.name}` }</p>)     
                        })}
                      </div>
                        <p style={{textTransform:"none", marginTop: "10px"}}>Move list: </p>
                      <div className='moveList'>
                      {pokeInfo.moves.map( m => {
                        return (<p className='moveItem' value={m}   onClick={()=>handleMoveDialog(m.move.name.toLowerCase())}  key={pokeInfo.move?.indexOf(m)}>{`${m.move.name}` }</p>)      
                      })}                       
                      </div>
                    </div>
                </div>
            </div>
            { species && 
              <p className='pokemonDescription'>
                            {species.flavor_text_entries.filter(e => e.language.name == "en") ? species.flavor_text_entries.filter(e => e.language.name == "en")[0].flavor_text.replace("\f", " ") : "No description for this pokemon"}
                        </p> }
        </div>
      

     
          <dialog id="dialogInfo">
            <MoveInfo moveName={moveName}  /> 
          </dialog>

          <dialog id="evolutionChain">
          <EvolutionChain chain={ makeEvolutionChain()}  />
          </dialog>
          
          <dialog id="abilityDialog">
          <AbilityInfo abilityName={ abilityName}  />
          </dialog>
                        


    </dialog>
    
    </>
  )
}

PokemonInfo.propTypes = {
  pokeInfo: PropTypes.object
}


// const colors = {
//   grass:    "#008000",
//   bug:      "#008000", 
//   poison:   "#5e4383",
//   ghost:    "#5e4383",
//   fire:     "#b10101",
//   fighting: "#b10101",
//   water:    "#034583",
//   electric: "#ffe600",      //    color: #242424;
//   flying:   "#add8e6de",
//   steel:    "#add8e6de",
//   ice:      "#add8e6de",    //color: rgb(36, 36, 36);
//   normal:   "#f5f0dc",      //color: rgb(36, 36, 36);
//   ground:   "#644823",
//   rock:     "#644823",
//   fairy:    "#ffc0cb",      //color: rgb(36, 36, 3
//   dark:     "#000000d5",
//   dragon:   ":#ff4500"
//   }


export default PokemonInfo
