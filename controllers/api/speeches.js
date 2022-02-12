const Speech = require('../../models/speech');

module.exports = {
  create,
  star,
  getSpeech,
  deleteSpeech,
  clearList,
  deleteFav,
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

async function clearList(req, res) {
  let allSpeeches = await Speech.find({ user: req.user });
  let afterRemove = [];
  allSpeeches.forEach(function (s) {
    if (!s.isStarred) {
      s.remove();
    } else {
      s.isCleared = true;
      s.save();
      afterRemove.push(s);
    }
  });
  res.json(afterRemove);
}

async function deleteFav(req, res) {
  const favSpeeches = await Speech.find({ user: req.user, isStarred: true });
  favSpeeches.forEach(function (s) {
    s.remove();
  });
  // favSpeeches.save();
  res.json('ok');
}
