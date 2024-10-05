import {Router} from 'express';
const router = Router();

import  userRoutes from './userRoutes.js';
import thoughtRoutes from './thoughtRoutes.js';
// import the API routes

router.use('/users',userRoutes);
router.use('/thoughts',thoughtRoutes)

export default router;