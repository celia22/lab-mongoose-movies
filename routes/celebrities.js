const express = require('express');

// require the Drone model here
const Celebrity = require('../models/Celebrity.model.js');

const router = express.Router();

router.get('/celebrities', (req, res, next) => {
  Celebrity.find()
    .then(allCelebsFromDB => {
      console.log('Retrieved movies from DB:', allCelebsFromDB);
      res.render('celebrities/index', { fuckingCelebs: allCelebsFromDB });
    })
    .catch(error => {
      console.log('Error while getting the celebrities from the DB: ', error);
      next(error);
    });
});

router.get('/celebrities/new', (req, res, next) => res.render('celebrities/new'));

router.post('/celebrities', (req, res, next) => {
  const { name, occupation, catchPhrase } = req.body;
  Celebrity.create({ name, occupation, catchPhrase })
    .then(() => res.redirect('/celebrities'))
    .catch(() => res.render('celebrities/new'));
});

router.get('/celebrities/:id', (req, res, next) => {
  const { id } = req.params;
  Celebrity.findById(id)
    .then(allCelebsFromDB => {
      console.log(allCelebsFromDB);
      res.render('celebrities/show', { fuckingCelebs: allCelebsFromDB });
    })
    .catch(error => {
      next(error);
    });
});

router.post('/celebrities/:id/delete', (req, res, next) => {
  const { id } = req.params;
  Celebrity.findByIdAndRemove(id)
    .then(allCelebsFromDB => {
      console.log('delete', allCelebsFromDB);
      res.redirect('/celebrities');
    })
    .catch(error => {
      next(error);
    });
});

module.exports = router;
