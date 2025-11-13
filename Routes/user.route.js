import { Router } from "express";
import { getUserProfile, updateUserProfile } from "../Controller/user.controller.js";

const router = Router();

router.get('/profile/:email', getUserProfile);
router.put('/profile/:email', updateUserProfile);

export default router;
