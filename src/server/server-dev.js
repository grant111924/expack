import path from 'path'
import express from 'express'
import webpack from 'webpack'
import webpackDevMiddleware from 'webpack-dev-middleware'
import webpackHotMiddleware from 'webpack-hot-middleware'
import config from '../../webpack.client.config.js'
import bodyParser from 'body-parser'

// eslint-disable-next-line no-unused-vars
import db from '../server/db_con' 
const app = express(),
            DIST_DIR = __dirname,
            HTML_FILE = path.join(DIST_DIR, 'index.html'),
            compiler = webpack(config)
const PORT = process.env.PORT || 8080
const jsonParser = bodyParser.json();

app.use(webpackDevMiddleware(compiler, {
  publicPath: config.output.publicPath
}))

app.use(webpackHotMiddleware(compiler))

app.get('/data',(req,res)=>{
  console.log(req.body)
  res.send(db.get("data").value())
})
app.post('/event',jsonParser,(req,res)=>{
  console.log(req.body.type)
  res.send(db.get("data").find({type:req.body.type}).value())
})
// app.set('view engine', 'pug');
// app.set('views','./src/views');
// app.get('/about', function(req, res){
//   res.render('about', {
//     data: db.get('data').value()
//  });
// });

app.get('*', (req, res, next) => {
  compiler.outputFileSystem.readFile(HTML_FILE, (err, result) => {
    if (err) {
      return next(err)
    }
    res.set('content-type', 'text/html')
    res.send(result)
    res.end()
  })
})

app.listen(PORT, () => {
    console.log(`App listening to ${PORT}....`)
    console.log('Press Ctrl+C to quit.')
})
