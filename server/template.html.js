module.exports = ({ rendered, preloadedState }) => `
<!DOCTYPE html>
<html>
  <head>
    <title>Preact SSR</title>
  </head>
  <body>
    <div id="app">
      ${rendered}
    </div>
    <script>
      window.__PRELOADED_STATE__ = ${JSON.stringify(preloadedState).replace(
        /<|>/g,
        ''
      )};
    </script>
    <script src="/static/main.js"></script>
  </body>
</html>
`
