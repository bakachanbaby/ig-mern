const express = require('express');
const {
    signup,
    signin,
    loginWithSocialFail,
    loginWithSocialSuccess,
    loginWithGoogle,
    loginWithGithub,
} = require('../controllers/authController');
const { getAllUsers } = require('../controllers/userController');

const router = express.Router();
const passport = require('passport');

router.post('/signup', signup);
// Sign in with passport-local
router.post('/signin', signin);

// Sign in with passport-google-oauth20
router.get('/login/failed', loginWithSocialFail);

router.get('/login/success', loginWithSocialSuccess);

router.get('/google', passport.authenticate('google', { scope: ['profile'] }));
router.get('/google/callback', loginWithGoogle);

router.get('/github', passport.authenticate('github', { scope: ['profile'] }));
router.get('/github/callback', loginWithGithub);

// router.get('/logout', (req, res) => {
//   req.logout()
// })

router.route('/').get(getAllUsers);

module.exports = router;