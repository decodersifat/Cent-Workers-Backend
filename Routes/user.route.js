import { Router } from "express";
import { getUserProfile, updateUserProfile } from "../Controller/user.controller.js";

const router = Router();

router.get('/profile/:uid', getUserProfile);
router.put('/profile/:uid', updateUserProfile);

export default router;
