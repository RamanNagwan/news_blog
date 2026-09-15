import { json } from "express";
import User from "../model/userModel.js";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import cookieParser from 'cookie-parser';
import { validationResult } from 'express-validator';
import errorHandling from "../utils/errorHandling.js";

// dashboard
export const dashboard = (req, res, next) => {
    res.render('admin/dashboard', {
        layout: 'admin/layout',
        role: req.role
    })
}
// login render
export const login = (req, res) => {
    try {
        res.render('admin/login', {
            layout: false,
            errors: []
        });
    } catch (err) {
        next(err);
    }
}

// login
export const loginPost = async (req, res, next) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.render('admin/login', {
                layout: false,
                errors: errors.array()
            })
        }
        const user = await User.findOne({ username: req.body.username });

        if (!user) { return res.status(404).json({ message: `User not found` }) };

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
        next(err);
    }
}

// logOut 
export const logout = (req, res, next) => {
    try {
        res.clearCookie("token");
        res.redirect('/api/login');
    } catch (err) {
        next(err)
    }
}

export const getUsers = async (req, res, next) => {
    try {
        const users = await User.find();
        res.render('admin/users/index', { layout: "admin/layout", users, role: req.role });
    } catch (err) {
        next(err)
    }
}

export const addUser = (req, res, next) => {
    try {
        res.render('admin/users/create', { layout: "admin/layout", role: req.role });
    } catch (err) {
        next(err);
    }
}

export const addUserPost = (req, res, next) => {
    try {
        const user = User.create(req.body);
        if (!user) return res.status(204).json({ message: `User not save` });
        res.render('admin/dashboard', {
            layout: 'admin/layout',
            role: req.role
        });
    } catch (err) {
        next(err)
    }
}

export const deleteUser = async (req, res, next) => {
    try {
        await User.findByIdAndDelete(req.params.id);
        res.sendStatus(200);
    } catch (err) {
        next(err);
    }
}

export const updateUser = async (req, res, next) => {
    try {
        const user = await User.findById(req.params.id);
        if (!user) {
            return next(errorHandling('User not found', 404));
        }

        res.render('admin/users/update', {
            layout: 'admin/layout',
            user
        })
    } catch (err) {
        next(err)
    }
}

export const updatePost = async (req, res, next) => {
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
        next(err)
    }
} 