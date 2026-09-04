import { json } from "express";
import User from "../model/userModel.js";
import bcrypt from 'bcrypt';

export const getUsers = async (req, res) => {
    try {
        const users = await User.find();
        res.render('admin/users/index', { layout: "admin/layout", users });
    } catch (err) {
        res.status(500), json({ message: `Internal server error ${err}` })
    }
}

export const addUser = (req, res) => {
    try {
        res.render('admin/users/create', { layout: "admin/layout" });
    } catch (err) {
        res.status(500).json({ message: `Internal server error ${err}` });
    }
}

export const addUserPost = (req, res) => {
    try {
        const user = User.create(req.body);
        if (!user) return res.status(204).json({ message: `User not save` });
        res.redirect('/api/admin/users');
    } catch (err) {
        res.status(500).json({ message: `Internal server error ${err}` });
    }
}

export const deleteUser = async (req, res) => {
    try {
        const user = await User.findByIdAndDelete(req.params.id);
        res.sendStatus(200);
    } catch (err) {
        res.status(500).json({ message: `Error deleteing user ${err}` })
    }
}

export const updateUser = async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        if (!user) res.status(404).json({ message: 'User not found' });
        res.render('admin/users/update', {
            layout: 'admin/layout',
            user
        })
    } catch (err) {
        res.status(500).json({ message: `Error updating user form ${err}` });
    }
}

export const updatePost = async (req, res) => {
    try {
        const { fullname, password, role } = req.body;
        const hasPassword = await bcrypt.hash(password, 10);
        const user = await User.findByIdAndUpdate(req.params.id, {
            fullname: fullname,
            password: hasPassword,
            role: role
        });
        res.redirect('/api/admin/users');
    } catch (err) {
        res.status(500).json({ message: `Error update user` });
    }
} 