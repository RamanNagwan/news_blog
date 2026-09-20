
import Artical from "../model/articalModel.js"
import Category from "../model/categoryModel.js"


const localCommonData =async (req, res, next) => {
    try {
        // Find used Category only 
        const findCategoriesId =await Artical.distinct('category');
        const categories =await Category.find({'_id':findCategoriesId}).select({'name':1});

        // Find recent post only
        const recentPosts =await Artical.find()
        .populate('category',{'name':1, 'slug':1})
        .populate('author','fullname')
        .sort({createdAt : -1}).limit(5)

        res.locals.categories = categories
        res.locals.recentPosts = recentPosts
        next()
    } catch (err) {
        res.status(404).json({ message: `Common data not found :${err}` })
    }
}

export default localCommonData;