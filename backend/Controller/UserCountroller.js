import validator from "email-validator";
import jwt from "jsonwebtoken";
import User from "../Model/UserModel.js";
import { sendEmail } from "../Helper/Email.js";
import bcryptjs from "bcryptjs";
import { nanoid } from "nanoid";
import {
  generateAccessToken,
  generateRefreshToken,
} from "../Helper/SendToken.js";

export const preSignup = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Check if email already exists
    const emailExist = await User.findOne({ email });
    if (emailExist) {
      return res.json({ error: "Email already exists" });
    }

    // Hash password before saving
    const salt = await bcryptjs.genSalt(12);
    const hashedPassword = await bcryptjs.hash(password, salt);

    // Save user directly in DB
    const user = await new User({
      email,
      password: hashedPassword,
      username: nanoid(8),
    }).save();

    // JWT Token for future use (optional)
    const token = jwt.sign({ email, password }, process.env.JWT_SECRET, {
      expiresIn: "10m",
    });

    // Try sending email (ignore error if fails)
    try {
      await sendEmail(
        email,
        "Verify your account",
        `<a href="${process.env.Client_Url}/auth/activate/${token}"
          style="
            display: inline-block;
            padding: 12px 24px;
            font-size: 16px;
            color: white;
            background-color: #f97316;
            text-decoration: none;
            border-radius: 6px;
            font-weight: bold;
            margin-top: 20px;
          "
        >Activate Account</a>`
      );
    } catch (err) {
      console.log("⚠️ Email not sent (Resend free mode):", err.message);
    }

    // Response
    return res.json({
      message:
        "Signup successful! You can now log in. (Email may not be delivered in free mode)",
      user: { _id: user._id, email: user.email },
    });
  } catch (error) {
    return res.status(500).json({ error: "Server error: " + error.message });
  }
};


export const Signup = async (req, res) => {
  try {
    const { email, password } = jwt.verify(
      req.body.token,
      process.env.JWT_SECRET
    );

    const userExist = await User.findOne({ email });
    if (userExist) return res.json({ error: "Email already exists" });

    const salt = await bcryptjs.genSalt(12);
    const hashedPassword = await bcryptjs.hash(password, salt);

    const user = await new User({
      email,
      password: hashedPassword,
      username: nanoid(8),
    }).save();

    const token = generateAccessToken(user);
    const refreshToken = generateRefreshToken(user);

    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    res.json({
      message: "Signup successful",
      user: { _id: user._id, email: user.email },
      token,
    });
  } catch (error) {
    res.status(500).json({ ok: false, error: error.message });
  }
};


export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ error: "User not found" });

    const isMatch = await bcryptjs.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ error: "Invalid password" });

    const token = generateAccessToken(user);
    const refreshToken = generateRefreshToken(user);

    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    res.json({
      message: "Login successful",
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
      },
      token,
    });

    console.log("User logged in:", user);
  } catch (err) {
    console.error("Login error:", err.message);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const forgetPassword = async (req, res) => {
  const { email } = req.body;
  try {
    const emailExist = await User.findOne({ email });
    if (!emailExist) {
      return res
        .status(404)
        .json({ error: "User not found with provided email" });
    }

    const token = jwt.sign({ email }, process.env.JWT_SECRET, {
      expiresIn: "10m",
    });

    const resetLink = `${process.env.Client_Url}/auth/access/${token}`;

    await sendEmail(
      email,
      "Reset Your Password",
      `
        <div style="font-family: Arial, sans-serif; text-align: center; padding: 20px;">
          <h1 style="color: #333;">Reset Your Password</h1>
          <p style="color:#555;">Click the button below to reset your password. This link will expire in 10 minutes.</p>
          <a 
            href="${resetLink}" 
            style="
              display: inline-block;
              padding: 12px 24px;
              font-size: 16px;
              color: white;
              background-color: #f97316; /* orange-500 */
              text-decoration: none;
              border-radius: 6px;
              font-weight: bold;
              margin-top: 20px;
            "
          >
            Reset Password
          </a>
        </div>
      `
    );

    return res.json({
      ok: true,
      message: "Password reset link sent to your email. Please check inbox.",
      token,
    });
  } catch (error) {
    return res.status(500).json({
      ok: false,
      error: "Error: " + error.message,
    });
  }
};

export const AccessAcount = async (req, res) => {
  const { email } = jwt.verify(req.body.token, process.env.JWT_SECRET);
  try {
    const user = await User.findOne({ email });
    if (user) {
      const token = generateAccessToken(user);

      res.cookie("resetToken", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
        maxAge: 15 * 60 * 1000,
      });

      res.status(200).json({
        success: true,
        message: "Change password",
      });
    } else {
      return res.json({
        error: "User not found with provided email",
      });
    }
  } catch (error) {
    return res.status(500).json({
      ok: false,
      message: "Error" + error.message,
    });
  }
};

export const ResetPassword = async (req, res) => {
  try {
    const { newPassword, confirmPassword } = req.body;

    if (newPassword !== confirmPassword) {
      return res.status(400).json({ error: "Passwords do not match" });
    }

    const user = await User.findById(req.user?.id);
    if (!user) {
      return res.status(404).json({ error: "User not found!" });
    }

    const salt = await bcryptjs.genSalt(12);
    const hashedPassword = await bcryptjs.hash(newPassword, salt);

    user.password = hashedPassword;
    await user.save();

    res.status(200).json({ message: "Password updated successfully" });
  } catch (error) {
    return res.status(500).json({
      ok: false,
      message: "Error: " + error.message,
    });
  }
};

export const refreshToken = async (req, res) => {
  try {
    const token = req.cookies.refreshToken;
    if (!token) return res.status(401).json({ error: "No refresh token" });

    const decodedUser = jwt.verify(token, process.env.JWT_REFRESH_SECRET);

    const user = await User.findById(decodedUser.id).select(
      "_id name email role"
    );
    if (!user) return res.status(404).json({ error: "User not found" });

    const newAccessToken = generateAccessToken({
      _id: user._id,
      email: user.email,
      role: user.role,
    });

    return res.json({
      token: newAccessToken,
      user: user,
    });
  } catch (err) {
    console.error("Refresh token error:", err.message);
    return res.status(403).json({ error: "Invalid or expired refresh token" });
  }
};


export const logoutUser = (req, res) => {
  try {
    res.clearCookie("refreshToken", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
    });

    return res.json({ message: "Logged out successfully" });
  } catch (err) {
    console.error("Logout error:", err);
    return res.status(500).json({ error: "Server crash on logout" });
  }
};
