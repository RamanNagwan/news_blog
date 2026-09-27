import { response } from "express";
import Comment from "../model/commentModel.js";

export const comments = async (req, res) => {
    try {
        const comments = await Comment.find();
        // res.json(comments)
        res.render('admin/comment', {
            layout: 'admin/layout',
            role: req.role,
            comments
        });
    } catch (err) {
        res.send(`Comment Error ${err}`);
    }
}

export const addComment = async (req, res) => {
    try {
        // res.send('add comment')
        const article = req.params.id;
        const { name, email, comment } = req.body
        const addcomment = await Comment.create({ name, email, comment, article });
        res.redirect(`/single-news/${req.params.id}`);
    } catch (err) {
        res.send(`Add comment error : ${err}`);
    }
}

export const updatedComment = async (req, res) => {
    try {
        const updateComment = await Comment.findByIdAndUpdate(
            { _id: req.params.id },
            { status: req.body.status }
        );

        res.status(200).json({
            response: 'ok',
            message: 'Commment updated'
        });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}