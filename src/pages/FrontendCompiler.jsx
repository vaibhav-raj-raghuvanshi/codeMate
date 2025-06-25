import { useState, useEffect } from "react";
import Editor from "@monaco-editor/react";

export default function FrontendCompiler() {
  const [html, setHtml] = useState("<h1>Hello, World!</h1>");
  const [css, setCss] = useState("body { background: #f0f0f0; }");
  const [js, setJs] = useState("console.log('Hello from JS');");
  const [srcDoc, setSrcDoc] = useState("");

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

  // Auto-run on Ctrl+S or Cmd+S
  useEffect(() => {
    const handleKeyDown = (e) => {
      const isMac = navigator.platform.toUpperCase().indexOf("MAC") >= 0;
      const isSaveShortcut =
        (isMac && e.metaKey && e.key === "s") || (!isMac && e.ctrlKey && e.key === "s");

      if (isSaveShortcut) {
        e.preventDefault();
        handleRun();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [html, css, js]);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 p-4 min-h-screen bg-background">
      <div className="space-y-4">
        <div>
          <label className="text-sm font-semibold mb-1 block">HTML</label>
          <Editor
            height="150px"
            defaultLanguage="html"
            value={html}
            onChange={(value) => setHtml(value || "")}
            theme="vs-dark"
            options={{ fontSize: 14 }}
          />
        </div>

        <div>
          <label className="text-sm font-semibold mb-1 block">CSS</label>
          <Editor
            height="150px"
            defaultLanguage="css"
            value={css}
            onChange={(value) => setCss(value || "")}
            theme="vs-dark"
            options={{ fontSize: 14 }}
          />
        </div>

        <div>
          <label className="text-sm font-semibold mb-1 block">JavaScript</label>
          <Editor
            height="150px"
            defaultLanguage="javascript"
            value={js}
            onChange={(value) => setJs(value || "")}
            theme="vs-dark"
            options={{ fontSize: 14 }}
          />
        </div>

        <button
          onClick={handleRun}
          className="bg-primary text-white px-4 py-2 rounded mt-2"
        >
          ▶ Run
        </button>
      </div>

      <div className="border shadow rounded overflow-hidden h-full">
        <iframe
          srcDoc={srcDoc}
          title="Live Preview"
          sandbox="allow-scripts"
          frameBorder="0"
          width="100%"
          height="100%"
        />
      </div>
    </div>
  );
}
