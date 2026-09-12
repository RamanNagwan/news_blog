import multer from "multer";
import path from "path";
import fs from 'fs';

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, './public/uploads/');
    },
    filename: (req, file, cb) => {
        const ext = path.extname(file.originalname);
        // console.log(Date.now() + ext);
        cb(null, Date.now() + ext);
    }
})

const fileFilter = (req, file, cb) => {
    const allowedExtions = [".jpg", ".jpeg", ".png"];
    const ext = path.extname(file.originalname).toLowerCase();

    if (allowedExtions.includes(ext)) {
        cb(null, true)
    } else {
        cb(new Error("Only images file are allowed"));
    }
}

const imageUpload = multer({ storage, fileFilter });
export default imageUpload;