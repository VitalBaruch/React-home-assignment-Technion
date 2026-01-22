const EXPERIMENT_STATE_KEY = "experiment.state"; // Key used in localStorage
export const EXPERIMENT_PAGE1_LOGS_KEY = "experiment.page1.logs"; // Key for storing page 1 logs

// Define possible flow states
export const FLOW = {
    NONE: "NONE",
    PAGE1: "PAGE1",
    PAGE2: "PAGE2"
} as const;

// Type representing the flow states
export type FlowState = typeof FLOW[keyof typeof FLOW];

export type ClickLog = {
  timestamp : string;
  event: string;
};

export type Page1Logs = {
  firstClickTime: string | null;
  clickLogs: ClickLog[];
};

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
    localStorage.setItem(EXPERIMENT_STATE_KEY, FLOW.PAGE1);
}

export const advanceToPage2 = (page1Logs: Page1Logs) => {
    localStorage.setItem(EXPERIMENT_STATE_KEY, FLOW.PAGE2);
    localStorage.setItem(EXPERIMENT_PAGE1_LOGS_KEY, JSON.stringify(page1Logs));
}

export const resetExperiment = () => {
    localStorage.removeItem(EXPERIMENT_STATE_KEY);
    localStorage.removeItem(EXPERIMENT_PAGE1_LOGS_KEY);
}
