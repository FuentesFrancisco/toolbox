import React, { useState } from 'react'
import { connect } from 'react-redux'
import { sendText } from '../store/actions'
import { useDispatch } from 'react-redux'

// componente funcional
const NavBar = () => {
  const [input, setInput] = useState('') //hook para capturar nuestro input
  const [error, setError] = useState('you must enter text') //hook para capturar si hay errores en nuestro input

  const dispatch = useDispatch() // utilizaremos useDispatch para despachar acciones a redux

  const handleChange = e => {
    let letter = letters(e.target.value) // funcion para unicamente poder ingresar letras en nuestro input
    setInput(letter) // cambiamos nuestro state con la letra nueva ingresada
    setError(validate(letter)) //validamos que se cumpla lo requerido y cambiamos nuestro error
  }

  const hanldeClick = () => {
    dispatch(sendText(input)) // despachamos nuestro accion pasandole el input ingresado como parametro
    setInput('') // restablecemos el input como vacio
    setError('you must enter text') // volvemos el error a su estado original
  }

  const letters = string => {
    //funcion que permite unicamente ingresar letras

    let out = ''
    let filtro = 'abcdefghijklmnñopqrstuvwxyzABCDEFGHIJKLMNÑOPQRSTUVWXYZ' //Caracteres validos

    //Recorremos el texto y verificar si el caracter se encuentra en la lista de validos
    for (let i = 0; i < string.length; i++)
      if (filtro.indexOf(string.charAt(i)) != -1)
        //añadimos a la salida los caracteres validos
        out += string.charAt(i)

    //Retornamos el valor filtrado
    return out
  }

  return (
    <nav
      className='navbar navbar-expand-lg bg-danger mb-3'
      style={{ width: '100%' }}
    >
      <div className='mx-auto'>
        <div className='d-flex'>
          <div>
            {error === 'you must enter at least 2 letters' && (
              <label
                className='position-absolute text-danger  fs-6'
                style={{ left: '45%', top: '22px' }}
              >
                {error}
              </label>
            )}
            <input
              className={
                error === 'you must enter at least 2 letters'
                  ? 'form-control me-3 mt-2 mb-2 is-invalid'
                  : 'form-control me-3 mt-2 mb-2'
              }
              placeholder='insert text'
              style={{ width: '500px' }}
              type='Search'
              aria-label='Search'
              value={input}
              onChange={e => handleChange(e)}
            />
          </div>

          {!error ? (
            <button
              className=' btn mt-2 mb-2'
              style={{ backgroundColor: ' #6610f2' }}
              onClick={hanldeClick}
            >
              send
            </button>
          ) : (
            <button
              className=' btn mt-2 mb-2'
              style={{ backgroundColor: ' #6610f2' }}
              disabled
            >
              send
            </button>
          )}
        </div>
      </div>
    </nav>
  )
}

function validate (input) {
  // funcion para validar que el input al menos contenga 2 caracteres
  if (!input || (input && input.length <= 1)) {
    return 'you must enter at least 2 letters'
  }
}

export default NavBar
