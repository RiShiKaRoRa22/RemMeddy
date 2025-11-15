const express = require('express');
const router = express.Router();
const auth = require('../middlewares/auth');
const medCtrl = require('../controllers/medicineController');

router.post('/', auth, medCtrl.addMedicine);
router.get('/', auth, medCtrl.getMedicines);
router.post('/take/:logId', auth, medCtrl.markTaken);
router.delete('/:id', auth, medCtrl.removeMedicine);

module.exports = router;
