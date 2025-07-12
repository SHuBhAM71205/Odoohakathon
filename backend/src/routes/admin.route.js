import express from "express";
import {
  getAllUsers,
  getAllSwaps,
  getAllFeedbacks,
  getStats
} from "../controllers/admin.controller.js";
import { authMiddleware } from "../middlewares/authMiddleware.js";
import { adminMiddleware } from "../middlewares/adminMiddleware.js";

const router = express.Router();

router.get("/users", authMiddleware, adminMiddleware, getAllUsers);
router.get("/swaps", authMiddleware, adminMiddleware, getAllSwaps);
router.get("/feedbacks", authMiddleware, adminMiddleware, getAllFeedbacks);
router.get("/stats", authMiddleware, adminMiddleware, getStats);

export default router;
