import { h, render } from 'preact'
import { createStore, Provider } from 'unistore/full/preact'
import devtools from 'unistore/devtools'
import App from '../views/App'

const preloadedState = window.__PRELOADED_STATE__
delete window.__PRELOADED_STATE__

const store =
  process.env.NODE_ENV === 'production'
    ? createStore(preloadedState)
    : devtools(createStore(preloadedState))

const app = document.querySelector('#app')
const container = document.querySelector('#app .app-container')

render(h(Provider, { store }, h(App)), app, container)
