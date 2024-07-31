const express = require("express");
const router = express.Router();
const LocalUser = require("../model/users");
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const GoogleStrategy = require("passport-google-oauth20").Strategy;

//passport section here:
passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.CLIENT_ID,
      clientSecret: process.env.CLIENT_SECRET,
      callbackURL: process.env.CALLBACK_URL,
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        /*
         0 email
         1 @blabla.com        
        */
        console.log(profile.emails[0].value.split("@")[0]);
        const user = await LocalUser.loginGoogleUser(
          profile.emails[0].value,
          profile.displayName,
          profile.id
        );
        console.log(user);
        if (!user) {
          throw Error("User is not created, Successfully!");
        }
        return done(null, profile.displayName);
      } catch (error) {
        return done(error, null);
      }
    }
  )
);

passport.use(
  "login",
  new LocalStrategy(
    {
      usernameField: "email",
      passwordField: "password",
      passReqToCallback: true,
      session: false,
    },
    async function (req, email, password, done) {
      try {
        const match = await LocalUser.loginLocalUser(email, password);
        if (match !== null) {
          return done(null, { email: email, display_name: match });
        } else {
          return done(null, false, {
            message: "Incorrect username or password.",
          });
        }
      } catch (err) {
        return done(null, false, {
          message: "An error occurred during authentication.",
        });
      }
    }
  )
);

passport.serializeUser(function (user, done) {
  done(null, user);
});

passport.deserializeUser(function (user, done) {
  done(null, user);
});

router.post("/login", (req, res, next) => {
  passport.authenticate("login", (err, user, info) => {
    if (err) {
      console.error("Error in Passport.js authentication:", err);
      return res
        .status(500)
        .json({ error: "An error occurred while logging in." });
    }

    if (!user) {
      console.log("Line 62: Error in Passport.js login:");
      return res.status(200).json({ error: info.message });
    }

    req.logIn(user, (err) => {
      if (err) {
        console.error("Error in Passport.js login:", err);
        return res
          .status(500)
          .json({ error: "An error occurred while logging in." });
      }

      res.cookie("username", user.display_name, {
        maxAge: 24 * 60 * 60 * 1000,
      });
      console.log(req.session.passport.user);
      return res.json({ message: "Login successful" });
    });
  })(req, res, next);
});

router.post("/signup", async function (req, res) {
  console.log(req.body);

  const isUserCreated = await LocalUser.createLocalUser(
    req.body.email,
    req.body.password,
    req.body.display_name,
    req.body.bio,
    req.body.profile_pic
  );
  if (isUserCreated.success) {
    res.cookie("username", isUserCreated.display_name, {
      maxAge: 24 * 60 * 60 * 1000, // 24 hours
    });
    res.status(200).json({ message: "User created successfully" });
  } else {
    res.status(400).json({ error: "User already exists" });
  }
});

router.post("/validEmail", async (req, res) => {
  const email = req.body.email;
  console.log("email", email);
  if (!email) {
    res.status(400);
  }
  const valid = await LocalUser.checkValidEmail(email);
  res.status(200).json({ valid: valid });
});

router.post("/validDisplayName", async (req, res) => {
  const display_name = req.body.display_name;
  console.log("display_name", display_name);
  if (!display_name) {
    res.status(400);
  }
  const valid = await LocalUser.checkValidDisplayName(display_name);
  res.status(200).json({ valid: valid });
});

router.get(
  "/auth/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);

// Google OAuth callback route
router.get(
  "/auth/google/callback",
  passport.authenticate("google"),
  function (req, res) {
    res
      .cookie("username", req.session.passport.user, {
        maxAge: 24 * 60 * 60 * 1000,
      })
      .redirect("http://localhost:3000");
  }
);

router.get("/checkUsername/:username", async function (req, res) {
  console.log("username: ", req.params.username);
  const response = await LocalUser.getDisplayName(req.params.username);
  console.log(response);
  const usernameExists = typeof response !== "undefined";
  res.json({ usernameExists: usernameExists });
});

module.exports = router;
