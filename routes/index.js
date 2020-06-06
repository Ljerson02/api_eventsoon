import express from 'express';
import userRoutes from './users';
import eventsRoutes from './events';
import ticketsRoutes from './tickets';
const router = express.Router();

/** GET /health-check - Check service health */
router.get('/health-check', (req, res) =>{
  res.send('OK')
});

// mount user routes at /users
router.use('/users', userRoutes);
router.use('/events', eventsRoutes);
router.use('/tickets', ticketsRoutes);

export default router;
