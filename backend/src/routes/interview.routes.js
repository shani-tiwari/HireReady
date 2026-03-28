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


/**
 * @description route to get interview report by interviewId
 * @method GET
 * @url /api/interview/report/:interviewId
 * @access private
 */
interviewRouter.get("/report/:interviewId", authUser, getInterviewReportById);


/**
 * @description route to get all interview reports of logged in user
 * @method GET
 * @url /api/interview/
 * @access private
 */
interviewRouter.get("/", authUser, getAllInterviewReports); 


/**
 * @description route to generate resume pdf based on user self description, resume content and job description.
 * @method POST
 * @url /api/interview/resume/pdf/:interviewReportId
 * @access private
 */
interviewRouter.post("/resume/pdf/:interviewReportId", authUser, generateResumePdf);


module.exports = interviewRouter;