const EXPERIMENT_STATE_KEY = "experiment.state"; // Key used in localStorage

// Define possible flow states
export const FLOW = {
    NONE: "NONE",
    PAGE1: "PAGE1",
    PAGE2: "PAGE2"
} as const;

// Type representing the flow states
export type FlowState = typeof FLOW[keyof typeof FLOW];

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

export const advanceToPage2 = () => {
    localStorage.setItem(EXPERIMENT_STATE_KEY, FLOW.PAGE2);
}

export const resetExperiment = () => {
    localStorage.removeItem(EXPERIMENT_STATE_KEY);
}
