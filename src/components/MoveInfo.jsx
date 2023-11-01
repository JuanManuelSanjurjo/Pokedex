import PropTypes from 'prop-types'
import { useEffect, useState } from 'react'
import axios from 'axios';

function MoveInfo({moveName}) {
  const [move, setMove] = useState();
  const [loading, setLoading] = useState(true);

  // useEffect(()=>{
  //     let cancel;
  //     axios.get(`https://pokeapi.co/api/v2/move/${moveName}`, {cancelToken: new axios.CancelToken( c => cancel = c)})
  //     .then(res => { 
  //       setMove(res.data) 
  //     }) 
  //     return () => {
  //       cancel();
  //     }
  // },[moveName])
  useEffect(()=>{
    setLoading(true)
    const abort = new AbortController;
    axios.get(`https://pokeapi.co/api/v2/move/${moveName}`, {signal: abort.signal})
    .then(res => { 
      setLoading(false)
      setMove(res.data) 
    }) 
    return () => {
      abort.abort();
    }
},[moveName])

  if(loading){
    return (
      <img src=" /pokeball.png" className="pokeballImg" style={{width: "20%"}}></img>
    )
  }

  return (
    <>
    <div className='moveInfo'>
          <h2 className='infoName'>{moveName}</h2>
      <div className='statsAndAbilities'>
        <div >
          <p className='moveFlavorText'>
          {move?.flavor_text_entries?.filter(e => e.language.name == "en") ? move?.flavor_text_entries?.filter(e => e.language.name == "en")[0].flavor_text.replace("\f", " ") : "No description for this move"}
          </p>
        </div>
        <div className='moveListSpecs'>
          <p>{move?.accuracy ? `Accuracy:  ${move?.accuracy}` :  `Accuracy : -` }</p>
          <p>{move?.power ? `Power:  ${move?.power}` :  `Power : -` }</p>
          <p>{move?.pp ? `Pp:  ${move?.pp}` :  `Pp: -` }</p>
          <p>{move?.priority ? `Priority :  ${move?.priority}` :  `Priority : -` }</p>
          <p>{move?.type?.name ? `Type :  ${move?.type?.name}` :  `Type : -` }</p>
          <p>{move?.id? `Id :  ${move?.id}` :  `Id : -` }</p>
          {/* {move?.flavor_text_entries[0]?.flavor_text && <p className='moveFlavorText'>{move?.flavor_text_entries[0]?.flavor_text}</p>} */}
        </div>
      </div>
    </div>
    <p className='pokemonDescription'>
    {move?.effect_entries.filter(e => e.language.name == "en") ? `Effect : ${move?.effect_entries.filter(e => e.language.name == "en")[0].effect.replace("\f", " ")}` : "No description for this move"}
    </p>
      {/* {move?.effect_entries[0]?.effect && <p className='pokemonDescription'> {`Effect :  ${move?.effect_entries[0]?.effect}`}</p> } */}
    </>
  )
}

MoveInfo.propTypes = {}

export default MoveInfo
