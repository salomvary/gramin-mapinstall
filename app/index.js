'use strict'

const installMap = require('./install-map')
const listRepo = require('./list-repo')
const MapList = require('./map-list')
const React = require('react')
const ReactDOM = require('react-dom')
const repos = require('./repos')
const shell = require('electron').shell

class Index extends React.Component {
  constructor (props) {
    super(props)
    this.props = props
    this.state = {}
  }

  render () {
    return React.createElement(MapList, {
      onInstallClick: onInstallClick,
      repos: this.state.repos,
      error: this.state.error
    })
  }
}

const index = ReactDOM.render(
  React.createElement(Index),
  document.querySelector('.content')
)

loadRepos()
  .then(repos => index.setState({repos}))
  .catch(error => {
    console.error(error)
    index.setState({error: 'Error loading maps :('})
  })

function loadRepos () {
  const promises = repos.map(repo => {
    return Promise.all([repo, listRepo(repo)])
  })

  return Promise.all(promises).then(results => {
    return results.map(([repo, files]) => {
      return Object.assign({}, repo, {files})
    })
  })
}

function onInstallClick (repo, file) {
  installMap(file.url, '/tmp/garmin')
}

document.body.addEventListener('click', event => {
  const a = event.target.closest('a')
  if (a && !event.defaultPrevented) {
    event.preventDefault()
    shell.openExternal(a.href)
  }
}, false)
