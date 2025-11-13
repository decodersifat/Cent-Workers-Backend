import { Router } from "express";
import { fixJobCategories } from "../Controller/migration.controller.js";

const router = Router();

// Migration endpoint - run once to fix existing data
router.get('/fix-job-categories', fixJobCategories);

export default router;
