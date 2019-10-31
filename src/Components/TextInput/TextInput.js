import React, { Component } from 'react'
import './TextInput.css'

export default class TextInput extends Component {
  state = {
    value: ''
  }

  componentDidMount() {
    let value = localStorage.getItem(this.props.name)
    this.setState({
      value: value ? value.trim() : this.props.default.trim()
    })
  }

  onChange = e => {
    this.setState({
      value: e.target.value
    })
  }

  onBlur = e => {
    let newValue = this.state.value.trim()
    if (newValue === '') {
      newValue = this.props.default.trim()
      localStorage.removeItem(this.props.name)
    } else {
      localStorage.setItem(this.props.name, newValue)
    }
    this.setState({
      value: newValue
    })
  }

  render() {
    return (
      <input
        type='text'
        name={this.props.name}
        id={this.props.name}
        value={this.state.value}
        onChange={this.onChange}
        style={{
          width: this.state.value.length + 1 + 'ch'
        }}
        onBlur={this.onBlur}
        autoComplete='off'
      />
    )
  }
}
