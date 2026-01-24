import { useNavigate } from "react-router-dom";
import { FLOW, setFlowState } from "../experiment/flow";
const ReturnToHomePageButton = () => {
    const navigate = useNavigate();
    return (
        <button 
        className="cursor-pointer rounded bg-yellow-500 px-4 py-2 font-bold text-gray-700 hover:bg-gray-300"
        onClick={() => {
            setFlowState(FLOW.NONE);
            navigate("/")
        }}
        >
            Return to Home Page
        </button>
    )
}
export default ReturnToHomePageButton;