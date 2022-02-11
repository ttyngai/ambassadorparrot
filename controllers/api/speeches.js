const Speech = require('../../models/speech');

module.exports = {
  create,
  star,
  getSpeech,
  deleteSpeech,
};

async function create(req, res) {
  try {
    req.body._id = req.user.id;
    const speech = await Speech.create(req.body);
    res.json(speech);
  } catch {}
}
async function star(req, res) {
  try {
    let speechStarring = await Speech.findById(req.body._id);
    speechStarring.isStarred = !speechStarring.isStarred;
    speechStarring.save();
    res.json(speechStarring);
  } catch {}
}

async function getSpeech(req, res) {
  try {
    let speeches = await Speech.find({ user: req.user });
    res.json(speeches);
  } catch {}
}

async function deleteSpeech(req, res) {
  try {
    let speech = await Speech.findById(req.body._id);
    speech.remove();
    res.json(speech);
  } catch {}
}
