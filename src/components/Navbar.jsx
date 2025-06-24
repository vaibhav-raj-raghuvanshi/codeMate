import { NavLink } from "react-router-dom";
import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import logo from "../assets/logo.png"; // 🔁 Update path if needed

export default function Navbar() {
  const [darkMode, setDarkMode] = useState(() => {
    return localStorage.getItem("theme") === "dark";
  });

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [darkMode]);

  const navItems = [
    { name: "Home", path: "/" },
    { name: "Frontend Compiler", path: "/frontend" },
    { name: "Playground", path: "/playground" },
    { name: "CP Guide", path: "/cp-guide" },
  ];

  return (
    <nav className="sticky top-0 z-50 bg-zinc-900 text-white px-4 py-3 shadow-md">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center gap-2 text-xl font-bold">
          <img src={logo} alt="CodeMate Logo" className="h-8 w-8 object-contain" />
          <span>CodeMate</span>
        </div>

        {/* Desktop Nav */}
        <div className="hidden md:flex gap-4 justify-center">
          {navItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) =>
                `px-3 py-1 rounded-md text-sm font-medium transition ${
                  isActive
                    ? "bg-purple-600 text-white"
                    : "hover:bg-zinc-700 text-zinc-300"
                }`
              }
            >
              {item.name}
            </NavLink>
          ))}
        </div>

        {/* Right buttons */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => setDarkMode((prev) => !prev)}
            className="text-sm px-3 py-1 rounded-md bg-zinc-800 hover:bg-zinc-700 transition"
          >
            {darkMode ? "☀️ Light" : "🌙 Dark"}
          </button>

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden text-white"
          >
            {isMobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {/* Mobile Nav */}
      {isMobileMenuOpen && (
        <div className="md:hidden mt-3 flex flex-col gap-2">
          {navItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) =>
                `px-4 py-2 rounded-md text-sm font-medium transition ${
                  isActive
                    ? "bg-purple-600 text-white"
                    : "hover:bg-zinc-700 text-zinc-300"
                }`
              }
              onClick={() => setIsMobileMenuOpen(false)} // close menu after click
            >
              {item.name}
            </NavLink>
          ))}
        </div>
      )}
    </nav>
  );
}
