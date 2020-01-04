module.exports = {
    ensureAuthenticated: async function(req, res, next) {
        if (req.session.username != undefined) {
            return next();
        }
        res.redirect('/login');
    }
}