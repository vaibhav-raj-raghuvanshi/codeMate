export default function InputOutputPanel({ input, setInput, output }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
      <div>
        <h3 className="text-lg font-medium mb-2">Input</h3>
        <textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="w-full h-40 p-2 bg-white dark:bg-zinc-800 border border-zinc-300 dark:border-zinc-700 rounded-md resize-none"
          placeholder="Enter custom input here..."
        />
      </div>

      <div>
        <h3 className="text-lg font-medium mb-2">Output</h3>
        <div className="w-full h-40 p-2 bg-zinc-100 dark:bg-zinc-900 border border-zinc-300 dark:border-zinc-700 rounded-md overflow-y-auto whitespace-pre-wrap">
          {output || "Output will appear here after running the code."}
        </div>
      </div>
    </div>
  );
}
