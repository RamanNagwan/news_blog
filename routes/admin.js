import express from 'express';
import { getUsers } from '../controllers/userController.js';

const adminRoute = express.Router();


// User Routes
adminRoute.get('/admin/users', getUsers);

export default adminRoute;