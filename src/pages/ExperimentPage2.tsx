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
  <div className="flex flex-col gap-6">

    <div className="flex flex-col gap-1">
      <h1 className="text-2xl font-semibold text-gray-900">Experiment Results</h1>
      <p className="text-sm text-gray-600">
        Review the recorded click logs for this run.
      </p>
    </div>

    {loading ? (
      <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
        <p className="text-sm text-gray-700">Loading...</p>
      </div>
    ) : error ? (
      <div className="rounded-2xl border border-red-200 bg-red-50 p-6 text-sm text-red-900">
        {error}
      </div>
    ) : experimentLogs === null ? (
      <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
        <p className="text-sm text-gray-700">No logs found for this run.</p>
      </div>
    ) : (
      <>
        <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
          <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
            <h2 className="text-lg font-semibold text-gray-900">Run Details</h2>
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                <div className="rounded-xl border border-gray-200 bg-gray-50 p-4">
                  <div className="text-xs font-medium text-gray-600">First click (UTC)</div>
                  <div className="mt-1 text-sm font-semibold text-gray-900">
                    {experimentLogs.firstClickTime
                      ? new Date(experimentLogs.firstClickTime).toISOString()
                      : "N/A"}
                  </div>
                </div>
                <div className="rounded-xl border border-gray-200 bg-gray-50 p-4">
                  <div className="text-xs font-medium text-gray-600">Total events</div>
                  <div className="mt-1 text-sm font-semibold text-gray-900">
                    {experimentLogs.clickLogs.length}
                  </div>
                </div>
            </div>
          </div>

          <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
            <div className="mb-4">
              <h2 className="text-lg font-semibold text-gray-900">Click logs</h2>
              <p className="mt-1 text-sm text-gray-600">
                Filter and search events below.
              </p>
            </div>
            <ClicklogsTable clickLogs={experimentLogs.clickLogs} />
          </div>
        </div>
      </>
    )} 

    <div className="flex justify-end">
      <ReturnToHomePageButton />
    </div>
    
  </div>)
}
export default ExperimentPage2;