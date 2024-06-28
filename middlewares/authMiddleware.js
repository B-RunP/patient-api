const passport = require("passport");
const passportJWT = require("passport-jwt");
const LocalStrategy = require("passport-local").Strategy;
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const ExtractJWT = passportJWT.ExtractJwt;
const JWTStrategy = passportJWT.Strategy;
const bcrypt = require("bcryptjs");
const pool = require("../dbConfig");

const JWT_SECRET =
  "8c8001393c76cb77aeb35c6d10b8f926906d5e35929aa88654ac707b3cbac7b2f6a1e85b323b295f2a1d0425b83f5d60e7698a7d12dd4d9fb8993949c76cf3df";

// middleware untuk autentikasi
passport.use(
  new LocalStrategy((username, password, done) => {
    pool.query(
      "SELECT * FROM users WHERE username = ?",
      [username],
      (err, results) => {
        if (err) return done(err);
        if (results.length === 0) {
          return done(null, false, { message: "Incorrect username." });
        }
        const user = results[0];
        bcrypt.compare(password, user.password, (err, isMatch) => {
          if (err) return done(err);
          if (isMatch) {
            return done(null, user);
          } else {
            return done(null, false, { message: "Incorrect password." });
          }
        });
      }
    );
  })
);

// Strategi login dengan google, masih belum mencantumkan google client id dan client secret terlebih dahulu di google cloud
passport.use(
  new GoogleStrategy(
    {
      clientID: "your_google_client_id",
      clientSecret: "your_google_client_secret",
      callbackURL: "http://localhost:5000/auth/google/callback",
    },
    (token, tokenSecret, profile, done) => {
      pool.query(
        "SELECT * FROM users WHERE google_id = ?",
        [profile.id],
        (err, results) => {
          if (err) return done(err);
          if (results.length > 0) {
            return done(null, results[0]);
          } else {
            const newUser = {
              google_id: profile.id,
              username: profile.displayName,
              role: "user",
            };
            pool.query("INSERT INTO users SET ?", newUser, (err, results) => {
              if (err) return done(err);
              newUser.id = results.insertId;
              return done(null, newUser);
            });
          }
        }
      );
    }
  )
);

passport.use(
  new JWTStrategy(
    {
      jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
      secretOrKey: JWT_SECRET,
    },
    (jwtPayload, done) => {
      pool.query(
        "SELECT * FROM users WHERE id = ?",
        [jwtPayload.id],
        (err, results) => {
          if (err) return done(err);
          if (results.length > 0) {
            return done(null, results[0]);
          } else {
            return done(null, false);
          }
        }
      );
    }
  )
);

exports.authenticateLocal = passport.authenticate("local", { session: false });
exports.authenticateGoogle = passport.authenticate("google", {
  scope: ["profile", "email"],
});
exports.authenticateGoogleCallback = passport.authenticate("google", {
  session: false,
});
exports.authenticateJWT = passport.authenticate("jwt", { session: false });

exports.initializePassport = () => {
  return [passport.initialize(), passport.session()];
};
