import mongoose from "mongoose";
import bcrypt from 'bcrypt';

const schema = mongoose.Schema({
    fullname :{
        type : String,
        required : true
    }, 
    username :{
        type: String,
        required : true
    },
    password : {
        type : String,
        required : true
    },
    role : {
        type : String,
        enum : ['admin', 'author'],
        default : "author",
        required : true
    }
});

schema.pre('save',function(next){
    const haspassword = bcrypt.hash(password, 10);
    console.log(haspassword);
    next()
})

const User = mongoose.model("User", schema);

export default User;