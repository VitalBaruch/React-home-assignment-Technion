import { useNavigate } from "react-router-dom";
import { resetExperiment } from "../experiment/flow";

const ResetExperimentButton = () => {
    const navigate = useNavigate();
    return (
      <button
        onClick={() => {
          resetExperiment();
          navigate("/");
        }}
        className="cursor-pointer rounded bg-red-500 px-4 py-2 font-bold text-white hover:bg-red-700"
      >
        Reset Experiment
      </button>
    ) 
}

export default ResetExperimentButton;