import React, { Component } from 'react'

class ReverseWord extends Component {
  //componente de tipo clase (extends component)
  constructor (props) {
    super(props)
  }

  render () {
    return (
      <div className='card mb-2 ml-10 rounded-3'>
        <div className='card-body'>
          {this.props.text.text}
          {this.props.text.palindrome && ', soy un polindrome!'}
        </div>
      </div>
    )
  }
}

export default ReverseWord
