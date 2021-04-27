const express = require('express');

const Movie = require('../models/Movie.model.js');

const router = express.Router();

router.get('/movies', (req, res, next) => {
  Movie.find()
    .then(allMoviesFromDB => {
      console.log('Retrieved movies from DB:', allMoviesFromDB);
      res.render('movies/index', { moviesArr: allMoviesFromDB });
    })
    .catch(error => {
      console.log('Error while getting the movies from the DB: ', error);
      next(error);
    });
});

router.get('/movies/new', (req, res, next) => res.render('movies/new'));

router.post('/movies', (req, res, next) => {
  const { title, genre, plot } = req.body;
  Movie.create({ title, genre, plot })
    .then(() => res.redirect('/movies'))
    .catch(() => res.render('movies/new'));
});

router.get('/movies/:id', (req, res, next) => {
  const { id } = req.params;
  Movie.findById(id)
    .then(allMoviesFromDB => {
      console.log(allMoviesFromDB);
      res.render('movies/show', { moviesArr: allMoviesFromDB });
    })
    .catch(error => {
      next(error);
    });
});

router.post('/movies/:id/delete', (req, res, next) => {
  const { id } = req.params;
  Movie.findByIdAndRemove(id)
    .then(allMoviesFromDB => {
      console.log('delete', allMoviesFromDB);
      res.redirect('/movies');
    })
    .catch(error => {
      next(error);
    });
});

module.exports = router;

