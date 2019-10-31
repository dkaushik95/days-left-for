import React, { Component } from 'react'
import moment from 'moment'
import './Greeting.css'
import TextInput from '../TextInput/TextInput'

export default class Greeting extends Component {
  state = {
    name: '[enter name]',
    greeting: 'Good morning '
  }

  changeName = e => {
    // Change name here
    this.setState({
      name: e.target.value
    })
  }

  componentDidMount() {
    let name = localStorage.getItem('name')
    this.setState({
      greeting: `Good ${this.getGreeting(moment())} `,
      name: name ? name.trim() : '[enter name]'
    })
  }

  onBlur = e => {
    let newName = this.state.name.trim()
    if (newName === '') {
      newName = '[enter name here]'
      localStorage.removeItem('name')
    } else {
      localStorage.setItem('name', newName)
    }
    this.setState({
      name: newName
    })
  }

  getGreeting = m => {
    let greeting = ''
    var split_afternoon = 12 //24hr time to split the afternoon
    var split_evening = 17 //24hr time to split the evening
    var currentHour = parseFloat(m.format('HH'))

    if (currentHour >= split_afternoon && currentHour <= split_evening) {
      greeting = 'afternoon'
    } else if (currentHour >= split_evening) {
      greeting = 'evening'
    } else {
      greeting = 'morning'
    }

    return greeting
  }

  render() {
    return (
      <div className='greetingContainer slideInTop'>
        <header className='header'>
          <h1 className='heading'>
            {this.state.greeting}
            <TextInput name='name' default='[enter name here]' />
          </h1>
        </header>
      </div>
    )
  }
}
