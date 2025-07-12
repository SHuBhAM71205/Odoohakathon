import express from "express";
import {
  leaveFeedback,
  getUserFeedback
} from "../controllers/feedback.controller.js";
import { authMiddleware } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.post("/", authMiddleware, leaveFeedback);
router.get("/:userId", authMiddleware, getUserFeedback);

export default router;
