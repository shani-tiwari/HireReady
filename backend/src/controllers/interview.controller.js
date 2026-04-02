const pdfParse = require("pdf-parse");
const {generateInterviewReport} = require("../services/ai.service");
const interviewReportModel = require("../models/interviewReport.model");

/**
 * @description controller to generate new interview report basis of job description and resume
 * @method POST
 * @url /api/interview/
 * @body {jobDescription: string, resume: string}
 * @returns {pdfBuffer: Buffer}
 * @access private
 */
const InterviewReportController = async (req, res) => {

    try {
        const { selfDescription, jobDescription } = req.body;

        if ( !jobDescription || (!selfDescription && !req.file) ) {
            return res.status(400).json({ message: "All fields are required (Description and Resume)..." });
        };

        let resumeContent;
        if (req.file){
            resumeContent = await (new pdfParse.PDFParse(Uint8Array.from(req.file.buffer))).getText();
        };

        const prompt = `Generate an interview report for a candidate with the following details:
                    Resume: ${resumeContent}
                    Self Description: ${selfDescription}
                    Job Description: ${jobDescription}
                    
                    IMPORTANT: The response MUST be a JSON object with the exact fields specified in the schema. 
                    The "title" field MUST be a string representing the job title.`;

        const interviewReportAI = await generateInterviewReport({
            resume: resumeContent || "No resume text extracted",
            selfDescription, 
            jobDescription
        });

        const interviewReport = await interviewReportModel.create({
            jobDescription,
            selfDescription,
            user: req.user._id,
            resume: resumeContent?.text || "No resume text extracted",
            title: interviewReportAI?.title || "Interview Strategy",
            ...interviewReportAI
        }); 

        return res.status(201).json({message: "Interview report generated successfully...", interviewReport});


    } catch (error) {

        console.log(error);
        return res.status(500).json({message: "Internal server error..."});

    };

};


/**
 * @description controller to get interview report by interviewId
 * @method GET
 * @url /api/interview/report/:interviewId
 * @access private
 */
const getInterviewReportById = async (req, res) => {
    try {
        const { interviewId } = req.params;
        const interviewReport = await interviewReportModel.findById(interviewId);
        return res.status(200).json({ interviewReport });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Internal server error..." });
    };
};


/**
 * @description controller to get all interview reports of logged in user
 * @method GET
 * @url /api/interview/
 * @access private
 */
const getAllInterviewReports = async (req, res) => {
    try {
        const interviewReports = await interviewReportModel.find({ user: req.user._id })
        .sort({ createdAt: -1 })
        .select("-resume -selfDescription -jobDescription -__v -technicalQuestions -behavioralQuestions -skillGaps -preparationPlan"); 

        return res.status(200).json({ interviewReports });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Internal server error..." });
    };
};


/**
 * @description controller to generate resume pdf based on user self description, resume content and job description.
 * @method POST
 * @url /api/interview/resume/pdf/:interviewReportId
 * @access private
 */
const generateResumePdf = async (req, res) => {
    try {
        const { interviewReportId } = req.params;
        const interviewReport = await interviewReportModel.findById(interviewReportId);
        if(!interviewReport) {
            return res.status(404).json({message: "Interview report not found..."});
        };
        const pdfBuffer = await generateResumePdf({
            resume: interviewReport.resume,
            selfDescription: interviewReport.selfDescription,
            jobDescription: interviewReport.jobDescription
        });
        res.set({
            "Content-Type": "application/pdf",
            "Content-Disposition": `attachment; filename=resume_${interviewReportId}.pdf`
        });
        return res.status(200).send(pdfBuffer);
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Internal server error..." });
    };
};


module.exports = { 
    InterviewReportController,
    getInterviewReportById,
    getAllInterviewReports,
    generateResumePdf
};