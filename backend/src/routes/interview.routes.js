const express = require("express");
const interviewRouter = express.Router();
const authUser = require("../middleware/auth.middleware");
const {InterviewReportController} = require("../controllers/interview.controller");
const upload = require("../middleware/file.middleware");

/**
 * @description route to generate new interview report basis of job description and resume
 * @method POST
 * @url /api/interview/
 * @body {jobDescription: string, resume: string}
 * @returns {pdfBuffer: Buffer}
 * @access private
 */
interviewRouter.post("/", authUser, upload.single("resume"), InterviewReportController);  


module.exports = interviewRouter;