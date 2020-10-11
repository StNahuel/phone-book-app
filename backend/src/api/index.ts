import { Router } from 'express';
import authMiddleware from '../middleware/auth';
import contactsRoute from './contacts/contact.route';
import userRoute from './users/user.route';

const router: Router = Router();

router.use('/user', userRoute);
router.use('/contacts', authMiddleware, contactsRoute)

export default router;