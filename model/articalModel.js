import mongoose from "mongoose";
import mongoosePaginate from 'mongoose-paginate-v2';


const scheam = mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    content: {
        type: String,
        required: true
    },
    category: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Category",
        required: true
    },
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    image: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now()
    }
})

scheam.plugin(mongoosePaginate);

const Artical = mongoose.model("articales", scheam);
export default Artical;