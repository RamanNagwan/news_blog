import express from 'express';
import isLoggedIn from '../middleware/isLoogedIn.js';
import isAdmin from '../middleware/isAdmin.js';

import { getUsers, addUser, addUserPost, deleteUser, updateUser, updatePost, login, loginPost, logout, dashboard } from '../controllers/userController.js';
import { addCategory, addedcategory, deleteCategory, getCategories, updateCategory, updateCategoryPost } from '../controllers/categoryController.js';
import { allArtical, addArtical, addedArtical } from '../controllers/articalController.js';
import imageUpload from '../middleware/imageUpload.js';

const router = express.Router();

// Login and Logout 
router.get('/login', login);
router.post('/login', loginPost);
router.get('/logout', logout);

// User Routes
router.get('/admin/users', isLoggedIn, isAdmin, getUsers);
router.get('/admin/add-user', isLoggedIn, addUser);
router.post('/admin/add-user', isLoggedIn, isAdmin, addUserPost);
router.delete('/admin/delete-user/:id', isLoggedIn, isAdmin, deleteUser);
router.get('/admin/update-user/:id', isLoggedIn, isAdmin, updateUser);
router.post('/admin/update-user/:id', isLoggedIn, isAdmin, updatePost);
router.get('/dashboard', isLoggedIn, dashboard);

// Category Routes
router.get('/admin/categories', isLoggedIn, isAdmin, getCategories);
router.get('/admin/add-category', isLoggedIn, isAdmin, addedcategory);
router.post('/admin/add-category', isLoggedIn, isAdmin, addCategory);
router.get('/admin/update-category/:id', isLoggedIn, isAdmin, updateCategory);
router.post('/admin/update-category/:id', isLoggedIn, isAdmin, updateCategoryPost);
router.delete('/admin/delete-category/:id', isLoggedIn, isAdmin, deleteCategory);

// Artical Routes
router.get('/admin/articales', allArtical);
router.get('/admin/add-artical', addArtical);
router.post('/admin/add-artical', isLoggedIn, imageUpload.single("image"), addedArtical);

export default router;



// name show dashboard and hearder nav hide