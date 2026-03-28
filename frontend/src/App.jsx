import {RouterProvider} from "react-router";
import {router} from "./app.routes.jsx";    // ** .jsx extension
import { AuthProvider } from "./features/auth/auth.context.jsx";
import { InterviewContextProvider } from "./features/interview/interview.context.jsx";



function App() {

  return (
    // every route page will have the access of state from context
    <AuthProvider>
      <InterviewContextProvider>
        <RouterProvider router={router} />
      </InterviewContextProvider>
    </AuthProvider>
  );

}



export default App