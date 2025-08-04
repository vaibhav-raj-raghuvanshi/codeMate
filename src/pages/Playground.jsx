import Layout from "../components/Layout";
import CodeEditor from "../components/CodeEditor";
import InputOutputPanel from "../components/InputOutputPanel";
import RunButton from "../components/RunButton";
import { parseCompileError } from "../utils/parseError";
import { useState, useEffect, useCallback } from "react";
import { Play, Save, Download, Upload, Settings, Code, Terminal, FileUp } from "lucide-react";

// Language list
const languages = [
  { id: 76, name: "C++ (GCC 12)", icon: "🔥", color: "from-red-500 to-orange-500" },
  { id: 71, name: "Python (3.10)", icon: "🐍", color: "from-blue-500 to-green-500" },
  { id: 62, name: "Java (OpenJDK 17)", icon: "☕", color: "from-orange-500 to-red-500" },
];

// Default templates
const defaultTemplates = {
  76: `// Write your C++ code here
#include<bits/stdc++.h>
using namespace std;
int main(){
    int t;
    cin>>t;
    while(t--){
        
    }
    return 0;
}`,
  71: `# Write your Python code here
def main():
    n = int(input())
    print(n)

if __name__ == "__main__":
    main()`,
  62: `// Write your Java code here
import java.util.*;

public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        int n = sc.nextInt();
        System.out.println(n);
        sc.close();
    }
}`,
};

export default function Playground() {
  const [code, setCode] = useState("");
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [selectedLang, setSelectedLang] = useState(76);
  const [isLoading, setIsLoading] = useState(false);
  const [compileError, setCompileError] = useState(null);
  const [isFullscreen, setIsFullscreen] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem(`template-${selectedLang}`);
    setCode(stored || defaultTemplates[selectedLang]);
    setCompileError(null);
    setOutput("");
  }, [selectedLang]);

  const showNotification = useCallback((message, type = 'success') => {
    const notification = document.createElement('div');
    const bgColor = type === 'success' ? 'bg-green-500' : type === 'error' ? 'bg-red-500' : 'bg-blue-500';
    notification.className = `fixed top-20 right-4 ${bgColor} text-white px-6 py-3 rounded-xl shadow-lg z-50 animate-slide-up`;
    notification.textContent = message;
    document.body.appendChild(notification);
    setTimeout(() => notification.remove(), 3000);
  }, []);

  const handleSaveTemplate = useCallback(() => {
    localStorage.setItem(`template-${selectedLang}`, code);
    showNotification('Template saved successfully!');
  }, [code, selectedLang, showNotification]);

  const handleLoadTemplate = useCallback((template) => {
    setCode(template);
    showNotification('Template loaded successfully!');
  }, [showNotification]);

  const handleSnippetInsert = useCallback((snippet) => {
    // Insert snippet at the end of current code
    setCode(prevCode => prevCode + '\n\n' + snippet);
    showNotification('Snippet inserted!');
  }, [showNotification]);

  const handleReset = useCallback(() => {
    if (window.confirm('Are you sure you want to reset the code? All unsaved changes will be lost.')) {
      setCode(defaultTemplates[selectedLang]);
      setInput("");
      setOutput("");
      setCompileError(null);
      showNotification('Code reset to default template!', 'info');
    }
  }, [selectedLang, showNotification]);

  const handleDownloadCode = useCallback(() => {
    const selectedLanguage = languages.find(lang => lang.id === selectedLang);
    const extension = selectedLang === 76 ? 'cpp' : selectedLang === 71 ? 'py' : 'java';
    const blob = new Blob([code], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `code.${extension}`;
    a.click();
    URL.revokeObjectURL(url);
    showNotification('Code downloaded successfully!');
  }, [code, selectedLang, showNotification]);

  const handleUploadCode = useCallback(() => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = '.cpp,.py,.java,.c,.js,.txt';
    input.onchange = (e) => {
      const file = e.target.files[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = (e) => {
          setCode(e.target.result);
          showNotification(`File "${file.name}" uploaded successfully!`);
        };
        reader.readAsText(file);
      }
    };
    input.click();
  }, [showNotification]);

  const handleRun = useCallback(async () => {
    setIsLoading(true);
    setOutput("⏳ Compiling & Running...");
    setCompileError(null);

    const submission = {
      source_code: code,
      language_id: selectedLang,
      stdin: input,
    };

    try {
      const response = await fetch("https://judge0-ce.p.rapidapi.com/submissions?base64_encoded=false&wait=true", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-RapidAPI-Host": "judge0-ce.p.rapidapi.com",
          "X-RapidAPI-Key": "7d6560e36cmshf42d46bdf3cbc95p10a510jsn289ed29d598c",
        },
        body: JSON.stringify(submission),
      });

      const result = await response.json();

      if (result.compile_output) {
        const marker = parseCompileError(result.compile_output);
        setCompileError(marker);
        setOutput(`❌ Compilation Error:\n${result.compile_output}`);
        showNotification('Compilation failed!', 'error');
      } else if (result.stderr) {
        setOutput(`❌ Runtime Error:\n${result.stderr}`);
        showNotification('Runtime error occurred!', 'error');
      } else if (result.stdout) {
        setOutput(`✅ Output:\n${result.stdout}`);
        showNotification('Code executed successfully!');
      } else {
        setOutput("⚠️ No output received.");
        showNotification('No output received', 'info');
      }
    } catch (err) {
      setOutput(`🔥 Request Failed:\n${err.message}`);
      showNotification('Request failed!', 'error');
    }

    setIsLoading(false);
  }, [code, input, selectedLang, showNotification]);

  // Keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (e) => {
      const isMac = navigator.platform.toUpperCase().indexOf("MAC") >= 0;
      const ctrlKey = isMac ? e.metaKey : e.ctrlKey;

      if (ctrlKey && e.key === 's') {
        e.preventDefault();
        handleSaveTemplate();
      } else if (ctrlKey && e.key === 'r') {
        e.preventDefault();
        handleRun();
      } else if (ctrlKey && e.altKey && e.key === 'r') {
        e.preventDefault();
        handleReset();
      } else if (ctrlKey && e.key === 'o') {
        e.preventDefault();
        handleUploadCode();
      } else if (ctrlKey && e.key === 'd') {
        e.preventDefault();
        handleDownloadCode();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [handleSaveTemplate, handleRun, handleReset, handleUploadCode, handleDownloadCode]);

  const selectedLanguage = languages.find(lang => lang.id === selectedLang);

  return (
    <div className="min-h-screen bg-gradient-to-br from-zinc-50 to-zinc-100 dark:from-zinc-950 dark:to-zinc-900">
      <Layout 
        sidebarProps={{
          onRun: handleRun,
          onSave: handleSaveTemplate,
          onLoadTemplate: handleLoadTemplate,
          onShowSnippets: handleSnippetInsert,
          onReset: handleReset,
          isLoading,
          selectedLang
        }}
      >
        <div className="space-y-6">
          {/* Header */}
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 animate-fade-in">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl">
                <Code className="h-6 w-6 text-white" />
              </div>
              <div>
                <h1 className="text-2xl lg:text-3xl font-bold text-zinc-900 dark:text-white">
                  Code Playground
                </h1>
                <p className="text-zinc-600 dark:text-zinc-400">
                  Write, run, and debug your code with our powerful online IDE
                </p>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-3">
              {/* Language Selector */}
              <div className="relative">
                <select
                  className="select-field pr-12 focus-ring appearance-none cursor-pointer"
                  value={selectedLang}
                  onChange={(e) => setSelectedLang(Number(e.target.value))}
                >
                  {languages.map((lang) => (
                    <option key={lang.id} value={lang.id}>
                      {lang.icon} {lang.name}
                    </option>
                  ))}
                </select>
                <div className="absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none">
                  <div className="w-2 h-2 border-r-2 border-b-2 border-zinc-500 transform rotate-45"></div>
                </div>
              </div>

              {/* Action Buttons */}
              <button
                onClick={handleUploadCode}
                className="btn-secondary flex items-center gap-2 focus-ring"
                title="Upload Code File (Ctrl+O)"
              >
                <FileUp className="h-4 w-4" />
                <span className="hidden sm:inline">Upload</span>
              </button>

              <button
                onClick={handleSaveTemplate}
                className="btn-secondary flex items-center gap-2 focus-ring"
                title="Save Template (Ctrl+S)"
              >
                <Save className="h-4 w-4" />
                <span className="hidden sm:inline">Save</span>
              </button>

              <button
                onClick={handleDownloadCode}
                className="btn-secondary flex items-center gap-2 focus-ring"
                title="Download Code (Ctrl+D)"
              >
                <Download className="h-4 w-4" />
                <span className="hidden sm:inline">Download</span>
              </button>

              <button
                onClick={() => setIsFullscreen(!isFullscreen)}
                className="btn-secondary flex items-center gap-2 focus-ring"
                title="Toggle Settings"
              >
                <Settings className="h-4 w-4" />
                <span className="hidden sm:inline">View</span>
              </button>
            </div>
          </div>

          {/* Language Badge */}
          <div className="animate-slide-up">
            <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-xl text-white font-medium bg-gradient-to-r ${selectedLanguage?.color}`}>
              <span className="text-lg">{selectedLanguage?.icon}</span>
              <span>Currently editing: {selectedLanguage?.name}</span>
            </div>
          </div>

          {/* Main Content Grid */}
          <div className="grid lg:grid-cols-2 gap-6 animate-slide-up" style={{ animationDelay: '0.2s' }}>
            {/* Code Editor Panel */}
            <div className="card min-h-[500px]">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <Terminal className="h-5 w-5 text-zinc-600 dark:text-zinc-400" />
                  <h3 className="font-semibold text-zinc-900 dark:text-white">Code Editor</h3>
                </div>
                <div className="flex gap-2">
                  <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                  <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                  <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                </div>
              </div>
              <div className="h-96 rounded-xl overflow-hidden border border-zinc-200 dark:border-zinc-700">
                <CodeEditor code={code} setCode={setCode} error={compileError} />
              </div>
            </div>

            {/* Input/Output Panel */}
            <div className="space-y-6">
              {/* Run Button */}
              <div className="card">
                <RunButton onRun={handleRun} loading={isLoading} />
              </div>

              {/* Input/Output */}
              <div className="card">
                <InputOutputPanel input={input} setInput={setInput} output={output} />
              </div>
            </div>
          </div>

          {/* Tips Section */}
          <div className="card bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-950/20 dark:to-purple-950/20 border-blue-200 dark:border-blue-800 animate-slide-up" style={{ animationDelay: '0.4s' }}>
            <h3 className="font-semibold text-blue-900 dark:text-blue-100 mb-3 flex items-center gap-2">
              <span className="text-blue-500">💡</span>
              Keyboard Shortcuts
            </h3>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 text-sm text-blue-800 dark:text-blue-200">
              <div>• <code className="bg-blue-100 dark:bg-blue-900 px-2 py-1 rounded">Ctrl+S</code> Save template</div>
              <div>• <code className="bg-blue-100 dark:bg-blue-900 px-2 py-1 rounded">Ctrl+R</code> Run code</div>
              <div>• <code className="bg-blue-100 dark:bg-blue-900 px-2 py-1 rounded">Ctrl+O</code> Upload file</div>
              <div>• <code className="bg-blue-100 dark:bg-blue-900 px-2 py-1 rounded">Ctrl+D</code> Download code</div>
              <div>• <code className="bg-blue-100 dark:bg-blue-900 px-2 py-1 rounded">Ctrl+Alt+R</code> Reset code</div>
              <div>• Use sidebar for templates & snippets</div>
            </div>
          </div>
        </div>
      </Layout>
    </div>
  );
}
