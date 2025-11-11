import { db } from '../config/db.js';

export const addCategory = async (req, res) => {

    const { title, uid, image, urlSlug } = req.body;

    try {
         const category = await db.collection('category').insertOne({
            title:title,
            uid:uid,
            image:image,
            urlSlug:urlSlug
         })

         if (!category){
            return res.status(500).send({
                "message":"No Category Created",
            })
         }

         return res.status(200).send({
            "message":"Category Created",
            data:category
         })

    } catch (error) {
        return res.status(500).send({
                "message":error.message
            })
    }
}