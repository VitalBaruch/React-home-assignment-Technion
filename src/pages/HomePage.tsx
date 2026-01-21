import { useNavigate } from "react-router-dom";
import { startExperiment } from "../experiment/flow";

const HomePage = () => {
  const navigate = useNavigate();
  return (<div>
    <h1>Home Page</h1>
    <button
     onClick={() => {
      startExperiment();
      navigate("/experiment1");
    }}
     className="cursor-pointer rounded bg-blue-500 px-4 py-2 font-bold text-white hover:bg-blue-700"
    >
      Start
    </button>
  </div>);
}
export default HomePage;    