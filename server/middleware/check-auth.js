//middleware di controllo autenticazione da passare alle rotte che necessitano di protezione
module.exports = () => {
    return (req, res, next) => {
        if (!req.isAuthenticated()) return res.redirect('/login');
        next();
    }
}