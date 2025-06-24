import { Link } from "react-router-dom";
import PageWrapper from "../components/PageWrapper";

export default function Home() {
  const features = [
    {
      title: "⚙️ Frontend Compiler",
      desc: "Try HTML, CSS, and JavaScript with live preview – perfect for quick frontend experiments.",
      link: "/frontend",
      color: "bg-blue-600",
      image: "https://th.bing.com/th/id/OIP.SQrhqlN-lsiDnqilRJK1mwHaHZ?w=177&h=180&c=7&r=0&o=7&dpr=1.3&pid=1.7&rm=3",
    },
    {
      title: "🧠 Playground",
      desc: "Write, run, and test your code with multi-language support and error highlighting just like VS Code.",
      link: "/playground",
      color: "bg-green-600",
      image: "https://th.bing.com/th/id/OIP.9N0CSLntdMHU9KQb5OLw4gHaFL?w=239&h=181&c=7&r=0&o=7&dpr=1.3&pid=1.7&rm=3",
    },
    {
      title: "📘 CP Guide",
      desc: "A curated guide with CP tips, templates, and problem links to help you improve your competitive coding.",
      link: "/cp-guide",
      color: "bg-purple-600",
      image: "https://th.bing.com/th/id/OIP.zK2vD7CPqrHZEB5DLowkyQHaDx?w=339&h=178&c=7&r=0&o=7&dpr=1.3&pid=1.7&rm=3",
    },
  ];

  return (
    <PageWrapper>
      <section className="min-h-screen bg-white dark:bg-zinc-950 text-zinc-900 dark:text-white px-6 pt-12 md:pt-24">
        {/* Hero Section */}
        <div className="flex flex-col items-center text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Welcome to <span className="text-purple-500">CodeMate</span>
          </h1>
          <p className="text-lg md:text-xl max-w-2xl mb-8">
            Your all-in-one platform to write, compile, and master coding – from dev to CP.
          </p>

          <div className="flex gap-4 flex-wrap justify-center">
            <Link
              to="/frontend"
              className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-3 rounded-lg text-sm transition"
            >
              ⚙️ Frontend Compiler
            </Link>
            <Link
              to="/playground"
              className="bg-green-600 hover:bg-green-700 text-white px-5 py-3 rounded-lg text-sm transition"
            >
              💻 Playground
            </Link>
            <Link
              to="/cp-guide"
              className="bg-purple-600 hover:bg-purple-700 text-white px-5 py-3 rounded-lg text-sm transition"
            >
              📘 CP Guide
            </Link>
          </div>
        </div>

        {/* Feature Cards Section */}
        <div className="grid md:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {features.map((item, idx) => (
            <Link
              key={idx}
              to={item.link}
              className={`rounded-xl p-6 ${item.color} text-white hover:brightness-110 hover:-translate-y-1 transform transition-all duration-300 shadow-lg`}
            >
              <img
                src={item.image}
                alt={item.title}
                className="w-full h-32 object-cover rounded-lg mb-4 border border-white/20"
              />
              <h2 className="text-xl font-semibold mb-2">{item.title}</h2>
              <p className="text-sm leading-relaxed">{item.desc}</p>
            </Link>
          ))}
        </div>
      </section>
    </PageWrapper>
  );
}
