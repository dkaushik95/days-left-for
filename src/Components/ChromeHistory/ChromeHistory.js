import React, { Component } from 'react'
import './ChromeHistory.css'
import { FaChrome } from 'react-icons/fa'
/* global chrome */
// const chrome = {
//   topsites: {
//     get: function() {
//       return [
//         {
//           url: 'https://www.google.com',
//           title: 'Google'
//         },
//         {
//           url: 'https://www.google.com',
//           title: 'Google'
//         },
//         {
//           url: 'https://www.google.com',
//           title: 'Google'
//         },
//         {
//           url: '',
//           title: 'Google'
//         }
//       ]
//     }
//   },
//   history: {
//     search: function(config, callback) {
//       return callback([
//         {
//           title: 'how to get high - Google Search',
//           url: 'https://www/google.con'
//         },
//         {
//           title: 'how to get high - Google Search',
//           url: 'https://www/google.con'
//         },
//         {
//           title: 'how to get high - Google Search',
//           url: 'https://www/google.con'
//         },
//         {
//           title: 'how to get high - Google Search',
//           url: 'https://www/google.con'
//         }
//       ])
//     }
//   }
// }

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
        }&size=32`
        // img: `${pathArray[0]}//${pathArray[2]}/favicon.ico`
      })
    })

    this.setState({
      topVisits: topVisits ? topVisits : [],
      searchHistory: searchHistory ? searchHistory : []
    })
  }

  isImageAvailable = url => {
    return chrome.runtime.sendMessage(
      { contentScrptQuery: 'getImage', url: url },
      function(response) {
        if (chrome.runtime.lastError) {
          console.log(chrome.runtime.lastError.message, response)
        }
        return response
      }
    )
    // return fetch(url)
    //   .then(res => {
    //     if (res.status === 200) {
    //       return true
    //     } else {
    //       return false
    //     }
    //   })
    //   .catch(err => {
    //     return false
    //   })
  }

  onError = e => {
    e.target.setAttribute('src', 'https://www.google.com/favicon.ico')
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
            <a key={i} href={item.url} className='item'>
              {console.log(item)}
              {this.isImageAvailable(item.img) ? (
                <FaChrome
                  style={{
                    fontSize: '2rem'
                  }}
                />
              ) : (
                <img onError={this.onError} src={item.img} alt={item.title} />
              )}
              <p>{item.title}</p>
            </a>
          ))}
        </div>
      </div>
    )
  }
}
