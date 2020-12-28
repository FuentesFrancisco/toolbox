import Axios from '../../axios'
import Swal from 'sweetalert2'
export const SET_TEXT = 'SET_TEXT' // exportamos las variables para evitar errores de tipeo de los type

export const sendText = input => {
  return function (dispatch) {
    return Axios.get(`iecho?text=${input}`)
      .then(payload => {
        dispatch({
          type: SET_TEXT,
          payload: payload.data
        })
      })
      .catch(err => {
        dispatch({ type: 'ERROR', payload: err })
        Swal.fire({
          icon: 'error',
          title: 'Debe ingresar texto'
        })
      })
  }
}
