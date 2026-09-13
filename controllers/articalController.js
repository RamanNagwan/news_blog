import Artical from "../model/articalModel.js";
import Category from "../model/categoryModel.js";
import User from "../model/userModel.js";
import fs from "fs";
import path from "path";

// Get artical 
export const allArtical = async (req, res) => {
    try {
        const articales = await Artical.find().populate('author', 'fullname').populate('category', 'name');
        res.render('admin/artical', { layout: 'admin/layout', role: req.role, articales });
    } catch (err) {
        res.status(500).json({ message: `Artical error : ${err}`, role: req.role });
    }
}

// add Artical
export const addArtical = async (req, res) => {
    try {
        const categories = await Category.find();
        res.render('admin/artical/add-artical', { layout: 'admin/layout', role: req.role, categories });
    } catch (err) {
        res.status(500).json({ message: `Add artical error :${err}` });
    }
}

// added Artical
export const addedArtical = async (req, res) => {
    try {
        // res.send(req.body)
        const artical = await Artical.create({
            title: req.body.title,
            content: req.body.content,
            category: req.body.category,
            author: req.id,
            image: req.file.filename
        })
        res.redirect("articales");
    } catch (err) {
        res.status(500).json({ message: `Add artical error :${err}` });
    }
}

// update Article
export const updateArticle = async (req, res) => {
    try {
        const categories = await Category.find();
        const article = await Artical.findOne({ _id: req.params.id });
        res.render('admin/artical/update-article', {
            layout: 'admin/layout',
            role: req.role,
            categories,
            article
        });
    } catch (err) {
        res.status(500).json(`Update article error : ${err}`);
    }
}

// Article Update
export const articleUpdated = async (req, res) => {
    try {
        const { title, content, category } = req.body

        const article = await Artical.findOne({ _id: req.params.id });
        if (!article) return res.status(404).json({ message: `News not found` });

        if (req.file) {
            const filePath = path.join("./public/uploads/", article.image);
            fs.unlink(filePath, (err) => {
                console.log("Delete error:", err, filePath);
                return;
            })
        }

        if (req.role == 'admin') {
            article.title = title;
            article.content = content;
            article.category = category;
            article.image = req.file ? req.file.filename : article.image;

        } else if (req.id == article.user) {
            article.title = title;
            article.content = content;
            article.category = category;
            article.image = req.file ? req.file.filename : article.image;

        } else {
            res.status(201).json({ message: `Your are not authorized` });
        }
        await article.save();
        res.redirect('/api/admin/articales');
    } catch (err) {
        res.status(500).json({ message: `Article updated error : ${err}` });
    }
}

// article delete
export const articleDelete = async (req, res) => {
    try {
        const article = await Artical.findById(req.params.id);
        const filePath = path.join("./public/uploads/", article.image);

        if (!article) return res.status(404).json({ message: `News not found` });

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
        res.status(500).json(`Internal server error : ${err}`);
    }
}