import React, { Component } from 'react'
import { DayPicker } from 'react-day-picker'
import 'react-day-picker/lib/style.css'
import './SelectDate.css'
import { FaCheckCircle } from 'react-icons/fa'
import moment from 'moment'

export default class SelectDate extends Component {
  state = {
    closing: false
  }
  onDayClick = (date, disabled) => {
    console.log(disabled)
    if (disabled.disabled) return
    let m = moment(date).format('YYYY-MM-DD')
    console.log(m)
    this.props.updateDay(m)
  }

  onclose = () => {
    this.setState(
      {
        closing: true
      },
      () => {
        setTimeout(() => {
          this.props.closeDate()
        }, 200)
      }
    )
  }
  render() {
    return (
      <div className={`date ${this.state.closing ? 'slideOutRight' : ''}`}>
        <DayPicker
          disabledDays={{ before: new Date() }}
          onDayClick={this.onDayClick}
        />
        <FaCheckCircle onClick={this.onclose} className='button' />
      </div>
    )
  }
}
