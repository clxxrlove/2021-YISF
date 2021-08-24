const passport = require('passport');
const passportJWT = require('passport-jwt');
const JWTStrategy = passportJWT.Strategy;
const ExtractJWT = passportJWT.ExtractJwt;
const LocalStrategy = require('passport-local').Strategy;
const UserModel = require('../models').User;
const crypto = require('crypto');
require('dotenv').config();
module.exports = () => {
    // Local Strategy
    passport.use('local', new LocalStrategy({
            usernameField: 'email',
            passwordField: 'password'
        },
        function (email, password, done) {
            const cipher = crypto.createHash('sha512').update(password).digest('hex');
            return UserModel.findOne({ where: { email: email, password: cipher }})
                .then(user => {
                    if (!user) {
                        return done(null, false, { message: 'Incorrect email or password.' });
                    }
                    return done(null, user, { message: 'Logged In Successfully' });
                })
                .catch(err => done(err));
        }
    ));

    //JWT Strategy
    passport.use(new JWTStrategy({
            jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
            secretOrKey   : process.env.JWT_SECRET
        },
        function (jwtPayload, done) {
            return  UserModel.findOne({ where: { uid: jwtPayload.uid }})
                .then(user => {
                    return done(null, user);
                })
                .catch(err => {
                    return done(err);
                });
        }
    ));
}