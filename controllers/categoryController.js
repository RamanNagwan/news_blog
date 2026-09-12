import Category from "../model/categoryModel.js";
import slugify from 'slugify'

// Categories 
export const getCategories = async (req, res) => {
    try {
        const categories = await Category.find();
        if (!categories) return res.status(404).json({ message: `Categories not found` });
        res.render("admin/category/index", { categories, layout: 'admin/layout', role: req.role });
    } catch (err) {
        res.status(500).json({ message: `Internal server error : ${err}` });
    }
}

// Add category
export const addCategory = async (req, res) => {
    try {
        const slug = slugify(req.body.name, { lower: true });
        const category = await Category.create({
            name: req.body.name,
            slug: slug,
            description: req.body.description
        });
        if (!category) return res.status(201).json({ message: `category not added` });
        res.redirect('/api/admin/categories');
    } catch (err) {
        res.status(500).json({ message: `Added category error : ${err}` });
    }
}

export const addedcategory = (req, res) => {
    try {
        res.render('admin/category/add-category', {
            layout: 'admin/layout',
            role: req.role
        })
    } catch (err) {
        res.status(500).json({ message: `add category render error : ${err}` })
    }
}

// Update render
export const updateCategory = async (req, res) => {
    try {
        const category = await Category.findOne({"_id" :req.params.id});
        if (!category) return res.status(404).json({ message: `Category not found` });
        res.render('admin/category/update-category', {
            layout: 'admin/layout',
            category,
            role: req.role
        });
    } catch (err) {
        res.status(500).json({ message: `Update-category error ${err}` });
    }
}

// Update POST
export const updateCategoryPost = async (req, res) => {
    try {
        // res.send(req.body)
        const slug = slugify(req.body.name, { lower: true });
        const updateCategory = await Category.findByIdAndUpdate(req.params.id, {
            name: req.body.name,
            slug: slug,
            description: req.body.description
        });
        if (!updateCategory) return res.status(404).json({ message: `Category not found` });
        res.redirect('/api/admin/categories');
    } catch (err) {
        res.status(500).json({ message: `Cateogy update error : ${err}` });
    }
}

// Delete 
export const deleteCategory = async (req, res) => {
    try {
        const category = await Category.findOneAndDelete({"_id" : req.params.id});
        if (!category) return res.status(404).json({ message: `Category not found` });
        res.sendStatus(200);
    } catch (err) {
        res.status(500).json({ message: `Delete category error : ${err}` })
    }
}