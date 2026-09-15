import mongoose from "mongoose";
import slugify from 'slugify';

const categorySchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    slug: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    }
});

const Category = mongoose.model('Category', categorySchema);

categorySchema.pre('validate', async function (next) {
   this.slug = slugify(this.name, { lower: true });
   next()
});


export default Category;