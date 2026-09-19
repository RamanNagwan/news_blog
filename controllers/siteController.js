import Artical from '../model/articalModel.js'
import Category from '../model/categoryModel.js';

export const homePage = async (req, res, next) => {
    try {
        const categoriesId = await Artical.distinct('category').populate('category', { 'name': 1 });
        const categories = await Category.find({ '_id': { $in: categoriesId } })
        const searcArticlesParams = req.params.slug;
        const searchNews = await Artical.find({
            $or: [
                { title: searcArticlesParams },
                { content: searcArticlesParams }
            ]
        })
            .populate('category', { 'name': 1, 'slug': 1 })
            .populate('author', 'fullname');

        const recentPosts = await Artical.find()
            .populate('category', { 'name': 1, 'slug': 1 }).limit(5).sort({ createdAt: -1 });
        const articles = await Artical.find()
            .populate('category', { 'name': 1, 'slug': 1 })
            .populate('author', 'fullname');
        res.render('index', { articles, recentPosts, searchNews, categories });
    } catch (err) {
        next(err)
    }
}

export const singleArticle = async (req, res) => {
    try {
        const id = req.params.id
        const categoriesId = await Artical.distinct('category').populate('category', { 'name': 1 });
        const categories = await Category.find({ '_id': { $in: categoriesId } })

        const recentPosts = await Artical.find()
            .populate('category', { 'name': 1, 'slug': 1 }).limit(5).sort({ createdAt: -1 });
        const singleNews = await Artical.findOne({ '_id': id })
            .populate('category', { 'name': 1, 'slug': 1 })
            .populate('author', 'fullname');
        res.render('singleNews', { singleNews, recentPosts, categories });
    } catch (err) {
        res.send(`Category error : ${err}`);
    }
}

export const singleCategory = async (req, res) => {
    try {

        const id = req.params.id;
        const category = await Artical.findOne({ 'category': id });
        res.json(category);
    } catch (err) {
        res.send(`Category error ${err}`);
    }
}

export const categoriesWise = async (req, res) => {
    try {
        const categoriesId = await Artical.distinct('category').populate('category', { 'name': 1 });
        const categories = await Category.find({ '_id': { $in: categoriesId } })
        const searcArticlesParams = req.params.slug;
        const searchNews = await Artical.find({
            $or: [
                { title: searcArticlesParams },
                { content: searcArticlesParams }
            ]
        })
            .populate('category', { 'name': 1, 'slug': 1 })
            .populate('author', 'fullname');

        const recentPosts = await Artical.find()
            .populate('category', { 'name': 1, 'slug': 1 }).limit(5).sort({ createdAt: -1 });
        const articles = await Artical.find()
            .populate('category', { 'name': 1, 'slug': 1 })
            .populate('author', 'fullname');
        const categoryId = req.params.slug
        const categoriesNews = await Artical.find({ 'category': categoryId })
            .populate('category', { 'name': 1, 'slug': 1 })
            .populate('author', 'fullname')


        res.render('category', { articles, recentPosts, searchNews, categories, categoriesNews });
    } catch (err) {
        res.send(`Recent page error ${err}`);
    }
}