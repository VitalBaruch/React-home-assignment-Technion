import type { ReactNode } from "react";
import { createBrowserRouter, Navigate } from "react-router-dom";
import HomePage from "../pages/HomePage";
import IntroPage from "../pages/IntroPage";
import ExperimentPage2 from "../pages/ExperimentPage2";
import ExperimentPage1 from "../pages/ExperimentPage1";
import { FLOW, getCurrentState } from "../experiment/flow";
import type { FlowState } from "../experiment/flow";

// A wrapper component to enforce flow state requirements
const RequiredFlowState = (props: { children: ReactNode; requiredState: FlowState }) => {
    const state = getCurrentState();
    if (state === props.requiredState) {
        return <>{props.children}</>;
    }
    return <Navigate to="/" replace />;
}

// Define the router with routes and their corresponding components
const router = createBrowserRouter([
    { path: "/", element: <HomePage /> },
    { path: "/intro", element: <IntroPage /> },
    { path: "/experiment1", element: <RequiredFlowState requiredState={FLOW.PAGE1}>
                                        <ExperimentPage1 />
                                     </RequiredFlowState> },
    { path: "/experiment2", element: <RequiredFlowState requiredState={FLOW.PAGE2}>
                                        <ExperimentPage2 />
                                     </RequiredFlowState> }
]);

export default router;