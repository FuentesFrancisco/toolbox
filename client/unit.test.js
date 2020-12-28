import React from 'react'
import ReactDom from 'react-dom'
import ReverseWord from './src/Components/ReverseWord'
import NavBar from './src/Components/NavBar'
import Result from './src/Components/Result'
import store from './src/store/store'
import { Provider } from 'react-redux'
import '@testing-library/jest-dom'
import renderer from 'react-test-renderer'
import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk'
import * as actions from './src/store/actions'
import fetchMock from 'fetch-mock'
import expect from 'expect'
import App from './src/App'
import rootReducer from './src/store/reducers'
import { render, fireEvent, screen } from './Utils'

const setup = () => {
  const utils = render(<NavBar />)
  const input = utils.getByLabelText('Search')
  return {
    input,
    ...utils
  }
}

const middlewares = [thunk]
const mockStore = configureMockStore(middlewares)

describe('renderizado de componentes', () => {
  it('renderizado sin errores', () => {
    let word = [{ text: 'olah' }]
    const div = document.createElement('div')
    ReactDom.render(<ReverseWord text={word} />, div)

    const div2 = document.createElement('div')
    ReactDom.render(
      <Provider store={store}>
        <NavBar />
      </Provider>,
      div2
    )

    const div3 = document.createElement('div')
    ReactDom.render(
      <Provider store={store}>
        <Result />
      </Provider>,
      div3
    )

    const div4 = document.createElement('div')
    ReactDom.render(
      <Provider store={store}>
        <App />
      </Provider>,
      div4
    )
  })
  it('Renderizamos componente Result conectado a nuestro estado de redux', () => {
    render(<Result />, { initialState: { text: [{ text: 'aloh' }] } })
    expect(screen.getByText(/aloh/)).toBeInTheDocument()
    expect(screen.getByText(/aloh/i)).toBeInTheDocument()
  })

  it('Renderizamos componente Result conectado a nuestro estado de redux', () => {
    render(<Result />, {
      initialState: {
        text: [{ text: 'aloh' }, { text: 'somos', palindrome: true }]
      }
    })
    expect(
      screen.getByText(/aloh/, /somos, soy un polindrome!/i)
    ).toBeInTheDocument()
  })

  it('Renderizamos componente ReverseWord recibiendo parametros por props', () => {
    let word = { text: 'aloh' }
    render(<ReverseWord text={word} />)
    expect(screen.getByText(/aloh/i)).toBeInTheDocument()
  })

  it('Renderizamos componente ReverseWord recibiendo parametros por props', () => {
    let word = { text: 'somos', palindrome: true }
    render(<ReverseWord text={word} />)
    expect(screen.getByText(/somos, soy un polindrome!/i)).toBeInTheDocument()
  })
})

describe('Actions redux', () => {
  afterEach(() => {
    fetchMock.restore()
  })

  it('llamamos a la accion sendText con la palabra test', () => {
    const expectedActions = [{ type: 'SET_TEXT', payload: { text: 'tset' } }]
    const store = mockStore({ text: [] })
    return store.dispatch(actions.sendText('test')).then(() => {
      expect(store.getActions()).toEqual(expectedActions)
    })
  })

  it('llamamos a la accion sendText con la palabra somos que es ponindrome', () => {
    const expectedActions = [
      { type: 'SET_TEXT', payload: { text: 'somos', palindrome: true } }
    ]
    const store = mockStore({ text: [] })
    return store.dispatch(actions.sendText('somos')).then(() => {
      expect(store.getActions()).toEqual(expectedActions)
    })
  })

  it('llamamos a la accion sendText sin ningun input', () => {
    const expectedActions = { error: 'no text' }
    const store = mockStore({ text: [] })
    return store.dispatch(actions.sendText('')).then(() => {
      let result = store.getActions()
      expect(result[0].payload.response.status).toEqual(400)
      expect(result[0].payload.response.data).toEqual(expectedActions)
    })
  })
})

describe('Reducers Redux', () => {
  it('comprobamos que el inital state sea correcto', () => {
    expect(rootReducer(undefined, {})).toEqual({
      text: []
    })
  })

  it('Cargamos 1 valor a nuestro estado de redux', () => {
    expect(
      rootReducer(undefined, {
        type: 'SET_TEXT',
        payload: { text: 'tset' }
      })
    ).toEqual({
      text: [{ text: 'tset' }]
    })
  })

  it('Le agregamos otro valor a nuestro estado de redux que ya tiene informacion', () => {
    expect(
      rootReducer(
        { text: [{ text: 'aloh' }] },
        {
          type: 'SET_TEXT',
          payload: { text: 'tset' }
        }
      )
    ).toEqual({
      text: [{ text: 'tset' }, { text: 'aloh' }]
    })
    expect(
      rootReducer(
        { text: [{ text: 'tset' }, { text: 'aloh' }] },
        {
          type: 'SET_TEXT',
          payload: { text: 'somos', palindrome: true }
        }
      )
    ).toEqual({
      text: [
        { text: 'somos', palindrome: true },
        { text: 'tset' },
        { text: 'aloh' }
      ]
    })
    expect(
      rootReducer(
        { text: [{ text: 'tset' }, { text: 'aloh' }] },
        {
          type: 'FAKE_TYPE',
          payload: { text: 'somos', palindrome: true }
        }
      )
    ).toEqual({
      text: [{ text: 'tset' }, { text: 'aloh' }]
    })
  })
})

describe('test input Navbar', () => {
  test('No debe dejar que ingresen numeros en el input', () => {
    const { input } = setup()
    fireEvent.change(input, { target: { value: '123hola' } })
    expect(input.value).toBe('hola')
  })

  test('debe setear bien un input correcto', () => {
    const { input } = setup()
    fireEvent.change(input, { target: { value: 'hola' } })
    expect(input.value).toBe('hola')
  })

  test('debe eliminar los espacios en blanco ingresado en el input', () => {
    const { input } = setup()
    fireEvent.change(input, { target: { value: 'hola     ' } })
    expect(input.value).toBe('hola')
  })
})
