import {
    getUsers,
    addUser,
    addUserPost,
    deleteUser,
    updateUser,
    updatePost,
    login,
    loginPost,
    logout,
    dashboard
} from '../controllers/userController.js';
import express from 'express';
import isLoggedIn from '../middleware/isLoogedIn.js';
import isAdmin from '../middleware/isAdmin.js';

const router = express.Router();


// User Routes
router.get('/admin/users', isLoggedIn, isAdmin, getUsers);
router.get('/admin/add-user', isLoggedIn, addUser);
router.post('/admin/add-user', isLoggedIn, isAdmin, addUserPost);
router.delete('/admin/delete-user/:id', isLoggedIn, isAdmin, deleteUser);
router.get('/admin/update-user/:id', isLoggedIn, isAdmin, updateUser);
router.post('/admin/update-user/:id', isLoggedIn, isAdmin, updatePost);
router.get('/dashboard', isLoggedIn, dashboard);

// Login and Logout 
router.get('/login', login);
router.post('/login', loginPost);
router.get('/logout', logout);

export default router;



// name show dashboard and hearder nav hide