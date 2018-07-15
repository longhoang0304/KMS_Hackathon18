import express from 'express';
import userRoutes from './server/user/user.route';
import authRoutes from './server/auth/auth.route';
import orgRoutes from './server/organization/organization.route';
import interviewRoutes from './server/interview/interview.route';
import questionRoutes from './server/question/question.route';
import answerRoutes from './server/answer/answer.route';


const router = express.Router(); // eslint-disable-line new-cap


/** GET /health-check - Check service health */
router.get('/health-check', (req, res) =>
  res.json({ message: 'OK' }));

// mount user routes at /users
router.use('/users', userRoutes);

// mount authenticate routes at /auth
router.use('/auth', authRoutes);

// mount organization routes at /org
router.use('/org', orgRoutes);

// mount interview routes at /interview
router.use('/interview', interviewRoutes);

// mount question routes at /question
router.use('/question', questionRoutes);

// mount answer routes at /answer
router.use('/answer', answerRoutes);

export default router;