import express from 'express';
import userRoutes from './server/user/user.route';
import authRoutes from './server/auth/auth.route';
import orgRoutes from './server/organization/organization.route';


const router = express.Router(); // eslint-disable-line new-cap


/** GET /health-check - Check service health */
router.get('/health-check', (req, res) =>
  res.json({ message: 'OK' }));

// mount user routes at /users
router.use('/users', userRoutes);

// mount user routes at /users
router.use('/auth', authRoutes);

// mount user routes at /users
router.use('/org', orgRoutes);


export default router;