import PropTypes from 'prop-types'

function EvolutionChain({chain}) {

  return (
    <div className='evolInfo'>
   <p>{chain?.firstForm ? `First form: ${chain?.firstForm}` : "Only form"} </p>
   {chain?.secondForm && <p>Second form: {chain?.minLvl1st ? `${chain?.secondForm} (level ${chain?.minLvl1st})` : `${chain?.secondForm}` } </p>}
   {chain?.thirdForm && <p>Third form: {chain?.minLvl2nd ? `${chain?.thirdForm} (level ${chain?.minLvl2nd})` : `${chain?.thirdForm}` } </p>}       
    </div>
  )
}

EvolutionChain.propTypes = {
    chain: PropTypes.object
}

export default EvolutionChain
