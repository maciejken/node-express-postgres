module.exports = {

    index(req, res) {
        return res.render('index.ejs');
    },

    login(req, res) {
        return res.render('login.ejs', {message: req.flash('loginMessage')});
    },

    signup(req, res) {
        return res.render('signup.ejs', {message: req.flash('loginMessage')});
    },

    profile(req, res) {
        return res.render('profile.ejs', {user: req.user});
    },

    logout(req, res) {
        function logout() {
            req.logout();
            res.redirect('/');
        }
        return logout();
    }
};