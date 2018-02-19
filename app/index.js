const App = require('./containers/app')
const {Provider} = require('react-redux')
const React = require('react')
const ReactDOM = require('react-dom')
const shell = require('electron').shell

const {createStore} = require('redux')
const app = require('./reducers')

let store = createStore(app)

ReactDOM.render(
  React.createElement(Provider, {store}, React.createElement(App)),
  document.querySelector('.content')
)

document.body.addEventListener('click', event => {
  const a = event.target.closest('a')
  if (a && !event.defaultPrevented) {
    event.preventDefault()
    shell.openExternal(a.href)
  }
}, false)

// const installMap = require('./install-map')
// const listRepo = require('./list-repo')
// loadRepos()
//   .then(repos => index.setState({repos}))
//   .catch(error => {
//     console.error(error)
//     index.setState({error: 'Error loading maps :('})
//   })

// function loadRepos () {
//   const promises = repos.map(repo => {
//     return Promise.all([repo, listRepo(repo)])
//   })

//   return Promise.all(promises).then(results => {
//     return results.map(([repo, files]) => {
//       return Object.assign({}, repo, {files})
//     })
//   })
// }

// function onInstallClick (repo, file) {
//   installMap(file.url, '/tmp/garmin')
// }
