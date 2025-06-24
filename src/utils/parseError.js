export function parseCompileError(errorText) {
  const lines = errorText.split("\n");
  const match = lines[0].match(/.*?:(\d+):(\d+)/); // Matches line and column like Main.cpp:5:10

  if (match) {
    const line = parseInt(match[1], 10);
    const column = parseInt(match[2], 10);

    return {
      startLineNumber: line,
      startColumn: column,
      endLineNumber: line,
      endColumn: column + 1,
      message: lines.slice(1).join("\n") || lines[0],
    };
  }

  // fallback
  return {
    startLineNumber: 1,
    startColumn: 1,
    endLineNumber: 1,
    endColumn: 1,
    message: errorText,
  };
}
