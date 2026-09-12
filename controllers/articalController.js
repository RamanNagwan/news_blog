import Artical from "../model/articalModel.js";
import Category from "../model/categoryModel.js";

// Get artical 
export const allArtical = async (req, res) => {
    try {
        const artical = await Artical.find().populate('author','fullname').populate('category','name');
        res.render('admin/artical', { layout: 'admin/layout', role: req.role, artical });
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