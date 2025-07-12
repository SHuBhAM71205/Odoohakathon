import express from "express";
import {
  getSkills,
  getAvailabilityOptions,
  searchUsers
} from "../controllers/utils.controller.js";

const router = express.Router();

router.get("/skills", getSkills);
router.get("/availability-options", getAvailabilityOptions);
router.get("/search", searchUsers); 

export default router;
