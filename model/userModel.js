import mongoose from "mongoose";
import bcrypt from 'bcrypt';

const userSchema = mongoose.Schema({
    fullname: {
        type: String,
        required: true
    },
    username: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    role: {
        type: String,
        enum: ['admin', 'author'],
        default: "author",
        required: true
    }
});

userSchema.pre('save', async function () {
    if (!this.isModified(`password`)) return next();
    this.password = await bcrypt.hash(this.password, 10);
})

const User = mongoose.model("User", userSchema);

export default User;