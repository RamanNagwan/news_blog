import { json } from "express";
import User from "../model/userModel.js";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import cookieParser from 'cookie-parser'

export const dashboard = (req, res) => {
    res.render('admin/dashboard', {
        layout: 'admin/layout',
        role: req.role
    })
}

export const login = (req, res) => {
    try {
        res.render('admin/login', {
            layout: false,
        });
    } catch (err) {
        res.status(500).json({ message: `Login error ${err}` });
    }
}

// login
export const loginPost = async (req, res) => {
    try {

        const user = await User.findOne({ username: req.body.username });

        if (!user) return res.status(404).json({ message: `User not found` });

        const isMatch = await bcrypt.compare(req.body.password, user.password);

        if (!isMatch) return res.status(404).json({ message: `Password not match` });

        const token = jwt.sign({
            role: user.role,
            userId: user._id,
            username: user.username,
            fullname: user.fullname
        }, process.env.JWT_SECRET,
            { expiresIn: "1d" });

        if (!token) return res.status(404).json({ message: `Token not set` });

        res.cookie("token", token, {
            httpOnly: true,
            sameSite: "strict",
            maxAge: 24 * 60 * 60 * 1000
        });

        res.render('admin/dashboard', { layout: 'admin/layout', role: user.role });

    } catch (err) {
        res.status(500).json({ message: `Login error : ${err}` });
    }
}

// logOut 
export const logout = (req, res) => {
    try {
        res.clearCookie("token");
        res.redirect('/api/login');
    } catch (err) {
        res.status(500).json({ message: `Internal server error : ${err}` });
    }
}

export const getUsers = async (req, res) => {
    try {
        const users = await User.find();
        res.render('admin/users/index', { layout: "admin/layout", users, role: req.role });
    } catch (err) {
        res.status(500), json({ message: `Internal server error ${err}` })
    }
}

export const addUser = (req, res) => {
    try {
        res.render('admin/users/create', { layout: "admin/layout", role: req.role });
    } catch (err) {
        res.status(500).json({ message: `Internal server error ${err}` });
    }
}

export const addUserPost = (req, res) => {
    try {
        const user = User.create(req.body);
        if (!user) return res.status(204).json({ message: `User not save` });
        res.render('admin/dashboard', {
            layout: 'admin/layout',
            role: req.role
        });
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