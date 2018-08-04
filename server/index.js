const fs = require('fs')
const express = require('express')

const { render } = require('preact-render-to-string')
const { h } = require('preact')
const { createStore, Provider } = require('unistore/full/preact')

const paths  = require('../paths')

const template = require('./template.html')
const App = require('../dist/views/main').default

const server = express()

server.use('/static', express.static(paths.output.client)

server.get('/', (req, res) => {
  const initialState = { message: 'hello, world' }
  const store = createStore(initialState)
  const rendered = render(h(Provider, { store }, h(App)))
  const preloadedState = store.getState()

  res.send(template({ rendered, preloadedState }))
})

const PORT = process.env.PORT || 3000

server.listen(PORT, () => {
  console.log(`Server starting on ${PORT}`)
})
