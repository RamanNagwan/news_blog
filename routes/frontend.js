import express from 'express';
import { authorWise, categoriesWise, homePage, singleArticle, singleCategory } from '../controllers/siteController.js';
import localCommonData from '../middleware/localCommonDataMiddleware.js';


const frontendRouter = express.Router();
frontendRouter.use(localCommonData);

frontendRouter.get('/', homePage);
frontendRouter.get('/single-news/:id', singleArticle);
frontendRouter.get('/single-category/:id', singleCategory);
frontendRouter.get('/category/:id', categoriesWise);
frontendRouter.get('/author/:id', authorWise)
export default frontendRouter;