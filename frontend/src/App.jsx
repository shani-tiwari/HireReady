import {RouterProvider} from "react-router";
import {router} from "./app.routes.jsx";    // ** .jsx extension
import { AuthProvider } from "./features/auth/auth.context.jsx";



function App() {

  return (
    // every route page will have the access of state from context
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  );

}



export default App