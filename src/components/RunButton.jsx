export default function RunButton({ onRun, loading }) {
  return (
    <button
      onClick={onRun}
      disabled={loading}
      className={`mt-4 px-6 py-2 rounded-md font-medium transition-colors ${
        loading
          ? "bg-gray-400 cursor-not-allowed"
          : "bg-purple-600 hover:bg-purple-700 text-white"
      }`}
    >
      {loading ? "⚙️ Running..." : "🧪 Run Code"}
    </button>
  );
}
