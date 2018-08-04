const { join } = require('path')

const cwd = process.cwd()

if (__dirname !== cwd) {
  new Error('You are not in project root.')
}

const outputDir = join(cwd, 'dist')
const cacheDir = join(cwd, '.cache')

const src = {
  server: join(cwd, 'server'),
  client: join(cwd, 'client'),
  views: join(cwd, 'views'),
}

const entry = {
  server: join(src.server, 'index.js'),
  client: join(src.client, 'index.js'),
  views: join(src.views, 'App.jsx'),
}

const output = {
  client: join(outputDir, 'client'),
  views: join(outputDir, 'views'),
}

const cache = {
  client: join(cacheDir, 'client'),
  views: join(cacheDir, 'views'),
}

module.exports = {
  src,
  entry,
  output,
  cache,

  outputDir,
  cacheDir,
}
