import axios from "axios";

const api = axios.create({
    baseURL: "http://localhost:3000/api",
    withCredentials: true,
});


/**
 * @description generate interview report based on user self description, resume and job description.
 */
export const generateInterviewReport = async ({ jobDescription, selfDescription, resumeFile }) => {

    // create form data to send file to backend
    const formData = new FormData();

    formData.append("jobDescription", jobDescription)
    formData.append("selfDescription", selfDescription)
    formData.append("resume", resumeFile)

    const response = await api.post("/interview/", 
        formData, 
        {
            headers: {
                "Content-Type": "multipart/form-data"
            }
        }
    );
    console.log("api response - ", response.data);
    return response.data;

};


/**
 * @description get interview report by interviewId.
 */
export const getInterviewReportById = async (interviewId) => {
    const response = await api.get(`/interview/report/${interviewId}`)

    return response.data;
};


/**
 * @description Service to get all interview reports of logged in user.
 */
export const getAllInterviewReports = async () => {
    const response = await api.get("/interview/")

    return response.data;
};


/**
 * @description Service to generate resume pdf based on user self description, resume content and job description.
 */
export const generateResumePdf = async ({ interviewReportId }) => {
    const response = await api.post(`/interview/resume/pdf/${interviewReportId}`, null, {
        responseType: "blob"
    })

    return response.data;
};