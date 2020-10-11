import { Router } from 'express';
import { authenticate, register } from './user.controller';

const userRoute: Router = Router();

userRoute.post('/', register);
userRoute.post('/authenticate', authenticate);

export default userRoute;