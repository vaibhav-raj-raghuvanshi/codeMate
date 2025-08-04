import { Play, Square, Zap } from "lucide-react";
import { motion } from "framer-motion";

export default function RunButton({ onRun, loading }) {
  return (
    <motion.div
      className="flex items-center justify-center"
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
    >
      <button
        onClick={onRun}
        disabled={loading}
        className={`
          relative overflow-hidden group
          ${loading 
            ? 'bg-gradient-to-r from-orange-500 to-red-500 cursor-not-allowed' 
            : 'bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600'
          }
          text-white font-bold px-8 py-4 rounded-2xl
          transition-all duration-300 transform hover:scale-105 active:scale-95
          shadow-lg hover:shadow-xl
          focus:outline-none focus:ring-4 focus:ring-green-500/50
          flex items-center gap-3 text-lg
        `}
        aria-label={loading ? "Running code..." : "Run code"}
      >
        {/* Background animation */}
        <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
        
        {/* Icon */}
        <motion.div
          animate={loading ? { rotate: 360 } : { rotate: 0 }}
          transition={loading ? { duration: 2, repeat: Infinity, ease: "linear" } : { duration: 0.3 }}
        >
          {loading ? (
            <Square className="h-6 w-6 fill-current" />
          ) : (
            <Play className="h-6 w-6 fill-current" />
          )}
        </motion.div>
        
        {/* Text */}
        <span className="relative z-10">
          {loading ? (
            <span className="loading-dots">Running</span>
          ) : (
            "Run Code"
          )}
        </span>
        
        {/* Sparkle effect */}
        {!loading && (
          <motion.div
            className="absolute right-2 top-2"
            animate={{ 
              scale: [1, 1.2, 1],
              rotate: [0, 180, 360]
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          >
            <Zap className="h-4 w-4 text-yellow-300" />
          </motion.div>
        )}
        
        {/* Loading bar */}
        {loading && (
          <motion.div
            className="absolute bottom-0 left-0 h-1 bg-white/50 rounded-full"
            initial={{ width: "0%" }}
            animate={{ width: "100%" }}
            transition={{ duration: 3, ease: "easeOut" }}
          />
        )}
      </button>
    </motion.div>
  );
}
