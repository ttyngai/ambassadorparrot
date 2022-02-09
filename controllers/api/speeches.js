const Speech = require('../../models/speech');

module.exports = {
  create,
  star,
};

async function create(req, res) {
  // console.log(Speech.find({}));
  req.body._id = req.user.id;
  const speech = await Speech.create(req.body);
  res.json(speech);
}
async function star(req, res) {
  let speechStarring = await Speech.findById(req.body._id);
  speechStarring.isStarred = !speechStarring.isStarred;
  speechStarring.save();

  res.json(speechStarring);
}
