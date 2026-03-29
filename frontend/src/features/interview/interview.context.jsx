import { createContext, useState } from "react";

// eslint-disable-next-line react-refresh/only-export-components
export const InterviewContext = createContext();

export const InterviewContextProvider = ({ children }) => {

    const [loading, setLoading] = useState(false);
    const [report, setReport] = useState(null);  
    const [reports, setReports] = useState([]);  


    return (
        <InterviewContext.Provider value={{ loading, report, setLoading, setReport, reports, setReports }}>
            {children}
        </InterviewContext.Provider>
    );

};