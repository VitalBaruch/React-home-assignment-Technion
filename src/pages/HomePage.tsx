import { FLOW, getCurrentState, getExperimentRuns, setFlowState, type ExperimentRunsStore } from "../experiment/flow";
import { useEffect, useState } from "react";
import ExplantionCard from "../components/HomePage/ExplantionCard";
import ExperimentCard from "../components/HomePage/ExperimentCard";
import ActionSection from "../components/HomePage/ActionSection";

const HomePage = () => {
  const [experiments, setExperiments] = useState<ExperimentRunsStore>([]);
  const [loading, setLoading] = useState(true);
  const [banner, setBanner] = useState<string | null>(null);


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
    <ExplantionCard />
    <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
      <div className="flex flex-col gap-4">
        <h2 className="mb-2 text-lg font-bold">Previous Experiment Runs</h2>
        {experiments.length === 0 ? (
        <div className="rounded-xl border border-dashed border-gray-300 bg-gray-50 p-4 text-sm text-gray-700">
          No previous experiment runs found.
        </div>
        ) : (
        <ExperimentCard experiments={experiments} setExperiments={setExperiments} />
        )}
      </div>
    </div>
    <ActionSection experiments={experiments} setExperiments={setExperiments} />
  </div>);
}
export default HomePage;    