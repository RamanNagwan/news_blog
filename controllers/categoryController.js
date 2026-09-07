import Category from "../model/categoryModel.js";

export const getCategories = async (req, res) => {
    try {
        const categories = await Category.find();
        if (!categories) return res.status(404).json({ message: `Categories not found` });
        res.render("admin/category/category", { categories, layout: 'admin/layout', role: req.role });
    } catch (err) {
        res.status(500).json({ message: `Internal server error : ${err}` });
    }
}