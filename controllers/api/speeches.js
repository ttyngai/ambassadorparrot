const Speech = require('../../models/speech');

module.exports = {
  create,
  star,
  getSpeech,
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

async function getSpeech(req, res) {
  console.log('in controller');
  const speeches = Speech.find({ user: req.user });
  console.log('finding the speech in mongo', speeches);
  res.json(speeches);
}
