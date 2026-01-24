import { useEffect, useState } from "react";
import ResetExperimentButton from "../components/ResetExperimentButton";
import { EXPERIMENT_PAGE1_LOGS_KEY } from "../experiment/flow";
import type { Page1Logs } from "../experiment/flow";
import ClicklogsTable from "../components/ClickLogsTable";

const ExperimentPage2 = () => {
  const [loading, setLoading] = useState<boolean>(true);
  const [page1Logs, setPage1Logs] = useState<Page1Logs | null>(null);

  useEffect(() => {
    const fetchPage1Logs = () => {
      const logsString = localStorage.getItem(EXPERIMENT_PAGE1_LOGS_KEY);
      if (logsString) {
        try {
          const logs: Page1Logs = JSON.parse(logsString);
          setPage1Logs(logs);
        } catch (error) {
          console.error("Failed to parse page 1 logs:", error);
        }
      }
      setLoading(false);
    };

    fetchPage1Logs();
  }, []);

  return (
  <div>
    <h1>Experiment Page 2</h1>
    {
      loading ? (<p>Loading...</p>) : page1Logs === null ? (
        <p>No logs found from Page 1.</p>
      ) : (
        <div>
          <h2>Page 1 Logs</h2>
          <p>First Click Time: {new Date(page1Logs.firstClickTime ?? 0).toISOString()}</p>
          <h3>Click Logs:</h3>
          <ClicklogsTable clickLogs={page1Logs.clickLogs} />
        </div>
      )
    }
    <ResetExperimentButton />
  </div>)
}
export default ExperimentPage2;