const passport = require('passport');
const passportJWT = require('passport-jwt');
const UsersRepo = require('../api/repositories/userRepository');
const AppError = require('../utils/appError');

const JWTStrategy = passportJWT.Strategy;
const ExtractJWT = passportJWT.ExtractJwt;

const options = {
  jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
  secretOrKey: process.env.JWT_SECRET,
};

passport.use(
  new JWTStrategy(options, async (payload, done) => {
    try {
      const userId = payload.sub;

      const user = await UsersRepo.findById(userId);

      if (!user) {
        return done(new AppError('Authentication failed', 400));
      }

      return done(null, user);
    } catch (err) {
      return done(
        new AppError('Error occured while trying to authenticate the user', 500)
      );
    }
  })
);

module.exports = passport;
