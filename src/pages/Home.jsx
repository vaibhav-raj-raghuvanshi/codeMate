import { Link } from "react-router-dom";
import { Code, Play, BookOpen, ArrowRight, Zap, Star, Users } from "lucide-react";
import PageWrapper from "../components/PageWrapper";

export default function Home() {
  const features = [
    {
      title: "Frontend Compiler",
      desc: "Build and preview web applications instantly with our modern HTML, CSS, and JavaScript compiler featuring live reload and error highlighting.",
      link: "/frontend",
      gradient: "from-blue-500 to-cyan-500",
      icon: <Code className="h-8 w-8" />,
      stats: "10K+ projects built"
    },
    {
      title: "Code Playground",
      desc: "Write, run, and debug code in multiple languages with our VS Code-like editor featuring intelligent autocomplete and real-time execution.",
      link: "/playground",
      gradient: "from-green-500 to-emerald-500",
      icon: <Play className="h-8 w-8" />,
      stats: "50+ languages supported"
    },
    {
      title: "CP Guide",
      desc: "Master competitive programming with curated resources, algorithm templates, and problem-solving strategies from top coders worldwide.",
      link: "/cp-guide",
      gradient: "from-purple-500 to-pink-500",
      icon: <BookOpen className="h-8 w-8" />,
      stats: "500+ problems solved"
    },
  ];

  const stats = [
    { label: "Active Users", value: "25K+", icon: <Users className="h-6 w-6" /> },
    { label: "Code Executions", value: "1M+", icon: <Zap className="h-6 w-6" /> },
    { label: "Success Rate", value: "99.9%", icon: <Star className="h-6 w-6" /> },
  ];

  return (
    <PageWrapper>
      <div className="min-h-screen bg-gradient-to-br from-zinc-50 via-white to-zinc-50 dark:from-zinc-950 dark:via-zinc-900 dark:to-zinc-950">
        {/* Hero Section */}
        <section className="relative overflow-hidden">
          {/* Background decoration */}
          <div className="absolute inset-0 bg-gradient-to-r from-blue-600/10 to-purple-600/10 blur-3xl"></div>
          <div className="absolute top-20 left-10 w-72 h-72 bg-blue-500/20 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
          
          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-32">
            <div className="text-center animate-fade-in">
              <div className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-2 rounded-full text-sm font-medium mb-8 animate-bounce-subtle">
                <Star className="h-4 w-4" />
                Trusted by 25,000+ developers worldwide
              </div>
              
              <h1 className="text-5xl md:text-7xl font-extrabold mb-8 leading-tight">
                <span className="block text-zinc-900 dark:text-white">Code.</span>
                <span className="block gradient-text">Create.</span>
                <span className="block text-zinc-900 dark:text-white">Conquer.</span>
              </h1>
              
              <p className="text-xl md:text-2xl text-zinc-600 dark:text-zinc-300 max-w-4xl mx-auto mb-12 leading-relaxed">
                Your all-in-one development environment for frontend projects, competitive programming, 
                and code experimentation. Build faster, learn better, code smarter.
              </p>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16">
                <Link
                  to="/playground"
                  className="btn-primary group inline-flex items-center gap-2 text-lg px-8 py-4"
                >
                  <Play className="h-5 w-5" />
                  Start Coding Now
                  <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
                </Link>
                <Link
                  to="/frontend"
                  className="btn-secondary group inline-flex items-center gap-2 text-lg px-8 py-4"
                >
                  <Code className="h-5 w-5" />
                  Try Frontend Compiler
                </Link>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
                {stats.map((stat, index) => (
                  <div 
                    key={index} 
                    className="card text-center animate-slide-up"
                    style={{ animationDelay: `${index * 0.2}s` }}
                  >
                    <div className="inline-flex items-center justify-center w-12 h-12 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl text-white mb-4">
                      {stat.icon}
                    </div>
                    <div className="text-3xl font-bold text-zinc-900 dark:text-white mb-2">
                      {stat.value}
                    </div>
                    <div className="text-zinc-600 dark:text-zinc-400 font-medium">
                      {stat.label}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-20 lg:py-32">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-20 animate-slide-up">
              <h2 className="text-4xl md:text-5xl font-bold text-zinc-900 dark:text-white mb-6">
                Everything you need to
                <span className="gradient-text"> build amazing things</span>
              </h2>
              <p className="text-xl text-zinc-600 dark:text-zinc-300 max-w-3xl mx-auto">
                Powerful tools designed for developers, by developers. Start building your next project today.
              </p>
            </div>

            <div className="grid lg:grid-cols-3 gap-8">
              {features.map((feature, index) => (
                <Link
                  key={index}
                  to={feature.link}
                  className="group"
                  style={{ animationDelay: `${index * 0.2}s` }}
                >
                  <div className={`card-feature bg-gradient-to-br ${feature.gradient} relative overflow-hidden`}>
                    {/* Background decoration */}
                    <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full blur-2xl transform translate-x-16 -translate-y-16 group-hover:scale-150 transition-transform duration-700"></div>
                    
                    <div className="relative z-10">
                      <div className="flex items-center gap-4 mb-6">
                        <div className="p-3 bg-white/20 rounded-2xl backdrop-blur-sm">
                          {feature.icon}
                        </div>
                        <div>
                          <h3 className="text-2xl font-bold mb-1">{feature.title}</h3>
                          <p className="text-white/80 text-sm font-medium">{feature.stats}</p>
                        </div>
                      </div>
                      
                      <p className="text-white/90 leading-relaxed mb-6 text-lg">
                        {feature.desc}
                      </p>
                      
                      <div className="flex items-center gap-2 text-white font-semibold group-hover:gap-4 transition-all duration-300">
                        Get Started
                        <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* Bottom CTA Section */}
        <section className="py-20 lg:py-32">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <div className="card bg-gradient-to-r from-blue-600 to-purple-600 text-white">
              <h3 className="text-3xl md:text-4xl font-bold mb-6">
                Ready to start your coding journey?
              </h3>
              <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
                Join thousands of developers who are already building amazing projects with CodeMate.
              </p>
              <Link
                to="/playground"
                className="inline-flex items-center gap-2 bg-white text-blue-600 font-bold px-8 py-4 rounded-xl hover:bg-zinc-100 transition-all duration-300 transform hover:scale-105"
              >
                <Play className="h-5 w-5" />
                Start Building Today
                <ArrowRight className="h-5 w-5" />
              </Link>
            </div>
          </div>
        </section>
      </div>
    </PageWrapper>
  );
}
