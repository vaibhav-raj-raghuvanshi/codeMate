import { useEffect, useState } from "react";
import ContestCard from "../components/ContestCard";
import { getPlatformLogo } from "../utils/getPlatformLogo";

export default function CPGuide() {
  const [contests, setContests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const maxCards = 6;

  useEffect(() => {
    fetch("https://competeapi.vercel.app/contests/upcoming")
      .then((res) => res.json())
      .then((data) => {
        const filtered = data
          .filter((c) =>
            ["codeforces", "codechef", "atcoder", "leetcode"].includes(c.site?.toLowerCase())
          )
          .slice(0, maxCards)
          .map((c) => ({
            title: c.title || "Untitled Contest",
            link: c.url || "#",
            startTime: c.startTime
              ? new Date(c.startTime).toISOString()
              : new Date().toISOString(),
            logo: getPlatformLogo(c.site),
          }));

        setContests(filtered);
        setLoading(false);
      })
      .catch((e) => {
        console.error("Error fetching contests:", e);
        setError("Failed to load contests.");
        setLoading(false);
      });
  }, []);

  return (
    <div className="min-h-screen bg-white dark:bg-zinc-950 text-zinc-900 dark:text-white px-6 pt-12">
      <h1 className="text-4xl font-bold text-center mb-10">📘 Upcoming Contests</h1>

      {loading && (
        <p className="text-center text-zinc-500 dark:text-zinc-400">Loading contests...</p>
      )}

      {error && (
        <p className="text-center text-red-500 font-medium">{error}</p>
      )}

      {!loading && !error && contests.length === 0 && (
        <p className="text-center text-zinc-500 dark:text-zinc-400">No contests available right now.</p>
      )}

      {!loading && !error && contests.length > 0 && (
        <div className="grid md:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {contests.map((contest, idx) => (
            <ContestCard key={idx} {...contest} />
          ))}
        </div>
      )}
    </div>
  );
}
