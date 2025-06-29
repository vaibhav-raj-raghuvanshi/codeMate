import Sidebar from "./Sidebar";

export default function Layout({ children }) {
  return (
    <div className="flex flex-col md:flex-row min-h-[calc(100vh-64px)]">
      <Sidebar />
      <main className="flex-1 p-4 bg-gray-50 dark:bg-zinc-950 overflow-auto">
        {children}
      </main>
    </div>
  );
}
