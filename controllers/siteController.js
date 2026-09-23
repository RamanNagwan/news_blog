import Artical from '../model/articalModel.js';
import Category from '../model/categoryModel.js';
import User from '../model/userModel.js';

export const homePage = async (req, res, next) => {
    try {

        const options = {
            page: 1, limit: 2, populate: [
                { path: 'category', select: 'name slug' },
                { path: 'author', select: 'fullname' }
            ]
        }
        const pagination = await Artical.paginate({}, options);
        // res.json(articles);

        // const articles = await Artical.find()
        //     .populate('category', { 'name': 1, 'slug': 1 })
        //     .populate('author', 'fullname');

        res.render('index', { pagination });
    } catch (err) {
        next(err)
    }
}

export const singleArticle = async (req, res) => {
    try {
        const id = req.params.id
        const singleNews = await Artical.findOne({ '_id': id })
            .populate('category', { 'name': 1, 'slug': 1 })
            .populate('author', 'fullname');

        res.render('singleNews', { singleNews });
    } catch (err) {
        res.send(`Category error : ${err}`);
    }
}

export const singleCategory = async (req, res) => {
    try {
        const categoryId = req.params.id

        const categoriesNews = await Artical.find({ 'category': categoryId })
            .populate('category', { 'name': 1, 'slug': 1 })
            .populate('author', 'fullname');
        const categoryName = await Category.findOne({ '_id': categoryId });

        res.render('categoryWise', { categoriesNews, categoryName });
    } catch (err) {
        res.send(`Category error ${err}`);
    }
}

export const categoriesWise = async (req, res) => {
    try {


        // categoryWise news
        const categoryId = req.params.id;
        const categoriesNews = await Artical.find({ 'category': categoryId })
            .populate('category', { 'name': 1, 'slug': 1 })
            .populate('author', 'fullname');
        const categoryName = await Category.findOne({ '_id': categoryId });

        res.render('categoryWise', { categoriesNews, categoryName });
    } catch (err) {
        res.send(`Recent page error ${err}`);
    }
}

export const authorWise = async (req, res) => {
    try {

        // author wise news
        const authorId = req.params.id
        const authorNews = await Artical.find({ 'author': authorId })
            .populate('category', { 'name': 1, 'slug': 1 })
            .populate('author', 'fullname')
            .sort({ createdAt: -1 });
        const authorName = await User.findOne({ _id: authorId });

        res.render('authorWise', { authorNews, authorName });
    } catch (err) {
        res.status(400).json({ 'message': `Author wise error :${err}` });
    }
}


export const search = async (req, res) => {
    try {
        const search = req.query.search
        const searchNews = await Artical.find({
            $or: [
                { title: { $regex: search, $options: 'i' } },
                { content: { $regex: search, $options: 'i' } }
            ]
        }).populate('category', { 'name': 1, 'slug': 1 }).populate('author', 'fullname');
        if (search.length > 0) {
            res.render('search', { searchNews });
        } else {
            res.redirect('/');
        }
    } catch (err) {
        res.status(404).json(`Server error :${err}`);
    }
}
