import { useState } from "react";
import { Terminal, FileText, Copy, Check } from "lucide-react";
import { motion } from "framer-motion";

export default function InputOutputPanel({ input, setInput, output }) {
  const [activeTab, setActiveTab] = useState("input");
  const [copied, setCopied] = useState(false);

  const handleCopyOutput = async () => {
    try {
      await navigator.clipboard.writeText(output);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy: ', err);
    }
  };

  const tabs = [
    { id: "input", label: "Input", icon: <FileText className="h-4 w-4" /> },
    { id: "output", label: "Output", icon: <Terminal className="h-4 w-4" /> },
  ];

  return (
    <div className="space-y-4">
      {/* Tab Navigation */}
      <div className="flex border-b border-zinc-200 dark:border-zinc-700">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`relative flex items-center gap-2 px-4 py-3 text-sm font-medium transition-all duration-300 focus-ring rounded-t-lg ${
              activeTab === tab.id
                ? "text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-950/20"
                : "text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100"
            }`}
          >
            {tab.icon}
            {tab.label}
            {activeTab === tab.id && (
              <motion.div
                className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-blue-600 to-purple-600"
                layoutId="activeTab"
                transition={{ type: "spring", stiffness: 500, damping: 30 }}
              />
            )}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      <motion.div
        key={activeTab}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="space-y-3"
      >
        {activeTab === "input" ? (
          <div>
            <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-2">
              Program Input
            </label>
            <textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Enter your input data here..."
              className="input-field h-32 resize-none font-mono"
              aria-label="Program input"
            />
            <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-1">
              Provide input data that your program will read
            </p>
          </div>
        ) : (
          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="text-sm font-medium text-zinc-700 dark:text-zinc-300">
                Program Output
              </label>
              {output && (
                <button
                  onClick={handleCopyOutput}
                  className="btn-secondary text-xs px-3 py-1 flex items-center gap-1"
                  title="Copy output to clipboard"
                >
                  {copied ? (
                    <>
                      <Check className="h-3 w-3" />
                      Copied!
                    </>
                  ) : (
                    <>
                      <Copy className="h-3 w-3" />
                      Copy
                    </>
                  )}
                </button>
              )}
            </div>
            <div className="relative">
              <textarea
                value={output}
                readOnly
                placeholder="Output will appear here after running your code..."
                className="input-field h-32 resize-none font-mono bg-zinc-50 dark:bg-zinc-800"
                aria-label="Program output"
              />
              {!output && (
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                  <div className="text-zinc-400 dark:text-zinc-500 text-center">
                    <Terminal className="h-8 w-8 mx-auto mb-2 opacity-50" />
                    <p className="text-sm">Run your code to see output here</p>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
      </motion.div>

      {/* Status Indicator */}
      {output && (
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className={`inline-flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium ${
            output.includes("✅")
              ? "bg-green-100 dark:bg-green-950/20 text-green-800 dark:text-green-300"
              : output.includes("❌")
              ? "bg-red-100 dark:bg-red-950/20 text-red-800 dark:text-red-300"
              : "bg-yellow-100 dark:bg-yellow-950/20 text-yellow-800 dark:text-yellow-300"
          }`}
        >
          <div className="w-2 h-2 rounded-full bg-current animate-pulse"></div>
          {output.includes("✅") && "Execution successful"}
          {output.includes("❌") && "Execution failed"}
          {output.includes("⚠️") && "No output received"}
          {output.includes("⏳") && "Processing..."}
        </motion.div>
      )}
    </div>
  );
}
