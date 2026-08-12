import Sidebar from "@/components/sidebar";
import React from "react";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="h-full min-h-0 flex">
      <aside className="w-64 shrink-0 border-r overflow-y-auto">
        <Sidebar />
      </aside>

      <main className="min-w-0 flex-1 overflow-x-auto overflow-y-auto">
        {children}
      </main>
    </div>
  );
}
