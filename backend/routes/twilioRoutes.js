const express = require('express');
const router = express.Router();

// Webhook to track call status
router.post('/call-status', (req, res) => {
  const { CallSid, CallStatus, To, Duration } = req.body;
  
  console.log(`Call ${CallSid} to ${To} status: ${CallStatus}, Duration: ${Duration} seconds`);
  
  // You can update your ReminderLog here with call status
  // This helps track if calls were answered/completed
  
  res.status(200).end();
});

module.exports = router;