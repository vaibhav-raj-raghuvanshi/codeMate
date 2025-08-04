import Editor, { useMonaco } from "@monaco-editor/react";
import { useEffect } from "react";

export default function CodeEditor({ code, setCode, error }) {
  const monaco = useMonaco();

  useEffect(() => {
    if (!monaco || !error) return;

    const model = monaco.editor.getModels()[0];
    if (!model) return;

    monaco.editor.setModelMarkers(model, "owner", [
      {
        ...error,
        severity: monaco.MarkerSeverity.Error,
      },
    ]);
  }, [monaco, error]);

  return (
    <div className="h-[400px] border border-zinc-300 dark:border-zinc-700 rounded-lg overflow-hidden shadow-md">
      <Editor
        height="100%"
        theme="vs-dark"
        defaultLanguage="cpp"
        value={code}
        onChange={(value) => setCode(value || "")}
        options={{
          fontSize: 14,
          minimap: { enabled: false },
          scrollBeyondLastLine: false,
          automaticLayout: true,
          wordWrap: "on",
          suggestOnTriggerCharacters: true,
          autoClosingBrackets: "always",
          tabSize: 2,
          quickSuggestions: true,
        }}
      />
    </div>
  );
}
