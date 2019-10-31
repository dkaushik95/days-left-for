import React, { Component } from 'react'
import './Days.css'
import moment from 'moment'
import TextInput from '../TextInput/TextInput'
import SelectDate from '../SelectDate/SelectDate'

export default class Days extends Component {
  state = {
    date: '',
    open: false
  }

  componentDidMount() {
    let dateContent = localStorage.getItem('date')
    if (!dateContent) {
      dateContent = this.getNewYear()
    }
    this.setState({
      date: dateContent
    })
  }

  getNewYear = () => {
    return `${moment().format('YYYY')}-12-31`
  }

  daysTo = () => {
    let m = moment(this.state.date)
    return m.diff(moment(), 'days').toString()
  }

  weeksTo = () => {
    let m = moment(this.state.date)
    return m.diff(moment(), 'weeks').toString()
  }

  weekendsTo = () => {
    let curr = moment()
    let daysTo = this.daysTo()
    let weekendsTo = 0
    let weekdaysTo = 0
    for (let i = 0; i < daysTo; i++) {
      let dd = curr.format('dd')
      if (dd === 'Sa' || dd === 'Su') {
        weekendsTo++
      } else {
        weekdaysTo++
      }

      curr.add(1, 'day')
    }
    // weekendsTo = parseInt(weekendsTo / 2)
    return { weekendsTo, weekdaysTo }
  }

  openDate = () => {
    this.setState({
      open: true
    })
  }

  closeDate = () => {
    this.setState({
      open: false
    })
  }
  updateDay = date => {
    localStorage.setItem('date', date)
    this.setState({
      date: date
    })
  }

  render() {
    return (
      <div className='root slideInBottom'>
        <div className='numbers'>
          <div className='big' onClick={this.openDate}>
            {this.daysTo()}
          </div>
          <div className='small'>
            <div className='weeks'>
              <div className='number'>{this.weeksTo()}</div>
              <div className='text'>Weeks</div>
            </div>
            <div className='weeks'>
              <div className='number'>{this.weekendsTo().weekendsTo}</div>
              <div className='text'>Holidays</div>
            </div>
            <div className='weeks'>
              <div className='number'>{this.weekendsTo().weekdaysTo}</div>
              <div className='text'>Workdays</div>
            </div>
          </div>
        </div>
        <div className='bigText'>
          days <TextInput name='daysLeftText' default='to new Year!' />
        </div>
        {this.state.open ? (
          <SelectDate closeDate={this.closeDate} updateDay={this.updateDay} />
        ) : null}
      </div>
    )
  }
}
