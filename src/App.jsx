import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion";

import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Playground from "./pages/Playground";
import CPGuide from "./pages/CPGuide";
import FrontendCompiler from "./pages/FrontendCompiler";
import NotFound from "./pages/NotFound"; // Make sure this is imported!

function AnimatedRoutes() {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<Home />} />
        <Route path="/playground" element={<Playground />} />
        <Route path="/frontend" element={<FrontendCompiler />} />
        <Route path="/cp-guide" element={<CPGuide />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </AnimatePresence>
  );
}

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-zinc-950 text-white flex flex-col">
        <Navbar />
        <div className="flex-1">
          <AnimatedRoutes />
        </div>
      </div>
    </Router>
  );
}

export default App;
