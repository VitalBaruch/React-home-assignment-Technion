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
  
  return (<div>
    {banner && <div className="mb-4 p-2 bg-yellow-200 text-yellow-800 rounded">{banner}</div>}
    <h1>Experiment Dashboard</h1>
    <div className="mb-4">
      <h2 className="mb-2 text-lg font-bold">Previous Experiment Runs</h2>
      {experiments.length === 0 ? (
        <p>No previous experiment runs found.</p>
      ) : (
        <h2 className="mb-2 text-md font-semibold">Total Runs: {experiments.length}</h2>
      )}
      <ul>
        {experiments.map((run, index) => (
          <li key={run.id} className="mb-2 border-b pb-2 border-black">
            <p>
              <strong>Total experiments completed : </strong> {index + 1}
            </p>
            <p>
              <strong>Started At (UTC):</strong> {run.startedAtUTC}
            </p>
            <p>
              <strong>Completed At (UTC):</strong>{run.completedAtUTC}
            </p>
            <p>
              <button 
              className="cursor-pointer rounded bg-green-500 px-2 py-1 font-bold text-white hover:bg-green-700"
              onClick={() =>{ 
                setFlowState(FLOW.PAGE2);
                navigate(`/experiment2/${run.id}`);
              }}
              >
                Show Table 
              </button>
            </p>
          </li>
        ))}
      </ul>
    </div>
    <button
     onClick={() => {
      startExperiment();
      navigate("/experiment1");
    }}
     className="cursor-pointer rounded bg-blue-500 px-4 py-2 font-bold text-white hover:bg-blue-700"
    >
      Start Experiment
    </button>
    { experiments.length > 0 &&
    <button
     onClick={() => {
      resetAllExperiments();
      setExperiments([]);
    }}
     className="ml-4 cursor-pointer rounded bg-red-500 px-4 py-2 font-bold text-white hover:bg-red-700"
    >
      Reset All Experiments
    </button>
  }
  </div>);
}
export default HomePage;    