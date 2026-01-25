import type { ExperimentRunsStore } from "../../experiment/flow";
import { deleteExperimentRun, setFlowState, FLOW } from "../../experiment/flow";
import { useNavigate } from "react-router-dom";

const ExperimentCard = (props : {experiments : ExperimentRunsStore, setExperiments: React.Dispatch<React.SetStateAction<ExperimentRunsStore>>}) => {
    const { experiments, setExperiments } = props;
    const navigate = useNavigate();
  return (
    <ul className="mt-2 space-y-3">
        {experiments.map((run, index) => (
        <li key={run.id} className="rounded-xl border border-gray-200 bg-white p-4 hover:bg-gray-50 w-full">
            <div className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
            <div className="text-sm text-gray-700">
                <div><span className="font-semibold">Run number:</span> {index + 1}</div>
                <div><span className="font-semibold">Started (UTC):</span> {run.startedAtUTC}</div>
                <div><span className="font-semibold">Completed (UTC):</span> {run.completedAtUTC}</div>
            </div>

            <div className="flex gap-2">
                <button
                className="rounded-xl bg-gray-900 px-4 py-2 text-sm font-semibold text-white hover:bg-gray-800"
                onClick={() => {
                    setFlowState(FLOW.PAGE2);
                    navigate(`/experiment2/${run.id}`);
                }}
                >
                View results
                </button>
                <button
                onClick={() => {
                    const updatedRuns = deleteExperimentRun(run.id);
                    if (updatedRuns !== undefined) {
                    setExperiments(updatedRuns);
                    }
                }}
                className="rounded-xl border border-red-300 px-4 py-2 text-sm font-semibold text-red-700 hover:bg-red-50"
                >
                Delete
            </button>
            </div>

            </div>
        </li>
        ))}
    </ul>
    );
}
export default ExperimentCard;