import path from 'path';
import Artical from '../model/articalModel.js';
import Category from '../model/categoryModel.js';
import User from '../model/userModel.js';
import pagination from '../utils/pagination.js';
import { populate } from 'dotenv';
import Comment from '../model/commentModel.js';

export const homePage = async (req, res, next) => {
    try {
        let page = req.query.page
        let limit = 2
        let populate = [
            { path: 'category', select: 'name slug' },
            { path: 'author', select: 'fullname' }
        ]

        const paginate = await pagination(Artical, page, limit, populate)
        res.render('index', { paginate });
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

        const comments = await Comment.find({ status: 'approved' });

        res.render('singleNews', { singleNews, comments });
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
        const findBy = { 'category': req.params.id };
        const page = req.query.page;
        const limit = 1;
        const populate = [
            { path: 'category', select: 'name slug' },
            { path: 'author', select: 'fullname' }
        ];

        const paginate = await pagination(Artical, page, limit, populate, findBy);
        const categoryName = await Category.findOne({ '_id': req.params.id });

        res.render('categoryWise', { paginate, categoryName });
    } catch (err) {
        res.send(`Recent page error ${err}`);
    }
}

export const authorWise = async (req, res) => {
    try {
        const authorId = req.params.id
        const page = req.query.page;
        const limit = 2;
        const populate = [
            { path: 'category', select: 'name slug' },
            { path: 'author', select: 'fullname' }
        ];
        const findBy = {
            'author': authorId
        };

        const paginate = await pagination(Artical, page, limit, populate, findBy);
        const authorName = await User.findOne({ _id: authorId });

        res.render('authorWise', { paginate, authorName });
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
