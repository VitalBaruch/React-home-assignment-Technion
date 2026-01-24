import { useNavigate } from "react-router-dom";
import { FLOW, getCurrentState, getExperimentRuns, resetAllExperiments, setFlowState, startExperiment, type ExperimentRunsStore } from "../experiment/flow";
import { useEffect, useState } from "react";

const HomePage = () => {
  const [experiments, setExperiments] = useState<ExperimentRunsStore>([]);
  const [loading, setLoading] = useState(true);
  const [banner, setBanner] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const runs = getExperimentRuns();
    setExperiments(runs);
    setLoading(false);

    const flow = getCurrentState();
    if (flow === FLOW.PAGE1) {
      setBanner("You left the experiment before Submit — this run was not saved.");
    }
    setFlowState(FLOW.NONE);

    const timeoutId = setTimeout(() => {
      setBanner(null);
    }, 4000);
    return () => clearTimeout(timeoutId);
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }
  
  return (<div className="flex flex-col gap-6">

    {banner && <div className="rounded-xl border border-yellow-200 bg-yellow-50 p-3 text-sm text-yellow-900">
      {banner}
    </div>}

    <h1 className="text-2xl font-semibold text-gray-900">Experiment Dashboard</h1>
    <p className="text-sm text-gray-600">Runs are saved locally in this browser (UTC timestamps).</p>

    <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
      <h2 className="text-lg font-semibold text-gray-900">How this experiment works</h2>
      <p className="mt-2 text-sm text-gray-600">
        The experiment runs entirely in your browser. Completed runs are stored locally on this device.
      </p>

      <ol className="mt-4 space-y-2 text-sm text-gray-700">
        <li className="flex gap-3">
          <span className="mt-0.5 inline-flex h-6 w-6 items-center justify-center rounded-full bg-gray-900 text-xs font-semibold text-white">1</span>
          <span>Click <span className="font-semibold">Start Experiment</span> to begin Page 1.</span>
        </li>
        <li className="flex gap-3">
          <span className="mt-0.5 inline-flex h-6 w-6 items-center justify-center rounded-full bg-gray-900 text-xs font-semibold text-white">2</span>
          <span>Page 1 records the <span className="font-semibold">first click time (UTC)</span> and every button click.</span>
        </li>
        <li className="flex gap-3">
          <span className="mt-0.5 inline-flex h-6 w-6 items-center justify-center rounded-full bg-gray-900 text-xs font-semibold text-white">3</span>
          <span><span className="font-semibold">Submit</span> advances to Page 2 to review the results table.</span>
        </li>
        <li className="flex gap-3">
          <span className="mt-0.5 inline-flex h-6 w-6 items-center justify-center rounded-full bg-gray-900 text-xs font-semibold text-white">4</span>
          <span>Returning home before Submit means the run <span className="font-semibold">won’t be saved</span>.</span>
        </li>
      </ol>
    </div>

    <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
      <div className="flex flex-col gap-4">
        <h2 className="mb-2 text-lg font-bold">Previous Experiment Runs</h2>
        {experiments.length === 0 ? (
        <div className="rounded-xl border border-dashed border-gray-300 bg-gray-50 p-4 text-sm text-gray-700">
          No previous experiment runs found.
        </div>
        ) : (
        <ul className="mt-2 space-y-3">
          {experiments.map((run, index) => (
            <li key={run.id} className="rounded-xl border border-gray-200 bg-white p-4 hover:bg-gray-50 w-full">
              <div className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
                <div className="text-sm text-gray-700">
                  <div><span className="font-semibold">Run number:</span> {index + 1}</div>
                  <div><span className="font-semibold">Started (UTC):</span> {run.startedAtUTC}</div>
                  <div><span className="font-semibold">Completed (UTC):</span> {run.completedAtUTC}</div>
                </div>

                <button
                  className="rounded-xl bg-gray-900 px-4 py-2 text-sm font-semibold text-white hover:bg-gray-800"
                  onClick={() => {
                    setFlowState(FLOW.PAGE2);
                    navigate(`/experiment2/${run.id}`);
                  }}
                >
                  View results
                </button>
              </div>
            </li>
          ))}
        </ul>
        )}
      </div>
    </div>
    
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
  </div>);
}
export default HomePage;    