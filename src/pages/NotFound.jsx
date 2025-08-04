import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center text-center px-6 bg-white dark:bg-zinc-950 text-zinc-900 dark:text-white">
      <h1 className="text-6xl font-bold text-purple-600 mb-4">404</h1>
      <p className="text-2xl mb-2">Page Not Found</p>
      <p className="mb-6 text-zinc-500 dark:text-zinc-400">
        Oops! Looks like you’re lost in the codebase.
      </p>
      <Link
        to="/"
        className="bg-purple-600 hover:bg-purple-700 text-white px-5 py-2 rounded-lg transition"
      >
        🔙 Go to Home
      </Link>
    </div>
  );
}
