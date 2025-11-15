const express = require('express');
const router = express.Router();
const auth = require('../middlewares/auth');
const medCtrl = require('../controllers/medicineController');

router.get('/all', auth, medCtrl.getLogs);

module.exports = router;
