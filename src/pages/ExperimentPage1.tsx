import { useNavigate } from "react-router-dom";
import { advanceToPage2, resetExperiment } from "../experiment/flow";

const ExperimentPage1 = () => {
  const navigate = useNavigate();
  return (
  <div>
    <h1>Experiment Page 1</h1>
    <button
     onClick={() => {
      advanceToPage2();
      navigate("/experiment2");
    }}
     className="cursor-pointer rounded bg-green-500 px-4 py-2 font-bold text-white hover:bg-green-700"
    >
      Go to Experiment Page 2
    </button>
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

export default ExperimentPage1;