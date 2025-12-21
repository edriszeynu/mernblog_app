import Post from "../models/post.model.js";
import { errorHandler } from "../utils/error.js";

export const create = async (req, res, next) => {
  try {
    // ✅ PREVENT CRASH
    if (!req.user || !req.user.isAdmin) {
      return next(errorHandler(403, "You are not allowed to create a post"));
    }

    const { title, content, category } = req.body;

    if (!title || !content) {
      return next(errorHandler(400, "Please provide all fields"));
    }

    const slug = title
      .trim()
      .toLowerCase()
      .replace(/\s+/g, "-")
      .replace(/[^a-z0-9-]/g, "");

    const newPost = new Post({
      title,
      content,
      category,
      slug,
      userId: req.user.id,
    });

    const savedPost = await newPost.save();

    // ✅ RESPONSE ALWAYS SENT
    return res.status(201).json(savedPost);
  } catch (error) {
    next(error);
  }
};
