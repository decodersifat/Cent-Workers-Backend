
import { ObjectId } from 'mongodb';
import { db } from '../config/db.js';


export const addJobs = async (req, res) => {

    const { title, postedBy, category, summary, coverImage, userEmail, uid, createdAt } = req.body;

    try {

        const collection = await db.collection("jobs");
        const cursor = await collection.insertOne(
            {
                title: title,
                postedBy: postedBy,
                category: category,
                summary: summary,
                coverImage: coverImage,
                userEmail: userEmail,
                uid: uid,
                createdAt: createdAt
            }
        )

        res.send({
            message: "Job Added",
            details: cursor
        })

    } catch (error) {
        res.send(error.message)
    }
}


export const jobDetails = async (req, res) => {

    const { jobID } = req.params;

    try {

        const collection = await db.collection('jobs');
        const job = await collection.findOne({
            _id: new ObjectId(jobID)
        });

        if (!job) {
            return res.status(404).send({
                "message": "Job Not Found"
            });
        }

        return res.send({
            "message": "Job Founded",
            "Job": job
        })

    } catch (error) {

    }
};


export const myJobs = async (req, res) => {
    const { email } = req.params;

    try {
        const collection = db.collection('jobs');
        const jobs = await collection.find({ userEmail: email }).toArray();

        if (!jobs || jobs.length === 0) {
            return res.status(404).send({
                success: false,
                message: "No jobs found for this user"
            });
        }

        return res.send({
            success: true,
            message: "Jobs found",
            count: jobs.length,
            data: jobs
        });

    } catch (error) {
        return res.status(500).send({
            success: false,
            message: error.message
        });
    }
};


export const allRecentJobs = async (req, res) => {
    try {
        const jobs = await db.collection('jobs')
            .find()
            .sort({ createdAt: -1 })
            .limit(10)
            .toArray();

        if (!jobs || jobs.length === 0) {
            return res.status(404).send({
                success: false,
                message: "No recent jobs found"
            });
        }
        
        res.status(200).send({
            success: true,
            count: jobs.length,
            jobs: jobs
        });
        
    } catch (error) {
        return res.status(500).send({
            success: false,
            message: error.message
        });
    }
}

export const allJobs = async (req, res) => {
    try {
        const jobs = await db.collection('jobs')
            .find()
            .toArray();

        if (!jobs || jobs.length === 0) {
            return res.status(404).send({
                success: false,
                message: "No jobs found"
            });
        }
        
        res.status(200).send({
            success: true,
            count: jobs.length,
            jobs: jobs
        });
        
    } catch (error) {
        return res.status(500).send({
            success: false,
            message: error.message
        });
    }
}


export const updateJob = async (req, res) => {
    const { jobId } = req.params;
    const { title, postedBy, category, summary, coverImage, userEmail, uid, createdAt } = req.body;
    try {

        const result = await db.collection('jobs').updateOne(
            { _id: new ObjectId(jobId) },
            {
                $set: {
                    title: title,
                    postedBy: postedBy,
                    category: category,
                    summary: summary,
                    coverImage: coverImage,
                    userEmail: userEmail,
                    uid: uid,
                    createdAt: createdAt
                }
            }
        );

        if (result.matchedCount === 0) {
            return res.status(404).send({
                success: false,
                message: "Job not found"
            });
        }

        return res.send({
            success: true,
            message: "Job updated successfully",
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


export const deleteJob = async (req, res) => {
    const { jobId } = req.params;

    try {
        
        const result = await db.collection('jobs').deleteOne({ 
            _id: new ObjectId(jobId) 
        });

        if (result.deletedCount === 0) {
            return res.status(404).send({
                success: false,
                message: "Job not found"
            });
        }

        return res.send({
            success: true,
            message: "Job deleted successfully",
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