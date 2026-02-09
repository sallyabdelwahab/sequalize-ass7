
import Post from "../../DB/Models/posts.js";
import User from "../../DB/Models/user.js";
import Comment from "../../DB/Models/comments.js";
import { Sequelize } from "sequelize";

// Create Post
export const createPost = async (data) => {
  const post = new Post(data);
  return await post.save();
};

// Get post by id
export const getPostById = async (postId) => {
  return await Post.findByPk(postId);
};

// Delete post
export const deletePost = async (postId) => {
  const post = await Post.findByPk(postId);
  if (!post) {
    throw new Error("Post not found");
  }
  return await post.destroy();
};

// Get posts with user & comments
export const getPostsWithDetails = async () => {
  return await Post.findAll({
    attributes: ["id", "title"],
    include: [
      {
        model: User,
        attributes: ["id", "name"]
      },
      {
        model: Comment,
        attributes: ["id", "content"]
      }
    ]
  });
};

// Get posts with comment count
export const getPostsWithCommentCount = async () => {
  return await Post.findAll({
    attributes: [
      "id",
      "title",
      [Sequelize.fn("COUNT", Sequelize.col("Comments.id")), "commentCount"]
    ],
    include: [
      {
        model: Comment,
        attributes: []
      }
    ],
    group: ["Post.id"]
  });
};


