const ExplantionCard = () => {
    return (
    <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
      <h2 className="text-lg font-semibold text-gray-900">How this experiment works</h2>
      <p className="mt-2 text-sm text-gray-600">
        The experiment runs entirely in your browser. Completed runs are stored locally on this device.
      </p>

      <ol className="mt-4 space-y-2 text-sm text-gray-700">
        <li className="flex gap-3">
          <span className="mt-0.5 inline-flex h-6 w-6 items-center justify-center rounded-full bg-gray-900 text-xs font-semibold text-white">1</span>
          <span>Click <span className="font-semibold">Start Experiment</span> to begin Page 1.</span>
        </li>
        <li className="flex gap-3">
          <span className="mt-0.5 inline-flex h-6 w-6 items-center justify-center rounded-full bg-gray-900 text-xs font-semibold text-white">2</span>
          <span>Page 1 records the <span className="font-semibold">first click time (UTC)</span> and every button click.</span>
        </li>
        <li className="flex gap-3">
          <span className="mt-0.5 inline-flex h-6 w-6 items-center justify-center rounded-full bg-gray-900 text-xs font-semibold text-white">3</span>
          <span><span className="font-semibold">Submit</span> advances to Page 2 to review the results table.</span>
        </li>
        <li className="flex gap-3">
          <span className="mt-0.5 inline-flex h-6 w-6 items-center justify-center rounded-full bg-gray-900 text-xs font-semibold text-white">4</span>
          <span>Returning home before Submit means the run <span className="font-semibold">won’t be saved</span>.</span>
        </li>
      </ol>
    </div>
    )
}

export default ExplantionCard;