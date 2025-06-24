import Layout from "../components/Layout";
import CodeEditor from "../components/CodeEditor";
import InputOutputPanel from "../components/InputOutputPanel";
import RunButton from "../components/RunButton";
import { parseCompileError } from "../utils/parseError";
import { useState, useEffect } from "react";

// Language list
const languages = [
  { id: 76, name: "C++ (GCC 12)" },
  { id: 71, name: "Python (3.10)" },
  { id: 62, name: "Java (OpenJDK 17)" },
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
}`,
  71: `# Write your Python code here
def main():
    n = int(input())
    print(n)

main()`,
  62: `// Write your Java code here
public class Main {
    public static void main(String[] args) throws java.io.IOException {
        java.util.Scanner sc = new java.util.Scanner(System.in);
        int n = sc.nextInt();
        System.out.println(n);
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

  useEffect(() => {
    const stored = localStorage.getItem(`template-${selectedLang}`);
    setCode(stored || defaultTemplates[selectedLang]);
    setCompileError(null);
    setOutput("");
  }, [selectedLang]);

  const handleSaveTemplate = () => {
    localStorage.setItem(`template-${selectedLang}`, code);
    alert("Template saved for this language!");
  };

  const handleRun = async () => {
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
      } else if (result.stderr) {
        setOutput(`❌ Runtime Error:\n${result.stderr}`);
      } else if (result.stdout) {
        setOutput(`✅ Output:\n${result.stdout}`);
      } else {
        setOutput("⚠️ No output received.");
      }
    } catch (err) {
      setOutput(`🔥 Request Failed:\n${err.message}`);
    }

    setIsLoading(false);
  };

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-zinc-950 text-zinc-900 dark:text-white">
      <Layout>
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-4 gap-3">
          <h2 className="text-xl font-semibold">Code Editor</h2>

          <div className="flex items-center gap-3">
            <select
              className="p-2 rounded bg-white dark:bg-zinc-800 border border-zinc-300 dark:border-zinc-700"
              value={selectedLang}
              onChange={(e) => setSelectedLang(Number(e.target.value))}
            >
              {languages.map((lang) => (
                <option key={lang.id} value={lang.id}>
                  {lang.name}
                </option>
              ))}
            </select>

            <button
              onClick={handleSaveTemplate}
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md transition"
            >
              💾 Save Template
            </button>
          </div>
        </div>

        <CodeEditor code={code} setCode={setCode} error={compileError} />
        <RunButton onRun={handleRun} loading={isLoading} />
        <InputOutputPanel input={input} setInput={setInput} output={output} />
      </Layout>
    </div>
  );
}
