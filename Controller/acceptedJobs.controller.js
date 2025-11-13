import { ObjectId } from 'mongodb';
import { db } from '../config/db.js';

export const acceptJob = async (req, res) => {
    const { jobId, acceptedBy, acceptedByEmail, jobTitle, postedBy, category, summary, coverImage, postedByEmail } = req.body;

    try {
        const collection = db.collection("acceptedJobs");
        const result = await collection.insertOne({
            jobId: jobId,
            jobTitle: jobTitle,
            postedBy: postedBy,
            postedByEmail: postedByEmail,
            category: category,
            summary: summary,
            coverImage: coverImage,
            acceptedBy: acceptedBy,
            acceptedByEmail: acceptedByEmail,
            acceptedAt: new Date().toISOString()
        });

        res.status(201).send({
            success: true,
            message: "Job accepted successfully",
            data: result
        });

    } catch (error) {
        res.status(500).send({
            success: false,
            message: error.message
        });
    }
};

export const getMyAcceptedJobs = async (req, res) => {
    const { email } = req.params;

    try {
        const collection = db.collection('acceptedJobs');
        const acceptedJobs = await collection.find({ acceptedByEmail: email }).toArray();

        if (!acceptedJobs || acceptedJobs.length === 0) {
            return res.status(404).send({
                success: false,
                message: "No accepted jobs found"
            });
        }

        return res.status(200).send({
            success: true,
            message: "Accepted jobs found",
            count: acceptedJobs.length,
            data: acceptedJobs
        });

    } catch (error) {
        return res.status(500).send({
            success: false,
            message: error.message
        });
    }
};

export const removeAcceptedJob = async (req, res) => {
    const { id } = req.params;

    try {
        const collection = db.collection('acceptedJobs');
        const result = await collection.deleteOne({ _id: new ObjectId(id) });

        if (result.deletedCount === 0) {
            return res.status(404).send({
                success: false,
                message: "Accepted job not found"
            });
        }

        return res.status(200).send({
            success: true,
            message: "Accepted job removed successfully",
            data: { deletedCount: result.deletedCount }
        });

    } catch (error) {
        return res.status(500).send({
            success: false,
            message: error.message
        });
    }
};

export const checkIfJobAccepted = async (req, res) => {
    const { jobId, email } = req.params;

    try {
        const collection = db.collection('acceptedJobs');
        const accepted = await collection.findOne({ 
            jobId: jobId, 
            acceptedByEmail: email 
        });

        return res.status(200).send({
            success: true,
            isAccepted: !!accepted
        });

    } catch (error) {
        return res.status(500).send({
            success: false,
            message: error.message
        });
    }
};
