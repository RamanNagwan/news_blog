import Category from "../model/categoryModel.js";
import slugify from 'slugify'
import errorHandling from "../utils/errorHandling.js";

// Categories 
export const getCategories = async (req, res, next) => {
    try {
        const categories = await Category.find();
        if (!categories) return res.status(404).json({ message: `Categories not found` });
        res.render("admin/category/index", { categories, layout: 'admin/layout', role: req.role });
    } catch (err) {
        next(err);
    }
}

// Add category
export const addCategory = async (req, res, next) => {
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
        next(err);
    }
}

export const addedcategory = (req, res, next) => {
    try {
        res.render('admin/category/add-category', {
            layout: 'admin/layout',
            role: req.role
        })
    } catch (err) {
        next(err);
    }
}

// Update render
export const updateCategory = async (req, res, next) => {
    try {
        const category = await Category.findOne({ "_id": req.params.id });
        if (!category) return res.status(404).json({ message: `Category not found` });
        res.render('admin/category/update-category', {
            layout: 'admin/layout',
            category,
            role: req.role
        });
    } catch (err) {
        next(err);
    }
}

// Update POST
export const updateCategoryPost = async (req, res, next) => {
    try {
        // res.send(req.body)
        const slug = slugify(req.body.name, { lower: true });
        const updateCategory = await Category.findByIdAndUpdate(req.params.id, {
            name: req.body.name,
            slug: slug,
            description: req.body.description
        });
         if (!updateCategory) {
            return next(errorHandling('Category not found', 404));
        }
        
        res.redirect('/api/admin/categories');
    } catch (err) {
        next(err);
    }
}

// Delete 
export const deleteCategory = async (req, res, next) => {
    try {
        const category = await Category.findOneAndDelete({ "_id": req.params.id });
        if (!category){
            return next(errorHandling('Category not found', 404));
        } 
        res.sendStatus(200);
    } catch (err) {
        next(err);
    }
}