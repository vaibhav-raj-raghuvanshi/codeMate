import { useEffect, useState } from "react";

function getCountdown(startTime) {
  const now = new Date();
  const start = new Date(startTime);
  const diff = start - now;

  if (diff <= 0) return "Ended";

  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
  const minutes = Math.floor((diff / (1000 * 60)) % 60);
  const seconds = Math.floor((diff / 1000) % 60);

  return `Starts in: ${days}d ${hours}h ${minutes}m ${seconds}s`;
}

export default function ContestCard({ title, link, startTime, logo }) {
  const [countdown, setCountdown] = useState(getCountdown(startTime));

  useEffect(() => {
    const timer = setInterval(() => {
      setCountdown(getCountdown(startTime));
    }, 1000);
    return () => clearInterval(timer);
  }, [startTime]);

  return (
    <div className="bg-white dark:bg-zinc-900 text-zinc-900 dark:text-white rounded-2xl p-6 shadow-md dark:shadow-lg border border-zinc-200 dark:border-zinc-800 flex flex-col items-center">
    <img src={logo || "/src/assets/logos/default.png"} alt="platform logo" className="h-20 w-auto object-contain mb-4" onError={(e) => {
      e.target.src = "/src/assets/logos/default.png";
    }}
/>
<h3 className="text-lg font-semibold text-center mb-3">{title}</h3>

      <div className="flex flex-col sm:flex-row gap-3 mb-4">
        <button className="px-4 py-2 rounded-full border border-zinc-300 dark:border-zinc-700 hover:bg-zinc-100 dark:hover:bg-zinc-800 text-sm transition">
          🔔 Get Notified
        </button>
        <a
          href={link}
          target="_blank"
          rel="noreferrer"
          className="px-4 py-2 rounded-full bg-black dark:bg-zinc-700 hover:bg-zinc-900 dark:hover:bg-zinc-600 text-white text-sm transition"
        >
          🔗 Go to Contest
        </a>
      </div>

      <p className="text-sm text-blue-600 dark:text-blue-400">{countdown}</p>
    </div>
  );
}
