const express = require('express');
const router = express.Router();
const updatesCtrl = require('../../controllers/api/updates');

// Use the correct function name 'createUpdate' from your updates controller
router.post('/', updatesCtrl.createUpdate);
router.get('/', updatesCtrl.showUpdates); // This will handle GET requests to /api/updates

module.exports = router;
