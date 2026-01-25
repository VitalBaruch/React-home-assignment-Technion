import { EVENT } from "../../experiment/flow";
import type { ClickLog } from "../../experiment/flow";

const Likert = (props: {scaleSize: number, onClick: (log: ClickLog) => void}) => {
  return (
    <div className="flex flex-wrap justify-center gap-3">
      {Array.from({ length: props.scaleSize }).map((_, index) => (
          <button key={index} 
          className="
            cursor-pointer
            inline-flex items-center justify-center
            h-10 w-10
            rounded-full
            border border-gray-300 bg-white
            text-sm font-semibold text-gray-900
            shadow-sm
            transition
            hover:bg-gray-100
            active:scale-95 active:bg-gray-200
            focus:outline-none focus-visible:ring-2 focus-visible:ring-gray-900/20
          "
          onClick={() => props.onClick({timestamp: new Date().toISOString(), event: (index + 1).toString(), eventType: EVENT.LIKERT_CLICK})}  
          >
            {index + 1}
          </button>
      ))}
    </div>
  )
}

export default Likert;