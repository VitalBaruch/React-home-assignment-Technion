const EXPERIMENT_STATE_KEY = "experiment.state"; // Key used in localStorage
const EXPERIMENT_RUNS_KEY = "experiment.runs"; // Key for storing experiment runs


export type ExperimentDraft = {
    startedAtUTC: string;
    firstClickTime: string | null;
    clickLogs: ClickLog[];
}

// Type representing an experiment run
export type ExperimentRun = {
    id: string;
    startedAtUTC: string;
    completedAtUTC: string;
    firstClickTime: string;
    clickLogs: ClickLog[];
}

export type ExperimentRunsStore = ExperimentRun[];

// Define possible flow states
export const FLOW = {
    NONE: "NONE",
    PAGE1: "PAGE1",
    PAGE2: "PAGE2"
} as const;

// Type representing the flow states
export type FlowState = typeof FLOW[keyof typeof FLOW];

// Define possible event types
export const EVENT = {
    LIKERT_CLICK: "LIKERT_CLICK",
    RANDOM_WORD_CLICK: "RANDOM_WORD_CLICK",
    SUBMIT: "SUBMIT"
} as const;

// Type representing the event types
export type EventType = typeof EVENT[keyof typeof EVENT];

// Type representing a click log entry
export type ClickLog = {
  timestamp : string;
  event: string;
  eventType: EventType;
};

export const setFlowState = (state: FlowState) => {
    localStorage.setItem(EXPERIMENT_STATE_KEY, state);
}

export const getExperimentRuns = (): ExperimentRunsStore => {
    const runsString = localStorage.getItem(EXPERIMENT_RUNS_KEY);
    if (runsString) {
        try {
            const runs: ExperimentRunsStore = JSON.parse(runsString);
            return runs;
        } catch (error) {
            return [];
        }
    }
    return [];
}

export const saveExperimentRun = (run: ExperimentRun) => {
    const runs = getExperimentRuns();
    runs.push(run);
    localStorage.setItem(EXPERIMENT_RUNS_KEY, JSON.stringify(runs));
}

export const getCurrentState = (): FlowState => {
    const state = localStorage.getItem(EXPERIMENT_STATE_KEY);
    switch (state) {
        case FLOW.PAGE1:
            return FLOW.PAGE1;
        case FLOW.PAGE2:
            return FLOW.PAGE2;
        default:
            return FLOW.NONE;
    }
}

export const startExperiment = () => {
    setFlowState(FLOW.PAGE1);
}

export const advanceToPage2 = (experimentDraft: ExperimentDraft) => {
    setFlowState(FLOW.PAGE2);
    const currentExperiment = {
        id: crypto.randomUUID(),
        startedAtUTC: experimentDraft.startedAtUTC,
        completedAtUTC: new Date().toISOString(),
        firstClickTime: experimentDraft.firstClickTime!,
        clickLogs: experimentDraft.clickLogs
    };
    saveExperimentRun(currentExperiment);
    return currentExperiment.id;
}

export const resetAllExperiments = () => {
    localStorage.removeItem(EXPERIMENT_STATE_KEY);
    localStorage.removeItem(EXPERIMENT_RUNS_KEY);
}

export const deleteExperimentRun = (id: string) => {
    const confirmed = window.confirm("Are you sure you want to delete this experiment run? This action cannot be undone.");
    if (!confirmed) {
        return undefined;
    }
    const runs = getExperimentRuns();
    const updatedRuns = runs.filter(run => run.id !== id);
    localStorage.setItem(EXPERIMENT_RUNS_KEY, JSON.stringify(updatedRuns));
    return updatedRuns;
}