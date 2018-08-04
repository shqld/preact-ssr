const cp = require('child_process')
const fs = require('fs')
const { promisify } = require('util')

const webpack = require('webpack')
const Reporter = require('webpack-command/lib/reporters/StylishReporter')

const colors = require('colors/safe')
const { sync: rimraf } = require('rimraf')

const configs = require('./build.config')
const paths = require('./build.paths')

const isProd = process.env.NODE_ENV === 'production'

const SERVER_COMMAND = `node ${paths.entry.server}`

main()

async function main() {
  const builders = {
    client: webpack(configs.client),
    views: webpack(configs.views),
  }

  const reporters = {
    client: new Reporter({ compiler: builders.client }),
    views: new Reporter({ compiler: builders.views }),
  }

  rimraf(paths.outputDir)

  if (isProd) {
    const build = (builder, reporter) =>
      new Promise(resolve =>
        builder.run((err, stats) => resolve(reporter.render(err, stats)))
      )

    await build(builders.client, reporters.client)
    await build(builders.views, reporters.views)

    process.exit()
  }

  builders.client.watch({}, (err, stats) => {
    reporters.client.render(err, stats)
  })

  let serverProc

  builders.views.watch({}, (err, stats) => {
    killServer(serverProc)
    reporters.views.render(err, stats)
    if (!err) {
      serverProc = startServer()
    }
  })

  fs.watch(paths.src.server, { recursive: true }, () => {
    killServer(serverProc)
    serverProc = startServer()
  })
}

function killServer(currentProc) {
  if (currentProc) {
    currentProc.kill()
    console.info(colors.green('INFO'), colors.gray('server restarting'))
  }
}

function startServer() {
  const proc = cp.exec(SERVER_COMMAND, 'utf8')
  proc.stdout.pipe(process.stdout)
  proc.stderr.pipe(process.stderr)

  return proc
}

module.exports = main
