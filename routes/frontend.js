import express from 'express';
import { categoriesWise, homePage, singleArticle, singleCategory } from '../controllers/siteController.js';

const frontendRouter = express.Router();

frontendRouter.get('/', homePage);
frontendRouter.get('/single-news/:id', singleArticle);
frontendRouter.get('/single-category/:id', singleCategory);
frontendRouter.get('/category/:slug', categoriesWise);

export default frontendRouter;