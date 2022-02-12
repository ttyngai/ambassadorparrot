const express = require('express');
const router = express.Router();
const speechCtrl = require('../../controllers/api/speeches');

// Record speech
router.post('/new', speechCtrl.create);
// Add as a favourite
router.put('/star', speechCtrl.star);
// Clear main page
router.put('/clearSpeeches', speechCtrl.clearList);
// Delete a single speech
router.delete('/deleteSpeech', speechCtrl.deleteSpeech);
// Delete favourites list
router.delete('/deleteFav', speechCtrl.deleteFav);
// Get speeches from database
router.get('/getSpeeches', speechCtrl.getSpeech);

module.exports = router;
