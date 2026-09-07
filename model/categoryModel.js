import mongoose from "mongoose";
import slugify from 'slugify';

const schema = mongoose.Schema({
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

const Category = mongoose.model('categories', schema);

schema.pre('validate', async function () {
    const slug = this.slug = slugify(this.name, "_");
    console.log(slug)
});

export default Category;