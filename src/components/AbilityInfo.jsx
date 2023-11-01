import axios from 'axios';
import { useState, useEffect } from 'react';

function AbilityInfo({abilityName}) {
  const [ability, setAbility] = useState();

  const [loading, setLoading] = useState(true);

  
  useEffect(()=>{
      let cancel;
      setLoading(true)
      axios.get(`https://pokeapi.co/api/v2/ability/${abilityName}`, {cancelToken: new axios.CancelToken( c => cancel = c)})
      .then(res => { 
        setLoading(false)

        setAbility(res.data) 
      }) 
      return () => {
        cancel();
      }
  },[abilityName])

  if(loading){
    return (
      <img src=" /pokeball.png" className="pokeballImg" style={{width: "20%"}}></img>
    )
  }
  
  
  return (
    <div>
      <>
    <div className='abilityInfo'>
      <div className='statsAndAbilities' style={{display:"block"}}>
        <div >
          <h2 className='infoName'>{abilityName}</h2>
          <p>          
          {ability?.effect_entries.filter(e => e.language.name == "en") ? ability.effect_entries.filter(e => e.language.name == "en")[0].effect.replace("\f", " ") : "No description for this ability"}
          </p>
        </div>
      </div>
    </div>
        <div className='abilityInfo' style={{marginTop: "10px" }}>
          <p className='abilityFlavorText'>
          {ability?.flavor_text_entries.filter(e => e.language.name == "en") ? ability.flavor_text_entries.filter(e => e.language.name == "en")[0].flavor_text.replace("\f", " ") : "No description for this ability"}
          </p>
        </div>
    {/* <p className='pokemonDescription'>
    {ability?.effect_entries.filter(e => e.language.name == "en") ?`Effect : ${ability.effect_entries.filter(e => e.language.name == "en")[0].effect.replace("\f", " ")}` : "No description for this ability"}
    </p> */}
      {/* {ability?.effect_entries[0]?.effect && <p className='pokemonDescription'> {`Effect :  ${ability?.effect_entries[0]?.effect}`}</p> } */}
    </>

   {/* <p>{chain[1] ? `Firs form: ${chain[0]}` : "Only form"} </p>
   {chain[1] && <p>Second form: {chain[2] ? `${chain[1]} (lvl: ${chain[2]})` : `${chain[1]}` } </p>}
   {chain[3] && <p>Third form: {chain[4] ? `${chain[3]} (lvl: ${chain[4]})` : `${chain[3]}` } </p>}       */}
    </div>
  )
}

AbilityInfo.propTypes = {

}

export default AbilityInfo
