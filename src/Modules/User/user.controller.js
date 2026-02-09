import { Router } from "express";
const router=Router();

export default router;


import express from "express";
import {
  createUser,
  upsertUser,
  findUserByEmail,
  findUserByIdExcludingRole
} from "./user.service.js";



// 1️ POST /users/signup
router.post("/signup", async (req, res) => {
  try {
    const user = await createUser(req.body);
    res.status(201).json({ message: "User created", user });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// 2️ PUT /users/:id
router.put("/:id", async (req, res) => {
  try {
    const user = await upsertUser(req.params.id, req.body);
    res.json({ message: "User created/updated", user });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// 3️ GET /users/by-email
router.get("/by-email", async (req, res) => {
  try {
    const user = await findUserByEmail(req.query.email);
    if (!user) return res.status(404).json({ message: "User not found" });
    res.json({ user });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// 4️ GET /users/:id
router.get("/:id", async (req, res) => {
  try {
    const user = await findUserByIdExcludingRole(req.params.id);
    if (!user) return res.status(404).json({ message: "User not found" });
    res.json({ user });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});


