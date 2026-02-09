

import { Router } from "express";
import * as postService from './posts.service.js'
const router=Router();
import express from "express";




// Create post
router.post("/", async (req, res) => {
  try {
    const post = await postService.createPost(req.body);
    res.status(201).json(post);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Delete post (owner only)
router.delete("/:postId", async (req, res) => {
  try {
    const post = await postService.findById(req.params.postId);
    if (!post) return res.status(404).json({ message: "Post not found" });

    if (post.userId !== req.user.id)
      return res.status(403).json({ message: "Forbidden" });

    await postService.remove(req.params.postId);
    res.json({ message: "Deleted" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Posts with details
router.get("/details", async (req, res) => {
  try {
    res.json(await postService.getDetails());
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Posts with comment count
router.get("/comment-count", async (req, res) => {
  try {
    res.json(await postService.getCommentCount());
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

export default router;





