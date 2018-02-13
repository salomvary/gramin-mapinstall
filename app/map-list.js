'use strict'

const moment = require('moment')
const React = require('react')

const DOM = React.DOM

module.exports = function MapList(props) {
  let rows
  let messages

  if (props.repos)
    rows = props.repos.reduce((rows, repo) => {
      const title = DOM.tr({key: repo.name},
        DOM.th({className: ''},
          repo.name
        )
      )
      const files = repo.files.map(file => {
        const button = DOM.button({
          className: 'track-upload-button',
          onClick: () => props.onInstallClick(repo, file),
          children: 'Install'
        })
        return DOM.tr({key: file.path},
          DOM.td({className: ''}, file.title),
          DOM.td({className: ''}, moment(file.date).calendar()),
          DOM.td({className: 'actions'}, button)
        )
      })
      return rows.concat(title).concat(files)
    }, [])
  else if (props.error)
    messages = DOM.div({className: 'messages'},
      DOM.div({
        className: 'message',
        children: props.error
      })
    )
  else
    messages = DOM.div({className: 'messages'},
      DOM.div({
        className: 'message',
        children: 'Loading maps…'
      })
    )

  return (
    DOM.div(null,
      DOM.table(null,
        DOM.tbody(null, rows)),
      DOM.div({className: 'messages'},
        messages))
  )
}
