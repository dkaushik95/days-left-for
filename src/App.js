/*global chrome*/
import React, { Component } from 'react'
import './App.css'
import Greeting from './Components/Greeting/Greeting'
import Days from './Components/Days/Days'
import ChromeHistory from './Components/ChromeHistory/ChromeHistory'

export default class App extends Component {
  componentDidMount() {
    this.getSearchHistory()
    this.getTopVisits()
  }
  getSearchHistory = () => {
    chrome.history.search(
      { text: 'google.com/search', maxResults: 4 },
      results => {
        localStorage.setItem('history', JSON.stringify(results))
      }
    )
  }
  getTopVisits = () => {
    chrome.topSites.get(topsites => {
      localStorage.setItem('topSites', JSON.stringify(topsites))
    })
  }
  render() {
    return (
      <div className='app'>
        <Greeting />
        <Days />
        <ChromeHistory />
      </div>
    )
  }
}
