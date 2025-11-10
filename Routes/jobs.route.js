import express from "express";
import { addJobs, jobDetails } from "../Controller/jobs.controller.js";


const router = express.Router();

router.post('/add-job', addJobs);
router.post('/job-details/:jobID', jobDetails);


export default router;