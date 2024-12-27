import express from "express";
import { updateUserController } from "../controller/userController.js";
import userAuth from "../middelware/authMiddleware.js";

//router object
const router = express.Router();

//routes
// GET USERS || GET

// UPDATE USER || PUT
router.put("/update-user", userAuth, updateUserController);

export default router;