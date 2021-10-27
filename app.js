const express = require('express');
const mongoose = require('mongoose');
const blogRoutes = require('./routes/blogRoutes');


const app = express();

const dbURI = 'mongodb+srv://salem:username1@nodeblog.oepe0.mongodb.net/NodeBlog?retryWrites=true&w=majority';

mongoose.connect( dbURI,  { useNewUrlParser: true, useUnifiedTopology: true })
    .then((result) => app.listen(3000))
    .catch((err) => console.log(err));

app.set('view engine', 'ejs');


app.use((req, res, next) => {
    res.locals.path = req.path;
    next();
  });
  
 

app.get('/', (req, res) => {
  res.redirect('/blogs');
});


app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));


app.get('/about', (req, res) => {
  res.render('about', { title: 'About'});
});


// blog routes
app.use('/blogs', blogRoutes);

app.use((req, res) => {
    res.status(404).render('404', { title: '404'});
});