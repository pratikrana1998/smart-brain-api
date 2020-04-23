const Clarifai = require('clarifai');

// Clarifai API configuration
const app = new Clarifai.App({apiKey: '28262556f3d04d838acb43a04b45f65a'});

const handleAPICall = (req, res) => {
  app.models
    .predict(Clarifai.FACE_DETECT_MODEL, req.body.input)
    .then(data => {
      res.json(data);
    })
    .catch(err => res.status(400).json('unable to work with API'));
}

const handleImage = (req, res, db) => {
  const {id} = req.body;
  db('users').where('id', '=', id)
  .increment('entries', 1)
  .returning('entries')
  .then(entries => {
    res.json(entries[0]);
  })
  .catch(err => res.json('Unable to get entries'));
}

module.exports = {
  handleImage: handleImage,
  handleAPICall: handleAPICall
}
