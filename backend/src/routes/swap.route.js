import express from "express";
import {
  requestSwap,
  acceptSwap,
  rejectSwap,
  deleteSwap,
  getMySwaps
} from "../controllers/swap.controller.js";
import { authMiddleware } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.post("/", authMiddleware, requestSwap);
router.get("/", authMiddleware, getMySwaps);
router.put("/:id/accept", authMiddleware, acceptSwap);
router.put("/:id/reject", authMiddleware, rejectSwap);
router.delete("/:id", authMiddleware, deleteSwap);

export default router;
