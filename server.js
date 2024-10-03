const express = require('express');
const app = express();
const PORT = 3000;

app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

let notes = [];

app.get('/', (req, res) => {
  res.render('index', { posts: notes });
});

app.get('/new', (req, res) => {
  res.render('new');
});

app.post('/new', (req, res) => {
  const { title, content } = req.body;
  const newPost = { id: notes.length, title, content };
  notes.push(newPost);
  res.redirect('/');
});

app.get('/edit/:id', (req, res) => {
  const post = notes.find(p => p.id == req.params.id);
  res.render('edit', { post });
});

app.post('/edit/:id', (req, res) => {
  const { title, content } = req.body;
  const post = notes.find(p => p.id == req.params.id);
  post.title = title;
  post.content = content;
  res.redirect('/');
});

app.post('/delete/:id', (req, res) => {
  notes = notes.filter(post => post.id != req.params.id);
  res.redirect('/');
});

app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
