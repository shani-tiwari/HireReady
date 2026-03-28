import { createContext, useState } from "react";

// eslint-disable-next-line react-refresh/only-export-components
export const InterviewContext = createContext();

export const InterviewContextProvider = ({ children }) => {

    const [load, setLoad] = useState(false);
    const [report, setReport] = useState(null);  
    const [reports, setReports] = useState([]);  


    return (
        <InterviewContext.Provider value={{ load, report, setLoad, setReport, reports, setReports }}>
            {children}
        </InterviewContext.Provider>
    );

};