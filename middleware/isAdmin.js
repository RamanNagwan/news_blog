


const isAdmin = (req, res, next) => {
    if (req.role === 'admin') {
        next();
    } else {
        res.redirect('/api/dashboard');
    }
}

export default isAdmin;