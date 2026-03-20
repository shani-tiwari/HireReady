import {RouterProvider} from "react-router";
import {router} from "./app.routes.jsx"; // ** .jsx extension



function App() {
  return (
    <RouterProvider router={router} />
  )
}



export default App