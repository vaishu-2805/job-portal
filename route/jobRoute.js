import express from "express";
import {
  createJobController,
  getAllJobsController,
  // jobStatsController,
  // updateJobController,
} from "../controller/jobController.js";
import userAuth from "../middelware/authMiddleware.js";

const router = express.Router();

//routes
// CREATE JOB || POST
router.post("/create-job", userAuth, createJobController);

//GET JOBS || GET
router.get("/get-job", userAuth, getAllJobsController);

//UPDATE JOBS ||  PATCH
// router.patch("/update-job/:id", userAuth, updateJobController);

//DELETE JOBS || DELETE
// router.delete("/delete-job/:id", userAuth, deleteJobController);

// JOBS STATS FILTER || GET
// router.get("/job-stats", userAuth, jobStatsController);

export default router;