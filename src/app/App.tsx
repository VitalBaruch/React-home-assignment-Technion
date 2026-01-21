import { RouterProvider } from "react-router-dom";
import router from "./router";

const App = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <RouterProvider router={router}/>
    </div>
  )
}

export default App;