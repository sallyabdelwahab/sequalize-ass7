import { Router } from "express";
const router=Router();


import express from "express";
import { commentService } from "./comments.service.js";



// 1. Bulk create
router.post("/", async (req, res) => {
  try {
    const result = await commentService.createBulk(req.body);
    res.json(result);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// 2. Update comment by ID
router.patch("/:commentId", async (req, res) => {
  try {
    const { commentId } = req.params;
    const { userId, content } = req.body;
    const result = await commentService.updateById(commentId, userId, content);
    res.json(result);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// 3. Find or create
router.post("/find-or-create", async (req, res) => {
  try {
    const { postId, userId, content } = req.body;
    const result = await commentService.findOrCreate(postId, userId, content);
    res.json(result);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// 4. Search by word
router.get("/search", async (req, res) => {
  try {
    const { word } = req.query;
    const result = await commentService.searchByWord(word);
    res.json(result);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// 5. 3 newest comments
router.get("/newest/:postId", async (req, res) => {
  try {
    const { postId } = req.params;
    const result = await commentService.newestByPost(postId);
    res.json(result);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// 6. Comment details with User & Post
router.get("/details/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const result = await commentService.details(id);
    res.json(result);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});
















export default router;