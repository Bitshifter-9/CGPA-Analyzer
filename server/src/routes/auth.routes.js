import express from "express";
import passport from "passport";
import {
  createUser,
  loginUser,
  logoutUser,
} from "../controllers/auth.controller.js";
const authRouter = express.Router();

authRouter.post("/register", createUser);
authRouter.post("/login", loginUser);
authRouter.post("/logout", logoutUser);

authRouter.get("/google", (req, res, next) => {
  try {
    const strat =
      passport &&
      typeof passport._strategy === "function" &&
      passport._strategy("google");
    if (!strat)
      return res
        .status(501)
        .json({ error: "Google OAuth not configured on server" });
    return passport.authenticate("google", {
      scope: ["profile", "email"],
      prompt: "select_account", // Always show account selection
    })(req, res, next);
  } catch (err) {
    console.error("Error starting Google auth flow", err);
    return res.status(500).json({ error: "Unable to start Google OAuth" });
  }
});

authRouter.get(
  "/google/callback",
  (req, res, next) => {
    try {
      const strat =
        passport &&
        typeof passport._strategy === "function" &&
        passport._strategy("google");
      if (!strat)
        return res.redirect(
          process.env.CLIENT_URL || "https://cgpa-analyzer.vercel.app"
        );
      return passport.authenticate("google", {
        session: false,
        failureRedirect:
          process.env.CLIENT_URL || "https://cgpa-analyzer.vercel.app",
      })(req, res, next);
    } catch (err) {
      console.error("Error handling Google callback", err);
      return res.redirect(
        process.env.CLIENT_URL || "https://cgpa-analyzer.vercel.app"
      );
    }
  },
  async (req, res) => {
    try {
      const payload = req.user || {};
      const { generateToken } = await import("../utils/generateToken.js");
      generateToken(res, payload);

      // Determine base URL: environment variable > origin > fallback
      let baseUrl = process.env.CLIENT_URL;
      if (!baseUrl && req.headers.origin) {
        baseUrl = req.headers.origin;
      } else if (!baseUrl && req.headers.referer) {
        try {
          const url = new URL(req.headers.referer);
          baseUrl = url.origin;
        } catch (e) {
          baseUrl = "https://cgpa-analyzer.vercel.app";
        }
      } else if (!baseUrl) {
        baseUrl = "https://cgpa-analyzer.vercel.app";
      }

      const redirectTo = `${baseUrl}/dashboard`;
      return res.redirect(redirectTo);
    } catch (err) {
      console.error("OAuth callback error", err);
      return res.redirect(
        process.env.CLIENT_URL || "https://cgpa-analyzer.vercel.app"
      );
    }
  }
);

export default authRouter;
