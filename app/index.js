const App = require('./containers/app')
const {receiveDevices} = require('./actions')
const {Provider} = require('react-redux')
const React = require('react')
const ReactDOM = require('react-dom')
const shell = require('electron').shell
const {createStore, applyMiddleware} = require('redux')
const app = require('./reducers')
const thunkMiddleware = require('redux-thunk').default
const {loadMaps} = require('./actions')
const Garmin = require('./api/garmin')

const store = createStore(
  app,
  applyMiddleware(thunkMiddleware)
)

store.dispatch(loadMaps())

const garmin = new Garmin()

garmin
  .on('change', (devices) => store.dispatch(receiveDevices(devices)))
  .listDevices()
  .then((devices) => store.dispatch(receiveDevices(devices)))

ReactDOM.render(
  React.createElement(Provider, {store}, React.createElement(App)),
  document.querySelector('#app')
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
