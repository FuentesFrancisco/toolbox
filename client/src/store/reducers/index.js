import { SET_TEXT } from '../actions'

const initialState = {
  // estado inicial de nuestro store
  text: []
}

function rootReducer (state = initialState, action) {
  switch (action.type) {
    case SET_TEXT:
      return {
        ...state,
        text: [action.payload, ...state.text]
      }
    default:
      return state
  }
}

export default rootReducer
