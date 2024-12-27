import express from "express";
// import userAuth from "../middelware/authMiddleware
import { testPostController } from "../controller/testController.js";
import userAuth from "../middelware/authMiddleware.js"

//router object
const router = express.Router();

//routes
router.post("/test-post", userAuth, testPostController);

//export
export default router;