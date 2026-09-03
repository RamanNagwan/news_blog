import express from 'express';
import { getUsers, addUser, addUserPost, deleteUser, updateUser } from '../controllers/userController.js';

const adminRoute = express.Router();


// User Routes
adminRoute.get('/admin/users', getUsers);
adminRoute.get('/admin/add-user', addUser);
adminRoute.post('/admin/add-user', addUserPost);
adminRoute.delete('/admin/delete-user/:id', deleteUser);
adminRoute.get('/admin/update-user/:id',updateUser);

export default adminRoute;