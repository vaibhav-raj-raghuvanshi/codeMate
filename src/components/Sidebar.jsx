import { useState } from "react";
import { Play, FileText, Settings, ChevronLeft, ChevronRight, Zap, Code, Save, Upload, RotateCcw } from "lucide-react";

export default function Sidebar({ 
  onRun, 
  onSave, 
  onLoadTemplate, 
  onShowTemplates, 
  onShowSnippets, 
  onShowSettings,
  onReset,
  isLoading,
  selectedLang 
}) {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [showTemplateModal, setShowTemplateModal] = useState(false);
  const [showSnippetModal, setShowSnippetModal] = useState(false);
  const [showSettingsModal, setShowSettingsModal] = useState(false);

  const sidebarItems = [
    {
      icon: <Play className="h-5 w-5" />,
      label: "Run Code",
      action: () => onRun(),
      shortcut: "Ctrl+R",
      color: isLoading ? "text-orange-500" : "text-green-500",
      disabled: isLoading
    },
    {
      icon: <FileText className="h-5 w-5" />,
      label: "Templates",
      action: () => setShowTemplateModal(true),
      shortcut: "Ctrl+T",
      color: "text-blue-500"
    },
    {
      icon: <Save className="h-5 w-5" />,
      label: "Save Template",
      action: () => onSave(),
      shortcut: "Ctrl+S",
      color: "text-purple-500"
    },
    {
      icon: <Code className="h-5 w-5" />,
      label: "Snippets",
      action: () => setShowSnippetModal(true),
      shortcut: "Ctrl+Shift+S",
      color: "text-orange-500"
    },
    {
      icon: <Settings className="h-5 w-5" />,
      label: "Settings",
      action: () => setShowSettingsModal(true),
      shortcut: "Ctrl+,",
      color: "text-zinc-500"
    },
  ];

  const defaultTemplates = {
    76: `// C++ Competitive Programming Template
#include<bits/stdc++.h>
using namespace std;

int main(){
    ios_base::sync_with_stdio(false);
    cin.tie(NULL);
    
    int t;
    cin >> t;
    while(t--){
        // Your code here
        
    }
    return 0;
}`,
    71: `# Python Template
def solve():
    n = int(input())
    # Your code here
    print(n)

def main():
    t = int(input())
    for _ in range(t):
        solve()

if __name__ == "__main__":
    main()`,
    62: `// Java Template
import java.util.*;
import java.io.*;

public class Main {
    public static void main(String[] args) throws IOException {
        Scanner sc = new Scanner(System.in);
        int t = sc.nextInt();
        
        while(t-- > 0) {
            int n = sc.nextInt();
            // Your code here
            System.out.println(n);
        }
        sc.close();
    }
}`
  };

  const codeSnippets = {
    76: [
      { name: "Binary Search", code: `int binarySearch(vector<int>& arr, int target) {
    int left = 0, right = arr.size() - 1;
    while (left <= right) {
        int mid = left + (right - left) / 2;
        if (arr[mid] == target) return mid;
        if (arr[mid] < target) left = mid + 1;
        else right = mid - 1;
    }
    return -1;
}` },
      { name: "GCD Function", code: `int gcd(int a, int b) {
    if (b == 0) return a;
    return gcd(b, a % b);
}` },
      { name: "Fast Exponentiation", code: `long long power(long long base, long long exp, long long mod) {
    long long result = 1;
    while (exp > 0) {
        if (exp % 2 == 1) result = (result * base) % mod;
        base = (base * base) % mod;
        exp /= 2;
    }
    return result;
}` }
    ],
    71: [
      { name: "Binary Search", code: `def binary_search(arr, target):
    left, right = 0, len(arr) - 1
    while left <= right:
        mid = (left + right) // 2
        if arr[mid] == target:
            return mid
        elif arr[mid] < target:
            left = mid + 1
        else:
            right = mid - 1
    return -1` },
      { name: "GCD Function", code: `def gcd(a, b):
    while b:
        a, b = b, a % b
    return a` },
      { name: "Fast Input", code: `import sys
input = sys.stdin.readline

n = int(input())
arr = list(map(int, input().split()))` }
    ],
    62: [
      { name: "Binary Search", code: `public static int binarySearch(int[] arr, int target) {
    int left = 0, right = arr.length - 1;
    while (left <= right) {
        int mid = left + (right - left) / 2;
        if (arr[mid] == target) return mid;
        if (arr[mid] < target) left = mid + 1;
        else right = mid - 1;
    }
    return -1;
}` },
      { name: "GCD Function", code: `public static int gcd(int a, int b) {
    if (b == 0) return a;
    return gcd(b, a % b);
}` },
      { name: "Fast I/O", code: `BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
PrintWriter pw = new PrintWriter(System.out);
StringTokenizer st = new StringTokenizer(br.readLine());` }
    ]
  };

  const quickActions = [
    { label: "C++ Template", code: "cpp", langId: 76 },
    { label: "Python Template", code: "python", langId: 71 },
    { label: "Java Template", code: "java", langId: 62 },
  ];

  const handleTemplateLoad = (template) => {
    onLoadTemplate(template);
    setShowTemplateModal(false);
  };

  const handleSnippetInsert = (snippet) => {
    // This will be passed to parent to insert at cursor position
    onShowSnippets(snippet);
    setShowSnippetModal(false);
  };

  return (
    <>
      <aside className={`${isCollapsed ? 'w-16' : 'w-64'} transition-all duration-300 bg-white dark:bg-zinc-900 border-r border-zinc-200 dark:border-zinc-800 flex flex-col animate-slide-in-left`}>
        {/* Header */}
        <div className="p-4 border-b border-zinc-200 dark:border-zinc-800">
          <div className="flex items-center justify-between">
            {!isCollapsed && (
              <div className="flex items-center gap-2">
                <div className="p-2 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg">
                  <Zap className="h-4 w-4 text-white" />
                </div>
                <span className="font-semibold text-zinc-900 dark:text-white">Quick Actions</span>
              </div>
            )}
            <button
              onClick={() => setIsCollapsed(!isCollapsed)}
              className="btn-icon p-2 hover:bg-zinc-100 dark:hover:bg-zinc-800"
              aria-label={isCollapsed ? "Expand sidebar" : "Collapse sidebar"}
            >
              {isCollapsed ? <ChevronRight className="h-4 w-4" /> : <ChevronLeft className="h-4 w-4" />}
            </button>
          </div>
        </div>

        {/* Main Actions */}
        <div className="flex-1 p-4 space-y-2">
          {sidebarItems.map((item, index) => (
            <button
              key={index}
              onClick={item.action}
              disabled={item.disabled}
              className={`sidebar-item group relative ${isCollapsed ? 'px-3 py-3' : 'px-4 py-3'} flex items-center gap-3 w-full focus-ring ${item.disabled ? 'opacity-50 cursor-not-allowed' : ''}`}
              title={isCollapsed ? item.label : ''}
            >
              <span className={item.color}>{item.icon}</span>
              {!isCollapsed && (
                <>
                  <span className="flex-1 text-left font-medium text-zinc-900 dark:text-white">
                    {item.label}
                  </span>
                  <span className="text-xs text-zinc-500 dark:text-zinc-400 bg-zinc-100 dark:bg-zinc-800 px-2 py-1 rounded-md">
                    {item.shortcut}
                  </span>
                </>
              )}
              
              {/* Tooltip for collapsed state */}
              {isCollapsed && (
                <div className="absolute left-full ml-2 px-2 py-1 bg-zinc-900 dark:bg-zinc-100 text-white dark:text-zinc-900 text-sm rounded-md opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-50">
                  {item.label}
                  <div className="absolute left-0 top-1/2 transform -translate-y-1/2 -translate-x-1 w-2 h-2 bg-zinc-900 dark:bg-zinc-100 rotate-45"></div>
                </div>
              )}
            </button>
          ))}

          {/* Reset Button */}
          <button
            onClick={onReset}
            className={`sidebar-item group relative ${isCollapsed ? 'px-3 py-3' : 'px-4 py-3'} flex items-center gap-3 w-full focus-ring`}
            title={isCollapsed ? "Reset Code" : ''}
          >
            <span className="text-red-500"><RotateCcw className="h-5 w-5" /></span>
            {!isCollapsed && (
              <>
                <span className="flex-1 text-left font-medium text-zinc-900 dark:text-white">
                  Reset Code
                </span>
                <span className="text-xs text-zinc-500 dark:text-zinc-400 bg-zinc-100 dark:bg-zinc-800 px-2 py-1 rounded-md">
                  Ctrl+Alt+R
                </span>
              </>
            )}
          </button>
        </div>

        {/* Quick Templates */}
        {!isCollapsed && (
          <div className="p-4 border-t border-zinc-200 dark:border-zinc-800">
            <h3 className="text-sm font-semibold text-zinc-600 dark:text-zinc-400 mb-3 uppercase tracking-wide">
              Quick Templates
            </h3>
            <div className="space-y-2">
              {quickActions.map((action, index) => (
                <button
                  key={index}
                  onClick={() => handleTemplateLoad(defaultTemplates[action.langId])}
                  className="w-full text-left px-3 py-2 text-sm rounded-lg bg-zinc-50 dark:bg-zinc-800 hover:bg-zinc-100 dark:hover:bg-zinc-700 transition-all duration-300 transform hover:scale-105 text-zinc-700 dark:text-zinc-300 focus-ring"
                >
                  {action.label}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Footer */}
        <div className={`p-4 border-t border-zinc-200 dark:border-zinc-800 ${isCollapsed ? 'text-center' : ''}`}>
          {isCollapsed ? (
            <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full mx-auto"></div>
          ) : (
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full"></div>
              <div className="flex-1">
                <div className="text-sm font-medium text-zinc-900 dark:text-white">Workspace</div>
                <div className="text-xs text-zinc-500 dark:text-zinc-400">Ready to code</div>
              </div>
            </div>
          )}
        </div>
      </aside>

      {/* Templates Modal */}
      {showTemplateModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50" onClick={() => setShowTemplateModal(false)}>
          <div className="bg-white dark:bg-zinc-900 rounded-2xl p-6 max-w-2xl w-full mx-4 max-h-[80vh] overflow-y-auto" onClick={e => e.stopPropagation()}>
            <h3 className="text-xl font-bold text-zinc-900 dark:text-white mb-4">Code Templates</h3>
            <div className="grid gap-4">
              {Object.entries(defaultTemplates).map(([langId, template]) => {
                const lang = langId === '76' ? 'C++' : langId === '71' ? 'Python' : 'Java';
                return (
                  <div key={langId} className="border border-zinc-200 dark:border-zinc-700 rounded-xl p-4">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-semibold text-zinc-900 dark:text-white">{lang} Template</h4>
                      <button
                        onClick={() => handleTemplateLoad(template)}
                        className="btn-primary text-sm px-4 py-2"
                      >
                        Load Template
                      </button>
                    </div>
                    <pre className="text-xs bg-zinc-100 dark:bg-zinc-800 p-3 rounded-lg overflow-x-auto">
                      {template.substring(0, 200)}...
                    </pre>
                  </div>
                );
              })}
            </div>
            <button
              onClick={() => setShowTemplateModal(false)}
              className="btn-secondary mt-4 w-full"
            >
              Close
            </button>
          </div>
        </div>
      )}

      {/* Snippets Modal */}
      {showSnippetModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50" onClick={() => setShowSnippetModal(false)}>
          <div className="bg-white dark:bg-zinc-900 rounded-2xl p-6 max-w-4xl w-full mx-4 max-h-[80vh] overflow-y-auto" onClick={e => e.stopPropagation()}>
            <h3 className="text-xl font-bold text-zinc-900 dark:text-white mb-4">Code Snippets</h3>
            <div className="grid gap-4">
              {codeSnippets[selectedLang]?.map((snippet, index) => (
                <div key={index} className="border border-zinc-200 dark:border-zinc-700 rounded-xl p-4">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-semibold text-zinc-900 dark:text-white">{snippet.name}</h4>
                    <button
                      onClick={() => handleSnippetInsert(snippet.code)}
                      className="btn-primary text-sm px-4 py-2"
                    >
                      Insert Snippet
                    </button>
                  </div>
                  <pre className="text-xs bg-zinc-100 dark:bg-zinc-800 p-3 rounded-lg overflow-x-auto">
                    {snippet.code}
                  </pre>
                </div>
              )) || (
                <p className="text-zinc-500 dark:text-zinc-400 text-center py-8">
                  No snippets available for the selected language.
                </p>
              )}
            </div>
            <button
              onClick={() => setShowSnippetModal(false)}
              className="btn-secondary mt-4 w-full"
            >
              Close
            </button>
          </div>
        </div>
      )}

      {/* Settings Modal */}
      {showSettingsModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50" onClick={() => setShowSettingsModal(false)}>
          <div className="bg-white dark:bg-zinc-900 rounded-2xl p-6 max-w-lg w-full mx-4" onClick={e => e.stopPropagation()}>
            <h3 className="text-xl font-bold text-zinc-900 dark:text-white mb-4">Editor Settings</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-2">
                  Font Size
                </label>
                <select className="select-field w-full">
                  <option>12px</option>
                  <option>14px</option>
                  <option>16px</option>
                  <option>18px</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-2">
                  Tab Size
                </label>
                <select className="select-field w-full">
                  <option>2 spaces</option>
                  <option>4 spaces</option>
                  <option>8 spaces</option>
                </select>
              </div>
              <div className="flex items-center gap-3">
                <input type="checkbox" id="wordWrap" className="rounded" />
                <label htmlFor="wordWrap" className="text-sm text-zinc-700 dark:text-zinc-300">
                  Enable word wrap
                </label>
              </div>
              <div className="flex items-center gap-3">
                <input type="checkbox" id="autoSave" className="rounded" />
                <label htmlFor="autoSave" className="text-sm text-zinc-700 dark:text-zinc-300">
                  Auto-save templates
                </label>
              </div>
            </div>
            <div className="flex gap-3 mt-6">
              <button
                onClick={() => setShowSettingsModal(false)}
                className="btn-primary flex-1"
              >
                Save Settings
              </button>
              <button
                onClick={() => setShowSettingsModal(false)}
                className="btn-secondary flex-1"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
