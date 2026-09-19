import Artical from "../model/articalModel.js";
import Category from "../model/categoryModel.js";
import User from "../model/userModel.js";
import fs from "fs";
import path from "path";
import errorHandling from '../utils/errorHandling.js';
import { validationResult } from "express-validator";

// Get artical 
export const allArtical = async (req, res, next) => {
    try {
        if (!req.role == 'admin') return res.status(401).json({ message: `Unauthorized` });

        const articales = await Artical.find()
            .populate('author', 'fullname')
            .populate('category', 'name');

        if (!articales) {
            return next(errorHandling('Article not found', 404));
        };
// res.json(articales);
        res.render('admin/artical', { layout: 'admin/layout', role: req.role, articales });
    } catch (err) {
        next(err);
    }
}

// add Artical
export const addArtical = async (req, res, next) => {
    try {
        const categories = await Category.find();
        res.render(
            'admin/artical/add-artical',
            { layout: 'admin/layout', role: req.role, categories, errors: [] }
        );
    } catch (err) {
        next(err);
    }
}

//POST added Artical
export const addedArtical = async (req, res, next) => {
    try {
        const categories = await Category.find();
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            return res.render('admin/artical/add-artical', { layout: 'admin/layout', role: req.role, categories, errors: errors.array() })
        }

        await Artical.create({
            title: req.body.title,
            content: req.body.content,
            category: req.body.category,
            author: req.id,
            image: req.file.filename
        })
        res.redirect("articales");
    } catch (err) {
        next(err);
    }
}

// update Article page
export const updateArticle = async (req, res, next) => {
    try {
        const categories = await Category.find();
        const article = await Artical.findById({ _id: req.params.id });
        if (!article) {
            return next(errorHandling('Article not found', 404));
        }
        res.render('admin/artical/update-article', {
            layout: 'admin/layout',
            role: req.role,
            categories,
            article,
            errors: []
        });
    } catch (err) {
        next(err);
    }
}

// Article Update
export const articleUpdated = async (req, res, next) => {
    try {
        const categories = await Category.find();
        const article = await Artical.findOne({ _id: req.params.id });

        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.render('admin/artical/update-article', {
                layout: 'admin/layout',
                role: req.role,
                categories,
                article,
                errors: errors.array()
            })
        }
        const { title, content, category } = req.body
        if (!article) {
            return next(errorHandling('Article not found', 404));
        }

        if (req.file) {
            const filePath = path.join("./public/uploads/", article.image);
            fs.unlink(filePath, (err) => {
                console.log("Delete error:", err, filePath);
                return;
            })
        }

        article.title = title;
        article.content = content;
        article.category = category;
        article.image = req.file ? req.file.filename : article.image;
        await article.save();

        res.redirect('/api/admin/articales');
    } catch (err) {
        next(err);
    }
}

// article delete
export const articleDelete = async (req, res, next) => {
    try {

        const article = await Artical.findById(req.params.id);
        const filePath = path.join("./public/uploads/", article.image);

        if (!article) {
            return next(errorHandling('Article not found', 404));
        }

        if (article.image) {
            const filePath = path.join(
                process.cwd(),
                "public",
                "uploads",
                article.image
            );
            if (fs.existsSync(filePath)) {
                fs.unlink(filePath, (err) => {
                    if (err) {
                        console.error("Delete error:", err.message);
                    } else {
                        console.log("Old image deleted");
                    }
                });
            } else {
                console.log("File does not exist:", filePath);
            }
        }

        await Artical.findByIdAndDelete(req.params.id);
        res.status(200).json({ message: 'News deleted' });
    } catch (err) {
        next(err);
    }
}