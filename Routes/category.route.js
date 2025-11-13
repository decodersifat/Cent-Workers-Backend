import express from 'express';

import { addCategory, getAllCategories, getCategoryById, getCategoriesByUser, updateCategory, deleteCategory } from '../Controller/category.controller.js';
const router = express.Router();


router.post('/add-category', addCategory);


router.get('/all-categories', getAllCategories);
router.get('/category/:categoryId', getCategoryById);
router.get('/user-categories/:email', getCategoriesByUser);


router.put('/update-category/:categoryId', updateCategory);


router.delete('/delete-category/:categoryId', deleteCategory);

export default router;