import User from "../model/userModel.js";

export const getUsers =async (req, res)=>{
    const Users =await User.find();
    res.render('admin/users', {Users});
}