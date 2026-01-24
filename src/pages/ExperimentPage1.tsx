import { useNavigate } from "react-router-dom";
import { advanceToPage2, EVENT } from "../experiment/flow";
import { useState, useEffect, useRef, useCallback } from "react";
import type { ClickLog, ExperimentDraft } from "../experiment/flow";
import ReturnToHomePageButton from "../components/ReturnToHomePageButton";

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
          onClick={() => props.onClick({timestamp: new Date().toISOString(), event: (index + 1).toString(), eventType: EVENT.LIKERT_CLICK})}  
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
        onClick={() => props.onClick({timestamp: new Date().toISOString(), event: word, eventType: EVENT.RANDOM_WORD_CLICK})}
        >
          {word}
        </button>
      ))}
    </div>
  )
}
// end of Experiment Page 1 components

// Custom hook to warn user before Refresh/Close
const useWarnBeforeLeave = () => {
  useEffect(() => {
    const handleBeforeUnload = (e: BeforeUnloadEvent) => {
      e.preventDefault();
    };
    window.addEventListener('beforeunload', handleBeforeUnload);
    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, []);
}

// Main component for Experiment Page 1
const ExperimentPage1 = () => {
  const [wordsArray, setWordsArray] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  
  const experimentDraft = useRef<ExperimentDraft|null>(null);
  const navigate = useNavigate();

  useWarnBeforeLeave();

  // Using a ref to hold logs to avoid re-renders on each log addition
  if (experimentDraft.current === null) {
    experimentDraft.current = {
      startedAtUTC: new Date().toISOString(),
      firstClickTime: null,
      clickLogs: []
    };
  }

  const logEvent = useCallback((log: ClickLog) => {
    experimentDraft.current?.clickLogs.push(log);
  }, []);

  const addFirstClick = useCallback(() => {
    if (experimentDraft.current?.firstClickTime === null) {
      experimentDraft.current.firstClickTime = new Date().toISOString();
    }
  }, []);

  const submitHandler = useCallback(() => {
    // Ensure firstClickTime is set if first click is the submit button
    if (experimentDraft.current?.firstClickTime === null) {
      experimentDraft.current.firstClickTime = new Date().toISOString();
    }
    // Add a final log entry for submission
    experimentDraft.current?.clickLogs.push({
      timestamp: new Date().toISOString(),
      event: "Submit",
      eventType: EVENT.SUBMIT
    });
    const runId = advanceToPage2(experimentDraft.current!);
    navigate(`/experiment2/${runId}`);
  }, [navigate]);

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
      <ReturnToHomePageButton />
    </div>);
  }
  
  if (error) {
    return (<div>
      <h1 className="text-xl font-semibold"> error fetching words: {error} </h1>
      <ReturnToHomePageButton />
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
      <ReturnToHomePageButton />
      <button
      onClick={submitHandler}
      className="cursor-pointer ml-4 rounded bg-blue-500 px-4 py-2 font-bold text-white hover:bg-blue-700">
        Submit
      </button>
    </div>
  </div>);
}

export default ExperimentPage1;