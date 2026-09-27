import mongoose from "mongoose";

const schema = mongoose.Schema({
    article: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'articales',
        required: true
    },
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    comment: {
        type: String,
        required: true
    },
    status: {
        type: String,
        enum: ['approved', 'pendding', 'rejected'],
        default: 'pendding',
        required: true
    }
}, {
    timestamps: true
})

const Comment = mongoose.model('Comment', schema);

export default Comment;