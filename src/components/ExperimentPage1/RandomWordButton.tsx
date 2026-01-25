import type { ClickLog } from "../../experiment/flow";
import { EVENT } from "../../experiment/flow";


const RandomWordButtons = (props: {wordsArray: string[], onClick: (log: ClickLog) => void}) => {
  return (
    <div className="mt-3 flex flex-wrap justify-center gap-3">
      {props.wordsArray.map((word, index) => (
        <button 
        key={index} 
        className="
          cursor-pointer
          inline-flex items-center justify-center
          rounded-xl
          border border-gray-200 bg-white
          px-4 py-2
          text-sm font-semibold text-gray-900
          shadow-sm
          transition
          hover:bg-gray-100
          active:scale-95 active:bg-gray-200
          focus:outline-none focus-visible:ring-2 focus-visible:ring-gray-900/20
        "
        onClick={() => props.onClick({timestamp: new Date().toISOString(), event: word, eventType: EVENT.RANDOM_WORD_CLICK})}
        >
          {word}
        </button>
      ))}
    </div>
  )
}

export default RandomWordButtons;