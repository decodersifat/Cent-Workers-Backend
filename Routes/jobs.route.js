import express from "express";
import { addJobs, jobDetails, myJobs, allRecentJobs, allJobs, updateJob  } from "../Controller/jobs.controller.js";


const router = express.Router();

router.post('/add-job', addJobs);
router.get('/job-details/:jobID', jobDetails);
router.post('/myAddedJobs/:email', myJobs);
router.get('/recent-jobs', allRecentJobs);
router.get('/all-jobs', allJobs);
router.put('/update-job/:jobId', updateJob);



export default router;