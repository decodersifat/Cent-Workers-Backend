import express from 'express';

import { addCategory } from '../Controller/category.controller.js';
const router = express.Router();

router.post('/add-category', addCategory);

export default router;