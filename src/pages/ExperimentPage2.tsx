import ResetExperimentButton from "../components/ResetExperimentButton";
import { EXPERIMENT_PAGE1_LOGS_KEY } from "../experiment/flow";

const ExperimentPage2 = () => {
  const data = localStorage.getItem(EXPERIMENT_PAGE1_LOGS_KEY);
  const page1Logs = data ? JSON.parse(data) : null;
  return (
  <div>
    <h1>Experiment Page 2</h1>
    <p> {page1Logs ? JSON.stringify(page1Logs) : "No logs available"} </p>
    <ResetExperimentButton />
  </div>)
}
export default ExperimentPage2;