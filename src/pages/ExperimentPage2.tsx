import { resetExperiment } from "../experiment/flow";
import { useNavigate } from "react-router-dom";

const ExperimentPage2 = () => {
  const navigate = useNavigate();
  return (
  <div>
    <h1>Experiment Page 2</h1>
    <button
         onClick={() => {
          resetExperiment();
          navigate("/");
        }}
         className="ml-4 cursor-pointer rounded bg-red-500 px-4 py-2 font-bold text-white hover:bg-red-700"
        >
          Reset Experiment
        </button>
  </div>)
}
export default ExperimentPage2;