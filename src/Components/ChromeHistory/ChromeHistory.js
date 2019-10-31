import React, { Component } from 'react'
import './ChromeHistory.css'

export default class ChromeHistory extends Component {
  state = {
    topVisits: [],
    searchHistory: []
  }

  componentDidMount() {
    let topsites = JSON.parse(localStorage.getItem('topSites'))
    let history = JSON.parse(localStorage.getItem('history'))

    let searchHistory = []
    history.forEach(item => {
      searchHistory.push({
        title: item.title.split('-')[0],
        url: item.url
      })
    })

    let topVisits = []
    topsites.forEach(item => {
      let pathArray = item.url.split('/')
      topVisits.push({
        url: item.url,
        title: item.title,
        img: `https://besticon-demo.herokuapp.com/icon?url=${
          pathArray[2]
        }&size=64`
      })
    })

    this.setState({
      topVisits: topVisits ? topVisits : [],
      searchHistory: searchHistory ? searchHistory : []
    })
  }

  onError = e => {
    e.target.setAttribute('src', 'https://www.google.com/favicon.ico')
  }

  getTruncated = title => {
    return title.substring(0, Math.min(title.length, 10))
  }

  render() {
    return (
      <div className='footer'>
        <p>Searches related to your history</p>
        <div className='search'>
          {this.state.searchHistory.map((item, i) => (
            <a key={i} href={item.url}>
              {item.title}
            </a>
          ))}
        </div>

        <div className='topSites'>
          {this.state.topVisits.map((item, i) => (
            <a title={item.title} key={i} href={item.url} className='item'>
              <img onError={this.onError} src={item.img} alt={item.title} />
              <p>{this.getTruncated(item.title)}</p>
            </a>
          ))}
        </div>
      </div>
    )
  }
}
