import express from "express";
const UserRoutes = express.Router();
import * as auth from "../Controller/UserCountroller.js";
import { RequiredLoggedIn } from "../Middleware/Auth.js";

UserRoutes.route("/pre-signup").post(auth.preSignup);
UserRoutes.route("/signup").post(auth.Signup);
UserRoutes.route("/login").post(auth.login);
UserRoutes.route("/forget-password").post(auth.forgetPassword);
UserRoutes.route("/access").post(auth.AccessAcount);
UserRoutes.route("/reset-password").put(RequiredLoggedIn, auth.ResetPassword);
UserRoutes.route("/refresh").post(auth.refreshToken);
UserRoutes.route("/logout" ).delete(auth.logoutUser)

export default UserRoutes;
