/* global chrome */

chrome.runtime.onMessage.addListener(async function(
  request,
  sender,
  sendResponse
) {
  if (request.contentScriptQuery === 'getImage') {
    let url = request.url
    console.log(url)
    fetch(url)
      .then(res => res.status === 200)
      .then(isGood => sendResponse(isGood))
      .catch(err => sendResponse(false))
    // .then(res => {
    //   if (res.status === 200) {
    //     sendResponse(true)
    //   } else {
    //     sendResponse(false)
    //   }
    // })
    // .catch(err => {
    //   sendResponse(false)
    // })
    return true
  }
})
