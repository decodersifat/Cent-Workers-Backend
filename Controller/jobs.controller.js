
import { ObjectId } from 'mongodb';
import { db } from '../config/db.js';


export const addJobs = async ( req , res ) => {

    const { title, postedBy, category, summary, coverImage, userEmail , uid, createdAt } = req.body;

    try {
        
        const collection = await db.collection("jobs");
        const cursor = await collection.insertOne(
            {
                title:title,
                postedBy:postedBy,
                category:category,
                summary:summary,
                coverImage:coverImage,
                userEmail:userEmail,
                uid:uid,
                createdAt:createdAt
            }
        )

        res.send({
            message:"Job Added",
            details: cursor
        })

    } catch (error) {
        res.send(error.message)
    }
}


export const jobDetails = async (req, res) => {

    const  { jobID } = req.params;

    try {

        const collection = await db.collection('jobs');
        const job = await collection.findOne({
            _id : new ObjectId(jobID)
        });

        if(!job){
            return res.status(404).send({
                "message": "Job Not Found"
            });
        }

        return res.send({
            "message":"Job Founded",
            "Job":job
        })
        
    } catch (error) {
        
    }
}