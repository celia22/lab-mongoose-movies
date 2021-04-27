const mongoose = require('mongoose');
const Celebrity = require('../models/Celebrity.model');
const Movie = require('../models/Movie.model');

const DB_NAME = 'mongoose-movies';

mongoose.connect(`mongodb://localhost/${DB_NAME}`, {
  useCreateIndex: true,
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// const fuckingCelebs = [
//   { name: 'JuanCar', occupation: 'ExKing and Thief', catchPhrase: 'Lo siento mucho, no volverá a pasar' },
//   { name: 'Felipe', occupation: 'Unknown', catchPhrase: 'Blah blah blah, concordia, blah blah blah España' },
//   { name: 'Froilan', occupation: 'Shooting his feet', catchPhrase: 'He repetido 3 veces 2o de la ESO' },
// ];

// Celebrity.create(fuckingCelebs)
//   .then(celebsFromDB => {
//     console.log(`Created ${celebsFromDB.length} celebrities`);
//     mongoose.connection.close();
//   })
//   .catch(err => console.log(`An error occurred while creating celebs from the DB: ${err}`));

const movies = [
  { title: 'Robin Hood', genre: 'police', plot: 'A nice guy tries to get back all the money the king stole' },
  { title: 'movie2', genre: 'genre2', plot: 'plot2' },
  { title: 'movie3', genre: 'genre3', plot: 'plot3' },
];

Movie.create(movies)
  .then(moviesFromDB => {
    console.log(`Created ${moviesFromDB.length} movies`);
    mongoose.connection.close();
  })
  .catch(err => console.log(`An error occurred while creating movies from the DB: ${err}`));
