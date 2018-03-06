const assert = require('assert')
const mock = require('mock-fs')
const listMaps = require('../app/api/local-maps')

describe('localMaps', () => {
  beforeEach(() => {
    mock({
      '/Maps': {
        'some file': '',
        'A_Map': mock.directory({
          birthtime: new Date(2018, 1, 1),
          items: {
            'foo.img': '',
            'style.typ': ''
          }
        }),
        'B_Map': mock.directory({
          birthtime: new Date(2018, 2, 2)
        })
      }
    })
  })

  afterEach(() => {
    mock.restore()
  })

  it('lists all maps', () => {
    return listMaps('/Maps').then((maps) => {
      assert.deepEqual(maps, [
        {
          name: 'A_Map',
          path: '/Maps/A_Map',
          updated: new Date(2018, 1, 1),
          styles: [
            {
              name: 'style',
              path: 'style.typ'
            }
          ]
        },
        {
          name: 'B_Map',
          path: '/Maps/B_Map',
          updated: new Date(2018, 2, 2),
          styles: []
        }
      ])
    })
  })
})
