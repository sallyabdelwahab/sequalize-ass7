import Comment from "../../DB/Models/comments.js";
import User from "../../DB/Models/user.js";
import Post from "../../DB/Models/posts.js";
import { Op } from "sequelize";

export const commentService = {
  // Bulk create comments
  createBulk: async (data) => {
    try {
      const result = await Comment.bulkCreate(data);
      return { message: "Comments created", comments: result };
    } catch (err) {
      throw new Error(err.message);
    }
  },

  // Update comment by ID (owner check)
  updateById: async (commentId, userId, content) => {
    try {
      const comment = await Comment.findByPk(commentId);
      if (!comment) throw new Error("Comment not found");
      if (comment.userId !== userId) throw new Error("Not authorized");

      comment.content = content;
      await comment.save();
      return { message: "Comment updated", comment };
    } catch (err) {
      throw new Error(err.message);
    }
  },

  // Find or create
  findOrCreate: async (postId, userId, content) => {
    try {
      const [comment, created] = await Comment.findOrCreate({
        where: { postId, userId, content },
        defaults: { postId, userId, content }
      });
      return { comment, created };
    } catch (err) {
      throw new Error(err.message);
    }
  },

  // Search comments by word
  searchByWord: async (word) => {
    try {
      const { rows, count } = await Comment.findAndCountAll({
        where: { content: { [Op.like]: `%${word}%` } }
      });
      return { count, rows };
    } catch (err) {
      throw new Error(err.message);
    }
  },

  // 3 newest comments for a post
  newestByPost: async (postId) => {
    try {
      const comments = await Comment.findAll({
        where: { postId },
        order: [["createdAt", "DESC"]],
        limit: 3
      });
      return comments;
    } catch (err) {
      throw new Error(err.message);
    }
  },

  // Comment details with User & Post
  details: async (id) => {
    try {
      const comment = await Comment.findByPk(id, {
        include: [
          { model: User, attributes: ["id", "name"] },
          { model: Post, attributes: ["id", "title"] }
        ]
      });
      if (!comment) throw new Error("Comment not found");
      return comment;
    } catch (err) {
      throw new Error(err.message);
    }
  }
};
