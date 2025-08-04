import { useState, useEffect } from "react";
import { Play, Download, Upload, Settings, Code, Eye, Maximize2 } from "lucide-react";
import Editor from "@monaco-editor/react";
import PageWrapper from "../components/PageWrapper";

export default function FrontendCompiler() {
  const [html, setHtml] = useState(`<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Frontend Playground</title>
</head>
<body>
    <div class="container">
        <h1>Welcome to Frontend Compiler! 🚀</h1>
        <p>Edit the HTML, CSS, and JavaScript to see live changes.</p>
        <button onclick="showMessage()">Click me!</button>
        <div id="output"></div>
    </div>
</body>
</html>`);

  const [css, setCss] = useState(`/* Add your CSS styles here */
.container {
    max-width: 800px;
    margin: 0 auto;
    padding: 2rem;
    font-family: 'Inter', system-ui, sans-serif;
}

h1 {
    color: #3b82f6;
    text-align: center;
    margin-bottom: 1rem;
}

p {
    text-align: center;
    color: #6b7280;
    margin-bottom: 2rem;
}

button {
    display: block;
    margin: 0 auto 2rem;
    background: linear-gradient(45deg, #3b82f6, #8b5cf6);
    color: white;
    border: none;
    padding: 0.75rem 2rem;
    border-radius: 0.5rem;
    cursor: pointer;
    font-weight: 600;
    transition: transform 0.2s;
}

button:hover {
    transform: scale(1.05);
}

#output {
    text-align: center;
    margin-top: 1rem;
    padding: 1rem;
    background: #f3f4f6;
    border-radius: 0.5rem;
    min-height: 50px;
}`);

  const [js, setJs] = useState(`// Add your JavaScript code here
function showMessage() {
    const output = document.getElementById('output');
    output.innerHTML = '<h3 style="color: #10b981;">🎉 Great! Your JavaScript is working!</h3>';
    console.log('Button clicked successfully!');
}

// You can also add more interactive features
console.log('Frontend Compiler loaded successfully! 🚀');`);

  const [srcDoc, setSrcDoc] = useState("");
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [activeTab, setActiveTab] = useState("html");
  const [theme, setTheme] = useState(() => {
    return localStorage.getItem("theme") === "dark" ? "vs-dark" : "light";
  });

  const handleRun = () => {
    const source = `
      <html>
        <head>
          <style>${css}</style>
        </head>
        <body>
          ${html}
          <script>
            ${js}
          </script>
        </body>
      </html>
    `;
    setSrcDoc(source);
  };

  const handleDownload = () => {
    const source = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>My Frontend Project</title>
    <style>
${css}
    </style>
</head>
<body>
${html}
    <script>
${js}
    </script>
</body>
</html>`;

    const blob = new Blob([source], { type: 'text/html' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'index.html';
    a.click();
    URL.revokeObjectURL(url);
  };

  // Update theme when system theme changes
  useEffect(() => {
    const isDark = localStorage.getItem("theme") === "dark" || 
      (!localStorage.getItem("theme") && window.matchMedia('(prefers-color-scheme: dark)').matches);
    setTheme(isDark ? "vs-dark" : "light");
  }, []);

  // Listen for theme changes
  useEffect(() => {
    const observer = new MutationObserver(() => {
      const isDark = document.documentElement.classList.contains('dark');
      setTheme(isDark ? "vs-dark" : "light");
    });

    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['class']
    });

    return () => observer.disconnect();
  }, []);

  // Auto-run on mount and when code changes
  useEffect(() => {
    const timer = setTimeout(handleRun, 300);
    return () => clearTimeout(timer);
  }, [html, css, js]);

  // Keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (e) => {
      const isMac = navigator.platform.toUpperCase().indexOf("MAC") >= 0;
      const isSaveShortcut = (isMac && e.metaKey && e.key === "s") || (!isMac && e.ctrlKey && e.key === "s");
      const isRunShortcut = (isMac && e.metaKey && e.key === "r") || (!isMac && e.ctrlKey && e.key === "r");

      if (isSaveShortcut || isRunShortcut) {
        e.preventDefault();
        handleRun();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [html, css, js]);

  const tabs = [
    { id: "html", label: "HTML", icon: <Code className="h-4 w-4" />, color: "text-orange-500" },
    { id: "css", label: "CSS", icon: <Settings className="h-4 w-4" />, color: "text-blue-500" },
    { id: "js", label: "JavaScript", icon: <Code className="h-4 w-4" />, color: "text-yellow-500" },
  ];

  const getEditorValue = (tab) => {
    switch (tab) {
      case "html": return html;
      case "css": return css;
      case "js": return js;
      default: return "";
    }
  };

  const setEditorValue = (tab, value) => {
    switch (tab) {
      case "html": setHtml(value || ""); break;
      case "css": setCss(value || ""); break;
      case "js": setJs(value || ""); break;
    }
  };

  return (
    <PageWrapper>
      <div id="main-content" className="min-h-screen bg-gradient-to-br from-zinc-50 to-zinc-100 dark:from-zinc-950 dark:to-zinc-900">
        {/* Header */}
        <div className="bg-white dark:bg-zinc-900 border-b border-zinc-200 dark:border-zinc-800">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-gradient-to-r from-orange-500 to-pink-500 rounded-2xl">
                  <Code className="h-6 w-6 text-white" />
                </div>
                <div>
                  <h1 className="text-2xl lg:text-3xl font-bold text-zinc-900 dark:text-white">
                    Frontend Compiler
                  </h1>
                  <p className="text-zinc-600 dark:text-zinc-400">
                    Build and preview web applications instantly with live reload
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <button
                  onClick={handleRun}
                  className="btn-primary flex items-center gap-2 focus-ring"
                  title="Run Code (Ctrl+R)"
                >
                  <Play className="h-4 w-4" />
                  <span className="hidden sm:inline">Run Code</span>
                </button>

                <button
                  onClick={handleDownload}
                  className="btn-secondary flex items-center gap-2 focus-ring"
                  title="Download HTML file"
                >
                  <Download className="h-4 w-4" />
                  <span className="hidden sm:inline">Download</span>
                </button>

                <button
                  onClick={() => setIsFullscreen(!isFullscreen)}
                  className="btn-secondary flex items-center gap-2 focus-ring"
                  title="Toggle fullscreen"
                >
                  <Maximize2 className="h-4 w-4" />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className={`grid gap-6 ${isFullscreen ? 'grid-cols-1' : 'lg:grid-cols-2'} animate-fade-in`}>
            
            {/* Code Editor Panel */}
            {!isFullscreen && (
              <div className="space-y-6">
                {/* Mobile Tabs */}
                <div className="lg:hidden">
                  <div className="flex border-b border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-900 rounded-t-2xl">
                    {tabs.map((tab) => (
                      <button
                        key={tab.id}
                        onClick={() => setActiveTab(tab.id)}
                        className={`flex-1 flex items-center justify-center gap-2 px-4 py-3 text-sm font-medium transition-all duration-300 focus-ring ${
                          activeTab === tab.id
                            ? "bg-blue-50 dark:bg-blue-950/20 text-blue-600 dark:text-blue-400"
                            : "text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100"
                        }`}
                      >
                        <span className={tab.color}>{tab.icon}</span>
                        {tab.label}
                      </button>
                    ))}
                  </div>
                  
                  <div className="card rounded-t-none min-h-[400px]">
                    <Editor
                      height="400px"
                      defaultLanguage={activeTab === "js" ? "javascript" : activeTab}
                      value={getEditorValue(activeTab)}
                      onChange={(value) => setEditorValue(activeTab, value)}
                      theme={theme}
                      options={{
                        fontSize: 14,
                        minimap: { enabled: false },
                        scrollBeyondLastLine: false,
                        wordWrap: "on",
                        lineNumbers: "on",
                        folding: true,
                        automaticLayout: true,
                      }}
                    />
                  </div>
                </div>

                {/* Desktop Editors */}
                <div className="hidden lg:block space-y-6">
                  {tabs.map((tab) => (
                    <div key={tab.id} className="card animate-slide-up">
                      <div className="flex items-center gap-2 mb-4">
                        <span className={tab.color}>{tab.icon}</span>
                        <h3 className="font-semibold text-zinc-900 dark:text-white">
                          {tab.label}
                        </h3>
                        <div className="flex gap-1 ml-auto">
                          <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                          <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                          <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                        </div>
                      </div>
                      <div className="border border-zinc-200 dark:border-zinc-700 rounded-xl overflow-hidden">
                        <Editor
                          height="200px"
                          defaultLanguage={tab.id === "js" ? "javascript" : tab.id}
                          value={getEditorValue(tab.id)}
                          onChange={(value) => setEditorValue(tab.id, value)}
                          theme={theme}
                          options={{
                            fontSize: 14,
                            minimap: { enabled: false },
                            scrollBeyondLastLine: false,
                            wordWrap: "on",
                            lineNumbers: "on",
                            folding: true,
                            automaticLayout: true,
                          }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Preview Panel */}
            <div className="card min-h-[600px] animate-slide-up" style={{ animationDelay: '0.2s' }}>
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <Eye className="h-5 w-5 text-zinc-600 dark:text-zinc-400" />
                  <h3 className="font-semibold text-zinc-900 dark:text-white">Live Preview</h3>
                </div>
                <div className="flex gap-2">
                  <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                  <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                  <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                </div>
              </div>
              
              <div className="h-[calc(100%-4rem)] border border-zinc-200 dark:border-zinc-700 rounded-xl overflow-hidden bg-white">
                <iframe
                  srcDoc={srcDoc}
                  title="Live Preview"
                  sandbox="allow-scripts"
                  frameBorder="0"
                  width="100%"
                  height="100%"
                  className="w-full h-full"
                />
              </div>
            </div>
          </div>

          {/* Tips Section */}
          <div className="mt-8 card bg-gradient-to-r from-orange-50 to-pink-50 dark:from-orange-950/20 dark:to-pink-950/20 border-orange-200 dark:border-orange-800 animate-slide-up" style={{ animationDelay: '0.4s' }}>
            <h3 className="font-semibold text-orange-900 dark:text-orange-100 mb-3 flex items-center gap-2">
              <span className="text-orange-500">💡</span>
              Quick Tips
            </h3>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 text-sm text-orange-800 dark:text-orange-200">
              <div>• Press <code className="bg-orange-100 dark:bg-orange-900 px-2 py-1 rounded">Ctrl+R</code> to run your code</div>
              <div>• Changes are automatically saved and preview updates in real-time</div>
              <div>• Use the download button to save your project as an HTML file</div>
            </div>
          </div>
        </div>
      </div>
    </PageWrapper>
  );
}
