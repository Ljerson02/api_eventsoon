const express = require ('express');
const userRoutes = require ('./users');
const eventsRoutes = require ('./events');
const ticketsRoutes = require ('./tickets');
const router = express.Router();

/** GET /health-check - Check service health */
router.get('/health-check', (req, res) =>{
  res.send('OK')
});

// mount user routes at /users
router.use('/users', userRoutes);
router.use('/events', eventsRoutes);
router.use('/tickets', ticketsRoutes);

module.exports = router;
