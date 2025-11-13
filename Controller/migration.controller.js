import { db } from '../config/db.js';
import { ObjectId } from 'mongodb';

export const fixJobCategories = async (req, res) => {
    try {
        const jobsCollection = db.collection('jobs');
        const categoryCollection = db.collection('category');

        // Get all jobs
        const jobs = await jobsCollection.find({}).toArray();
        
        let updatedCount = 0;
        let skippedCount = 0;
        let errorCount = 0;

        for (const job of jobs) {
            // Check if category looks like an ObjectId (24 character hex string)
            if (job.category && job.category.length === 24 && /^[a-f0-9]{24}$/i.test(job.category)) {
                try {
                    // Try to find the category by ID
                    const category = await categoryCollection.findOne({ _id: new ObjectId(job.category) });
                    
                    if (category) {
                        // Update job with category title
                        await jobsCollection.updateOne(
                            { _id: job._id },
                            { $set: { category: category.title } }
                        );
                        updatedCount++;
                        console.log(`Updated job ${job._id}: ${job.category} -> ${category.title}`);
                    } else {
                        // Category not found, skip
                        skippedCount++;
                        console.log(`Category not found for job ${job._id}, category ID: ${job.category}`);
                    }
                } catch (err) {
                    errorCount++;
                    console.error(`Error processing job ${job._id}:`, err);
                }
            } else {
                // Category is already a string title, skip
                skippedCount++;
            }
        }

        return res.status(200).send({
            success: true,
            message: "Migration completed",
            data: {
                totalJobs: jobs.length,
                updated: updatedCount,
                skipped: skippedCount,
                errors: errorCount
            }
        });

    } catch (error) {
        return res.status(500).send({
            success: false,
            message: error.message
        });
    }
};
