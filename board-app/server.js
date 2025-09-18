const express = require('express');
const path = require('path');
const app = express();

app.use(express.urlencoded({ extended: true }));

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

let posts = [
  
];

app.get('/', (req, res) => {
  res.render('index', { posts });
});

app.get('/write', (req, res) => {
  res.render('write');
});

app.post('/write', (req, res) => {
  const newPost = {
    id: posts.length + 1,
    title: req.body.title,
    content: req.body.content
  };
  posts.push(newPost);
  res.redirect('/');
});

// ✅ 글 상세
app.get('/posts/:id', (req, res) => {
  const post = posts.find(p => p.id === parseInt(req.params.id));
  if (!post) return res.status(404).send('Not Found');
  res.render('detail', { post });
});

app.post('/posts/:id/delete', (req, res) => {
  const id = parseInt(req.params.id);
  posts = posts.filter(p => p.id !== id);
  res.redirect('/');
});

app.get('/posts/:id/edit', (req, res) => {
  const post = posts.find(p => p.id === parseInt(req.params.id));
  if (!post) return res.status(404).send('Not Found');
  res.render('edit', { post });
});

app.post('/posts/:id/edit', (req, res) => {
  const id = parseInt(req.params.id);
  const post = posts.find(p => p.id === id);
  if (!post) return res.status(404).send('Not Found');
  post.title = req.body.title;
  post.content = req.body.content;
  res.redirect(`/posts/${id}`);
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`✅ Server running on http://localhost:${port}`);
});
