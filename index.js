const express = require('express');
const exphbs = require('express-handlebars');
const app = express();

const shortid = require('shortid');
const boxen = require('boxen');

// Database
const low = require('lowdb')
const FileSync = require('lowdb/adapters/FileSync')

const adapter = new FileSync('data/db.json')
const db = low(adapter)
db.defaults({
  documents: [],
  count: 0
}).write()

// Static files
app.use(express.static('resources'))
app.use(express.static('node_modules'))

// JSON
app.use(express.json());       // to support JSON-encoded bodies
app.use(express.urlencoded({extended: true})); // to support URL-encoded bodies

// Register Handlebars view engine
app.engine('handlebars', exphbs({defaultLayout: 'main'}));
// Use Handlebars view engine
app.set('view engine', 'handlebars');

app.get('/', (req, res) => {
  res.render('index');
});

app.get('/new', (req,res) => {
  let documentId = shortid.generate();
  db.get('documents')
    .push({ id: documentId, title: 'Untitled 1', content: ''})
    .write()
  db.update('count', n => n + 1)
    .write()
  res.redirect('/'+documentId)
});

app.get('/:documentId', (req, res) => {
  let documentId = req.params.documentId;
  let document = db.get('documents')
    .find({ id: documentId })
    .value();
  if (!document) {
    res.status(404).render('404');
  }
  else {
    res.render('editor', {document: document});
  }
});

app.post('/update', (req, res) => {
  let title = req.body.title.replace(/<(?:.|\n)*?>/gm, '');
  let document = db.get('documents')
    .find({ id: req.body.document })
  	.assign({title: title, content: req.body.content})
    .write()
  res.status(200).send({ response: "Data saved!" });
});

app.post('/delete', (req, res) => {
  let document = db.get('documents')
    .remove({ id: req.body.document })
    .write()
  res.status(200).send({ response: "Document deleted!" });
});

// Server

const listenPort = 1984;

app.listen(listenPort, () => {
  console.log(boxen('\x1b[33mHelloEdit is running at http://127.0.0.1:'+listenPort+'.\x1b[0m\n\n\x1b[31mPress Ctrl+C to quit.\x1b[0m', {padding: 1, margin: 1, borderStyle: 'double', borderColor: 'yellow'}));
});
