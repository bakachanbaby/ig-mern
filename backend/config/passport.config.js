const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const GitHubStrategy = require('passport-github2').Strategy;
// muốn dùng facebooke strategy cần https
const bcrypt = require('bcryptjs');

const User = require('../models/userModel');

passport.use(
    new LocalStrategy((username, password, done) => {
        console.log('🚀 ~ file: passport.config.js:8 ~ password', password);
        User.findOne({ username }, async (err, user) => {
            if (err) {
                return done(err);
            }
            if (!user) {
                return done({ message: 'Username is not existed' }, false);
            }
            if (user) {
                const checkCorrectPassword = await bcrypt.compare(
                    password,
                    user.password
                );
                if (checkCorrectPassword) {
                    return done(null, user);
                }
                return done(
                    { message: 'Username or password is invalid' },
                    false
                );
            }
        });
    })
);

passport.use(
    new GoogleStrategy(
        {
            clientID: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
            callbackURL: '/api/v1/users/google/callback',
        },
        function (accessToken, refreshToken, profile, done) {
            // tìm hoặc lưu vào DB
            // User.findOrCreate({ googleId: profile.id }, function (err, user) {
            //     return done(err, user);
            // });
            return done(null, profile);
        }
    )
);

passport.use(
    new GitHubStrategy(
        {
            clientID: process.env.GITHUB_CLIENT_ID,
            clientSecret: process.env.GITHUB_CLIENT_SECRET,
            callbackURL: '/api/v1/users/github/callback',
        },
        function (accessToken, refreshToken, profile, done) {
            // User.findOrCreate({ githubId: profile.id }, function (err, user) {
            //     return done(err, user);
            // });
            return done(null, profile);
        }
    )
);

passport.serializeUser((user, done) => {
    done(null, user);
});

passport.deserializeUser((user, done) => {
    done(null, user);
});

module.exports = passport;
