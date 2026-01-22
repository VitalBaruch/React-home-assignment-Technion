import { useNavigate } from "react-router-dom";
import { advanceToPage2 } from "../experiment/flow";
import { useState, useEffect } from "react";
import ResetExperimentButton from "../components/ResetExperimentButton";
import type { ClickLog, Page1Logs } from "../experiment/flow";

// Constants for Experiment Page 1
const EXPERIMENT_IMAGE_1_URL = "/experiment_image_1.png";
const NUMBER_OF_RANDOM_WORDS = 3;
const LIKERT_SCALE_SIZE = 4;
const RANDOM_WORD_API_URL = `https://random-word-api.herokuapp.com/word?number=${NUMBER_OF_RANDOM_WORDS}`;

// Components for Experiment Page 1
const Likert = (props: {scaleSize: number, onClick: (log: ClickLog) => void}) => {
  return (
    <div className="flex justify-center space-x-4">
      {[...Array(props.scaleSize)].map((_, index) => (
        <div key={index} className="flex flex-col items-center">
          <button 
          className="cursor-pointer rounded-full bg-gray-200 px-4 py-2 font-bold text-gray-700 hover:bg-gray-300"
          onClick={() => props.onClick({timestamp: new Date().toISOString(), event: (index + 1).toString()})}  
          >
            {index + 1}
          </button>
        </div>
      ))}
    </div>
  )
}

const RandomWordButtons = (props: {wordsArray: string[], onClick: (log: ClickLog) => void}) => {
  return (
    <div className="mt-4 flex justify-center space-x-4">
      {props.wordsArray.map((word, index) => (
        <button 
        key={index} 
        className="cursor-pointer rounded bg-gray-200 px-4 py-2 font-bold text-gray-700 hover:bg-gray-300"
        onClick={() => props.onClick({timestamp: new Date().toISOString(), event: word})}
        >
          {word}
        </button>
      ))}
    </div>
  )
}
// end of Experiment Page 1 components

// Main component for Experiment Page 1
const ExperimentPage1 = () => {
  const [wordsArray, setWordsArray] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [logs, setLogs] = useState<Page1Logs>({firstClickTime: null, clickLogs: []});


  const navigate = useNavigate();
  const logEvent = (log: ClickLog) => {
    setLogs(prevLogs => ({...prevLogs, clickLogs: [...prevLogs.clickLogs, log]}));
  };
  const addFirstClick = () => {
    if (logs.firstClickTime === null) {
      setLogs(prevLogs => ({...prevLogs, firstClickTime: new Date().toISOString()}));
    }
  };
  const submitHandler = () => {
    // Add a final log entry for submission avoiding async state update issues
    const submitLog: ClickLog = {timestamp: new Date().toISOString(), event: "Submit"};
    const finalLogs: Page1Logs = {firstClickTime: logs.firstClickTime, clickLogs: [...logs.clickLogs, submitLog]};
    advanceToPage2(finalLogs);
    navigate("/experiment2");
  }
  const fetchWords = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await fetch(RANDOM_WORD_API_URL);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      if (!Array.isArray(data)) {
        throw new Error("Invalid data format received from API");
      }
      for (const word of data) {
        if (typeof word !== "string") {
          throw new Error("Invalid word format received from API");
        }
      }
      setWordsArray(data);
    } catch (err) {
      setError((err as Error).message);
    }
    finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchWords();
  }, []);

  if (isLoading) {
    return (<div>
      <h1 className="text-xl font-semibold"> Loading... </h1>
      <ResetExperimentButton />
    </div>);
  }
  
  if (error) {
    return (<div>
      <h1 className="text-xl font-semibold"> error fetching words: {error} </h1>
      <ResetExperimentButton />
      <button onClick={async () => {
        await fetchWords();
      }} className="cursor-pointer ml-4 rounded bg-green-500 px-4 py-2 font-bold text-white hover:bg-green-700">
        Retry Fetching Words
      </button>
    </div>);
  }
  return (
  <div className="flex flex-col items-center justify-center p-8" onPointerDown={addFirstClick}>
    <h1 className="text-2xl font-bold mb-4">Experiment Page 1</h1>
    <img src={EXPERIMENT_IMAGE_1_URL} alt="Experiment 1" className="mb-4 w-1/4 " />
    <Likert scaleSize={LIKERT_SCALE_SIZE} onClick={logEvent} />
    <RandomWordButtons wordsArray={wordsArray} onClick={logEvent} />
    <div className="mt-8 flex items-center">
      <ResetExperimentButton />
      <button
      onClick={submitHandler}
      className="cursor-pointer ml-4 rounded bg-blue-500 px-4 py-2 font-bold text-white hover:bg-blue-700">
        Submit
      </button>
    </div>
  </div>);
}

export default ExperimentPage1;