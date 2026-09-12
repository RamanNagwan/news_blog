import jwt from 'jsonwebtoken';

const isLoggedIn = (req, res, next) => {
    try {
        const token = req.cookies.token;
        if (!token) return res.redirect('/api/login');
        const decode = jwt.verify(token, process.env.JWT_SECRET);
        req.username = decode.username;
        req.fullname = decode.fullname;
        req.id= decode.userId;
        req.role = decode.role;
        // console.log(decode)
        next();
    } catch (err) {
        res.status(401).json({ message: `Loggin error : ${err}` });
    }
}

export default isLoggedIn;