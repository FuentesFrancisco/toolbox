import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import ReverseWord from './ReverseWord'

// componente funcional
const Result = ({ text }) => {
  //destructuring de nuestro estado de redux al que nos subscribimos
  useEffect(() => {}, [text]) //hook para actualizar nuestro componente cuando hay un cambio en nuestro estado text de redux

  return (
    <div className='container bg-white pb-2 mt-3' style={{ height: ' 60vh' }}>
      <div className='h3 fw-lighter pt-5 mb-4'>Results:</div>
      <div className='h-75 w-50 mx-auto overflow-auto'>
        {text && text.map((word, i) => <ReverseWord text={word} key={i} />)}
      </div>
    </div>
  )
}

const mapStateToProps = state => {
  return {
    text: state.text
  }
} //seleccionamos a que estados de nuestro store de redux susbsribirnos y le pasaremos a este componente por props

export default connect(mapStateToProps, null)(Result) //otra forma de conectarse a redux
