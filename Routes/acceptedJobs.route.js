import express from "express";
import { acceptJob, getMyAcceptedJobs, removeAcceptedJob, checkIfJobAccepted } from "../Controller/acceptedJobs.controller.js";

const router = express.Router();

router.post('/accept-job', acceptJob);
router.get('/my-accepted-jobs/:email', getMyAcceptedJobs);
router.delete('/remove-accepted-job/:id', removeAcceptedJob);
router.get('/check-accepted/:jobId/:email', checkIfJobAccepted);

export default router;
