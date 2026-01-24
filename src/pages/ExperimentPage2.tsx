import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getExperimentRuns, type ExperimentRun } from "../experiment/flow";
import ClicklogsTable from "../components/ClickLogsTable";
import ReturnToHomePageButton from "../components/ReturnToHomePageButton";

const ExperimentPage2 = () => {
  const [experimentLogs, setExperimentLogs] = useState<ExperimentRun | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const { runId } = useParams();

  useEffect(() => {
    const fetchExperimentLogs = () => {
      const runs = getExperimentRuns();
      if (runs.length === 0) {
        setLoading(false);
        return;
      }
      if (!runId) {
        setLoading(false);
        setError("Run ID is missing in URL parameters.");
        return;
      }
      const currentRun = runs.find(run => run.id === runId);
      if (!currentRun) {
        setLoading(false);
        setError(`No experiment run found with ID: ${runId}`);
        return;
      }
      setExperimentLogs(currentRun ?? null);
      setLoading(false);
    };

    fetchExperimentLogs();
  }, [runId]);

  return (
  <div>
    <h1>Experiment Page 2</h1>
    {
      loading ? (<p>Loading...</p>) : error ? (
        <p>{error}</p>
      ) : experimentLogs === null ? (
        <p>No logs found for this run.</p>
      ) : (
        <div>
          <h2>Experiment Logs</h2>
          <p>First Click Time: {experimentLogs.firstClickTime ? new Date(experimentLogs.firstClickTime).toISOString() : "N/A"}</p>
          <h3>Click Logs:</h3>
          <ClicklogsTable clickLogs={experimentLogs.clickLogs} />
        </div>
      )
    }
    <ReturnToHomePageButton />
  </div>)
}
export default ExperimentPage2;