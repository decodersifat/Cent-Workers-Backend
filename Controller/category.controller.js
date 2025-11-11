import { db } from '../config/db.js';
import { ObjectId } from 'mongodb';

export const addCategory = async (req, res) => {

    const { title, uid, image, urlSlug } = req.body;

    try {
         const category = await db.collection('category').insertOne({
            title: title,
            uid: uid,
            image: image,
            urlSlug: urlSlug,
            createdAt: new Date().toISOString()
         })

         return res.status(201).send({
            success: true,
            message: "Category Created",
            data: category
         })

    } catch (error) {
        return res.status(500).send({
            success: false,
            message: error.message
        })
    }
}

export const getAllCategories = async (req, res) => {
    try {
        const categories = await db.collection('category').find().toArray();

        if (!categories || categories.length === 0) {
            return res.status(404).send({
                success: false,
                message: "No categories found"
            });
        }

        return res.status(200).send({
            success: true,
            message: "Categories fetched successfully",
            count: categories.length,
            data: categories
        });

    } catch (error) {
        return res.status(500).send({
            success: false,
            message: error.message
        });
    }
}

export const getCategoryById = async (req, res) => {
    const { categoryId } = req.params;

    try {
        const category = await db.collection('category').findOne({
            _id: new ObjectId(categoryId)
        });

        if (!category) {
            return res.status(404).send({
                success: false,
                message: "Category not found"
            });
        }

        return res.status(200).send({
            success: true,
            message: "Category fetched successfully",
            data: category
        });

    } catch (error) {
        return res.status(500).send({
            success: false,
            message: error.message
        });
    }
}

export const getCategoriesByUser = async (req, res) => {
    const { uid } = req.params;

    try {
        const categories = await db.collection('category').find({ uid: uid }).toArray();

        if (!categories || categories.length === 0) {
            return res.status(404).send({
                success: false,
                message: "No categories found for this user"
            });
        }

        return res.status(200).send({
            success: true,
            message: "Categories fetched successfully",
            count: categories.length,
            data: categories
        });

    } catch (error) {
        return res.status(500).send({
            success: false,
            message: error.message
        });
    }
}

export const updateCategory = async (req, res) => {
    const { categoryId } = req.params;
    const { title, image, urlSlug } = req.body;

    try {
        const result = await db.collection('category').updateOne(
            { _id: new ObjectId(categoryId) },
            {
                $set: {
                    title: title,
                    image: image,
                    urlSlug: urlSlug,
                    updatedAt: new Date()
                }
            }
        );

        if (result.matchedCount === 0) {
            return res.status(404).send({
                success: false,
                message: "Category not found"
            });
        }

        return res.status(200).send({
            success: true,
            message: "Category updated successfully",
            data: {
                modifiedCount: result.modifiedCount,
                matchedCount: result.matchedCount
            }
        });

    } catch (error) {
        return res.status(500).send({
            success: false,
            message: error.message
        });
    }
}

export const deleteCategory = async (req, res) => {
    const { categoryId } = req.params;

    try {
        const result = await db.collection('category').deleteOne({
            _id: new ObjectId(categoryId)
        });

        if (result.deletedCount === 0) {
            return res.status(404).send({
                success: false,
                message: "Category not found"
            });
        }

        return res.status(200).send({
            success: true,
            message: "Category deleted successfully",
            data: {
                deletedCount: result.deletedCount
            }
        });

    } catch (error) {
        return res.status(500).send({
            success: false,
            message: error.message
        });
    }
}