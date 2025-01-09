import User from "../models/User.model.js"
import { createError } from "../utils/error.js";
import jwt from "jsonwebtoken"; 
import bcrypt from "bcryptjs";

export const register = async (req, res, next) => {
    try {
        const salt = bcrypt.genSaltSync(10);
        const hash = bcrypt.hashSync(req.body.password, salt);

        const newUser = new User({
            ...req.body,
            password: hash,
        });

        await newUser.save();
        res.status(200).send("User has been created.");
    } catch (error) {
        next(error);
    }
}

export const login = async (req,res,next) => {
    try {
        const user = await User.findOne({ email: req.body.email });
    if (!user) return next(createError(404, "User not found!"));

    const isPasswordCorrect = await bcrypt.compare(
      req.body.password,
      user.password
    );

    if (!isPasswordCorrect)
      return next(createError(400, "Invalid username or password!"));

    const token = jwt.sign({ id: user._id, Role: user.role }, process.env.JWT);

    const { password, role, ...otherDetails } = user._doc;

    res
      .status(200)
      .json({ details: { ...otherDetails }, role, token });
    } catch (error) {
        next(error);
    }
}

export const logout = async (req,res) => {
    res
    .clearCookie("Authorization", {
      sameSite: "none",
      secure: true,
    })
    .status(200)
    .send("Logout Successfully");
}