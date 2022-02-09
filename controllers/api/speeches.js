const Speech = require('../../models/speech');

module.exports = {
  create,
};

async function create(req, res) {
  console.log('create in controller hit');
  console.log(Speech.find({}));
}
