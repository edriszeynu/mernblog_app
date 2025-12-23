import bcryptjs from "bcryptjs";
import User from "../models/user.model.js";
import { errorHandler } from "../utils/error.js";

// UPDATE USER
export const updateUser = async (req, res, next) => {
  if (req.user._id.toString() !== req.params.userId) {
    return next(errorHandler(403, "Not allowed"));
  }

  try {
    if (req.body.password) {
      if (req.body.password.length < 6) {
        return next(
          errorHandler(400, "Password must be at least 6 characters")
        );
      }
      req.body.password = bcryptjs.hashSync(req.body.password, 10);
    }

    const updatedUser = await User.findByIdAndUpdate(
      req.params.userId,
      {
        $set: {
          username: req.body.username,
          email: req.body.email,
          profilePicture: req.body.profilePicture,
          ...(req.body.password && { password: req.body.password }),
        },
      },
      { new: true }
    );

    const { password, ...rest } = updatedUser._doc;
    res.status(200).json(rest);
  } catch (error) {
    next(error);
  }
};

// DELETE USER (ADMIN OR SELF)
export const deleteUser = async (req, res, next) => {
  if (
    !req.user.isAdmin &&
    req.user._id.toString() !== req.params.userId
  ) {
    return next(errorHandler(403, "Not allowed"));
  }

  try {
    await User.findByIdAndDelete(req.params.userId);
    res.status(200).json({ message: "User deleted successfully" });
  } catch (error) {
    next(error);
  }
};

// SIGN OUT
export const signout = (req, res) => {
  res.clearCookie("access_token").status(200).json("Signed out");
};

// GET USERS (ADMIN ONLY)
export const getusers = async (req, res, next) => {
  if (!req.user.isAdmin) {
    return next(errorHandler(403, "Admin only"));
  }

  try {
    const startIndex = parseInt(req.query.startIndex) || 0;
    const limit = parseInt(req.query.limit) || 9;

    const users = await User.find()
      .sort({ createdAt: -1 })
      .skip(startIndex)
      .limit(limit);

    const usersWithoutPassword = users.map((user) => {
      const { password, ...rest } = user._doc;
      return rest;
    });

    res.status(200).json({
      users: usersWithoutPassword,
    });
  } catch (error) {
    next(error);
  }
};


export const getUser=async(req,res,next)=>{
  try{
    const user=await User.findById(req.params.userId)
    if(!user){
      return next(errorHandler(404,'user not found'))
    }
    const {password,...prest}=user._doc;
    res.status(200).json(rest)
  }
  catch(error){
    next(error)
  }
}


