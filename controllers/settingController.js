import Setting from "../model/settingModel.js";
import fs from 'fs';
import path from "path";

// setting render
export const setting = async (req, res, next) => {
    try {
        const setting = await Setting.findOne();
        res.render('admin/setting', { role: req.role, layout: 'admin/layout', setting });
    } catch (err) {
        next(err)
    }
}

// update setting
export const settingPost = async (req, res, next) => {
    try {
        const updateData = {
            title: req.body.title,
            footer: req.body.footer
        }
        if (req.file) {
            updateData.logo = req.file.filename
        }

        const setting = await Setting.findOne();

        if (req.file) {
            const filePath = path.join("public/uploads/", setting.logo);
            await fs.unlink(filePath, (err) => {
                console.log(`Setting logo error : ${err}`);
            })
        }

        if (setting) {
            Object.assign(setting, updateData);
            await setting.save();
        } else {
            Setting.create(updateData);
        }
        res.redirect('setting');
    } catch (err) {
        next(err);
    }
}