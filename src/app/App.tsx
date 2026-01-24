import { RouterProvider } from "react-router-dom";
import router from "./router";

const App = () => {
  return (
  <div className="min-h-screen bg-gray-50">
    <div className="mx-auto w-full max-w-5xl p-6">
      <RouterProvider router={router} />
    </div>
  </div>
  );
}

export default App;