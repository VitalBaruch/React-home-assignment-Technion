import type { ExperimentRunsStore } from "../../experiment/flow";
import { startExperiment, resetAllExperiments } from "../../experiment/flow";
import { useNavigate } from "react-router-dom";


const ActionSection = (props : {experiments : ExperimentRunsStore, setExperiments: React.Dispatch<React.SetStateAction<ExperimentRunsStore>>}) => {
    const { experiments, setExperiments } = props;
    const navigate = useNavigate();
  return (
    <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
      <button
        onClick={() => { startExperiment(); navigate("/experiment1"); }}
        className="rounded-xl bg-gray-900 px-4 py-2 text-sm font-semibold text-white hover:bg-gray-800"
      >
        Start Experiment
      </button>

      {experiments.length > 0 && (
        <button
          onClick={() => { resetAllExperiments(); setExperiments([]); }}
          className="rounded-xl bg-red-600 px-4 py-2 text-sm font-semibold text-white hover:bg-red-700"
        >
          Reset All Experiments
        </button>
      )}
    </div>
    );
}   
export default ActionSection;