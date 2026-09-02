import User from "../model/userModel.js";

export const getUsers = async (req, res) => {
    const users = await User.find();
    res.render('admin/users/index', {layout: "admin/layout",users});
}