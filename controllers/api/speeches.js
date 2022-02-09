const Speech = require('../../models/speech');

module.exports = {
  create,
};

async function create(req, res) {
  console.log(req.body);
  console.log('create in controller hit');
  // console.log(Speech.find({}));
  req.body._id = req.user.id;
  const speech = await Speech.create(req.body);
  res.json(speech);
}
