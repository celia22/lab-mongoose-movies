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

router.get('/celebrities/new', (req, res, next) => res.render('/celebrities/new'));

router.post('/celebrities', (req, res, next) => {
  const { name, occupation, catchPhrase } = req.body;
  Celebrity.create({ name, occupation, catchPhrase })
    .save()
    .then(() => res.redirect('/celebrities/index'))
    .catch(() => res.render('celebrities/new'));
});



// router.post('/drones/:id/edit', (req, res, next) => {
//   const { name, propellers, maxSpeed } = req.body;
//   const { id } = req.params;
//   Drone.findByIdAndUpdate(id, { name, propellers, maxSpeed }, { new: true })
//     .then(drone => {
//       console.log('update', drone);
//       res.redirect('/drones');
//     })
//     .catch(() => res.render('drones/create-form'));
// });

// router.post('/drones/:id/delete', (req, res, next) => {
//   const { id } = req.params;
//   Drone.findByIdAndDelete(id)
//     .then(drone => {
//       console.log('delete', drone);
//       res.redirect('/drones');
//     })
//     .catch(error => {
//       next(error);
//     });
// });

module.exports = router;
