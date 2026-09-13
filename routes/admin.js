import express from 'express';
import isLoggedIn from '../middleware/isLoogedIn.js';
import isAdmin from '../middleware/isAdmin.js';

import { getUsers, addUser, addUserPost, deleteUser, updateUser, updatePost, login, loginPost, logout, dashboard } from '../controllers/userController.js';
import { addCategory, addedcategory, deleteCategory, getCategories, updateCategory, updateCategoryPost } from '../controllers/categoryController.js';
import { allArtical, addArtical, addedArtical, updateArticle, articleUpdated, articleDelete } from '../controllers/articalController.js';
import { setting, settingPost } from '../controllers/settingController.js';
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
router.get('/admin/dashboard', isLoggedIn, dashboard);

// Category Routes
router.get('/admin/categories', isLoggedIn, isAdmin, getCategories);
router.get('/admin/add-category', isLoggedIn, isAdmin, addedcategory);
router.post('/admin/add-category', isLoggedIn, isAdmin, addCategory);
router.get('/admin/update-category/:id', isLoggedIn, isAdmin, updateCategory);
router.post('/admin/update-category/:id', isLoggedIn, isAdmin, updateCategoryPost);
router.delete('/admin/delete-category/:id', isLoggedIn, isAdmin, deleteCategory);

// Artical Routes
router.get('/admin/articales', isLoggedIn, isAdmin, allArtical);
router.get('/admin/add-artical', isLoggedIn, isAdmin, addArtical);
router.post('/admin/add-artical', isLoggedIn, isAdmin, imageUpload.single("image"), addedArtical);
router.get('/admin/update-artical/:id', isLoggedIn, isAdmin, updateArticle);
router.post('/admin/update-added/:id', isLoggedIn, isAdmin, imageUpload.single("image"), articleUpdated);
router.delete('/admin/delete-article/:id', isLoggedIn, isAdmin, articleDelete);

// Setting Route
router.get('/admin/setting', isLoggedIn, isAdmin, setting);
router.post('/admin/setting', isLoggedIn, isAdmin, imageUpload.single("logo"), settingPost);

// Error Handling Page not found
router.use(isLoggedIn, (req, res, next) => {
    res.status(404).render('admin/404', {
        message: `Page not found`,
        layout: 'admin/layout',
        role: req.role
    });
});

// Error Handling 500, 401 etc...
router.use(isLoggedIn, (err, req, res, next) => {
    const status = err.status || 500;
    const view = status == 500 ? 'admin/500' : 'admin/404';
    res.status(status).render(view, {
        message: `${err.message}` || 'Something went wrong',
        layout: 'admin/layout',
        role: req.role
    });
})

export default router;

// name show dashboard and hearder nav hide