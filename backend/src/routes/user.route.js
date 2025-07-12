import express from "express";
import {
  getMyProfile,
  updateMyProfile,
  togglePrivacy,
  updateAvailability,
  updateSkills,
  getPublicUsers,
  getUserById,
} from "../controllers/user.controller.js";
import { authMiddleware } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.get("/me", authMiddleware, getMyProfile);
router.put("/me", authMiddleware, updateMyProfile);
router.patch("/me/privacy", authMiddleware, togglePrivacy);
router.patch("/me/availability", authMiddleware, updateAvailability);
router.patch("/me/skills", authMiddleware, updateSkills);

router.get("/", getPublicUsers);
router.get("/:id", getUserById);

export default router;
