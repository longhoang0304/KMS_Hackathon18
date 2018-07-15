import express from 'express';
import * as authCtrl from './auth.controller';

const router = express.Router();
router.route('/login')
  .post(authCtrl.login);

router.route('/forgot')
  .post(authCtrl.forgotPassword);


export default router;