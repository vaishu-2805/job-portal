import jobsModel from "../model/jobModel.js";
import mongoose from "mongoose";
import moment from "moment";

export const createJobController = async (req, res, next) => {
  const { company, position } = req.body;
  if (!company || !position) {
    next("Please provide all fields");
  }
  req.body.createdBy = req.user.userId;
  const job = await jobsModel.create(req.body);
  res.status(201).json({ job });
};



export const getAllJobsController = async (req, res, next) => {
  const { status, workType, search, sort } = req.query;
  const queryObject = { createdBy: req.user.userId };

  if (status && status !== "all") queryObject.status = status;
  if (workType && workType !== "all") queryObject.workType = workType;
  if (search) queryObject.position = { $regex: search, $options: "i" };

  let queryResult = jobsModel.find(queryObject);
  if (sort) {
    const sortOption = {
      latest: "-createdAt",
      oldest: "createdAt",
      "a-z": "position",
      "z-a": "-position",
    };
    queryResult = queryResult.sort(sortOption[sort]);
  }

  const page = Number(req.query.page) || 1;
  const limit = Number(req.query.limit) || 10;
  const skip = (page - 1) * limit;

  queryResult = queryResult.skip(skip).limit(limit);
  const totalJobs = await jobsModel.countDocuments(queryObject);
  const numOfPages = Math.ceil(totalJobs / limit);
  const jobs = await queryResult;

  res.status(200).json({ totalJobs, jobs, numOfPages });
};

// Other job-related controllers...
