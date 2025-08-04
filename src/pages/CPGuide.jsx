import { useEffect, useState } from "react";
import { Trophy, Calendar, ExternalLink, BookOpen, Target, Code2 } from "lucide-react";
import ContestCard from "../components/ContestCard";
import PageWrapper from "../components/PageWrapper";
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

  const resources = [
    {
      title: "Algorithm Templates",
      desc: "Ready-to-use implementations of common algorithms and data structures",
      icon: <Code2 className="h-6 w-6" />,
      color: "from-blue-500 to-cyan-500"
    },
    {
      title: "Problem Solving Strategies",
      desc: "Step-by-step approaches to tackle different types of competitive programming problems",
      icon: <Target className="h-6 w-6" />,
      color: "from-green-500 to-emerald-500"
    },
    {
      title: "Practice Problems",
      desc: "Curated collection of problems organized by difficulty and topic",
      icon: <BookOpen className="h-6 w-6" />,
      color: "from-purple-500 to-pink-500"
    },
  ];

  return (
    <PageWrapper>
      <div id="main-content" className="min-h-screen bg-gradient-to-br from-zinc-50 to-zinc-100 dark:from-zinc-950 dark:to-zinc-900">
        {/* Hero Section */}
        <section className="relative overflow-hidden py-20">
          <div className="absolute top-10 left-10 w-64 h-64 bg-purple-500/20 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-10 right-10 w-80 h-80 bg-blue-500/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
          
          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center animate-fade-in">
              <div className="inline-flex items-center gap-2 bg-gradient-to-r from-purple-600 to-pink-600 text-white px-6 py-2 rounded-full text-sm font-medium mb-8">
                <Trophy className="h-4 w-4" />
                Master Competitive Programming
              </div>
              
              <h1 className="text-4xl md:text-6xl font-extrabold mb-6">
                <span className="gradient-text">CP Guide</span>
              </h1>
              
              <p className="text-xl text-zinc-600 dark:text-zinc-300 max-w-3xl mx-auto mb-12">
                Your comprehensive resource for competitive programming success. From algorithms to contest strategies, 
                we've got everything you need to excel in competitive coding.
              </p>
            </div>
          </div>
        </section>

        {/* Resources Section */}
        <section className="py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-zinc-900 dark:text-white animate-slide-up">
              Learning Resources
            </h2>
            
            <div className="grid md:grid-cols-3 gap-8 mb-20">
              {resources.map((resource, index) => (
                <div 
                  key={index}
                  className="card group cursor-pointer hover:scale-105 transform transition-all duration-300 animate-slide-up"
                  style={{ animationDelay: `${index * 0.2}s` }}
                >
                  <div className={`inline-flex items-center justify-center w-12 h-12 bg-gradient-to-r ${resource.color} rounded-xl text-white mb-4 group-hover:scale-110 transition-transform`}>
                    {resource.icon}
                  </div>
                  <h3 className="text-xl font-semibold mb-3 text-zinc-900 dark:text-white">
                    {resource.title}
                  </h3>
                  <p className="text-zinc-600 dark:text-zinc-400 leading-relaxed">
                    {resource.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Contests Section */}
        <section className="py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12 animate-slide-up">
              <div className="flex items-center justify-center gap-2 mb-4">
                <Calendar className="h-8 w-8 text-purple-600" />
                <h2 className="text-3xl md:text-4xl font-bold text-zinc-900 dark:text-white">
                  Upcoming Contests
                </h2>
              </div>
              <p className="text-xl text-zinc-600 dark:text-zinc-300 max-w-2xl mx-auto">
                Stay updated with the latest competitive programming contests from top platforms
              </p>
            </div>

            {/* Loading State */}
            {loading && (
              <div className="text-center py-12 animate-pulse">
                <div className="inline-flex items-center gap-3 text-zinc-600 dark:text-zinc-400">
                  <div className="w-6 h-6 border-2 border-purple-600 border-t-transparent rounded-full animate-spin"></div>
                  <span className="text-lg">Loading contests...</span>
                </div>
              </div>
            )}

            {/* Error State */}
            {error && (
              <div className="card bg-red-50 dark:bg-red-950/20 border-red-200 dark:border-red-800 text-center">
                <div className="text-red-600 dark:text-red-400 mb-2">
                  <ExternalLink className="h-8 w-8 mx-auto mb-3" />
                  <p className="font-semibold text-lg">{error}</p>
                  <p className="text-sm">Please try again later or check your internet connection.</p>
                </div>
              </div>
            )}

            {/* Empty State */}
            {!loading && !error && contests.length === 0 && (
              <div className="card text-center">
                <Calendar className="h-16 w-16 text-zinc-400 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-zinc-900 dark:text-white mb-2">
                  No Contests Available
                </h3>
                <p className="text-zinc-600 dark:text-zinc-400">
                  There are no upcoming contests at the moment. Check back later!
                </p>
              </div>
            )}

            {/* Contests Grid */}
            {!loading && !error && contests.length > 0 && (
              <div 
                className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 animate-slide-up"
                role="list" 
                aria-label="Upcoming programming contests"
              >
                {contests.map((contest, idx) => (
                  <div key={idx} role="listitem">
                    <ContestCard {...contest} />
                  </div>
                ))}
              </div>
            )}
          </div>
        </section>

        {/* Tips Section */}
        <section className="py-16">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="card bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-950/20 dark:to-pink-950/20 border-purple-200 dark:border-purple-800 animate-slide-up">
              <h3 className="font-bold text-purple-900 dark:text-purple-100 mb-4 flex items-center gap-2 text-xl">
                <span className="text-purple-500">💡</span>
                Pro Tips for Contest Success
              </h3>
              <div className="grid md:grid-cols-2 gap-6 text-purple-800 dark:text-purple-200">
                <div className="space-y-3">
                  <div>• <strong>Practice regularly</strong> - Consistency beats intensity</div>
                  <div>• <strong>Learn templates</strong> - Save time during contests</div>
                  <div>• <strong>Time management</strong> - Don't get stuck on one problem</div>
                </div>
                <div className="space-y-3">
                  <div>• <strong>Read editorials</strong> - Understand different approaches</div>
                  <div>• <strong>Participate actively</strong> - Virtual contests help too</div>
                  <div>• <strong>Know your complexity</strong> - Big O analysis is crucial</div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </PageWrapper>
  );
}
