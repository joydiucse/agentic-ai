import React from "react";
import { getSiteConfig } from "../../../config/siteConfig.js";

function Sidebar({ conversations, currentId, onSelect, onNew }) {
  const config = getSiteConfig();
  return (
    <aside className="w-72 shrink-0 bg-neutral-950 text-neutral-200 flex flex-col border-r border-neutral-800">
      <div className="px-4 py-4 flex items-center justify-between">
        <div className="flex items-center gap-1">
          <img src={config.logo} className="size-10 rounded-lg" />
          <div className="text-sm font-semibold tracking-wide">{config.siteCoName}</div>
        </div>
        <div className="h-8 w-8 rounded-md hover:bg-neutral-900 grid place-items-center" aria-label="collapse">⋯</div>
      </div>

      <div className="px-4 space-y-2">
        <button
          onClick={onNew}
          className="group w-full rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-sm px-4 py-2.5 flex items-center justify-center gap-2 text-white shadow ring-1 ring-inset ring-blue-400/30"
          title="Start a new conversation"
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" className="opacity-90">
            <path d="M12 5v14M5 12h14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
          </svg>
          New chat
        
        </button>
        <div className="text-[11px] text-neutral-400 text-center">Start a conversation</div>
      </div>

      <div className="px-4 pt-5 text-xs text-neutral-400">30 Days</div>
      <div className="flex-1 mt-2 overflow-y-auto px-4 pt-1 space-y-1">
        {conversations.map((c) => (
          <button
            key={c.id}
            onClick={() => onSelect(c.id)}
            className={`w-full text-left rounded-lg px-3 py-2 text-sm truncate transition flex items-center gap-2 ${c.id === currentId ? "bg-neutral-900 ring-1 ring-neutral-700" : "hover:bg-neutral-900"}`}
            title={c.title}
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" className="text-neutral-400">
              <path d="M4 6a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2H9l-4 3V6Z" stroke="currentColor" strokeWidth="1.5" />
            </svg>
            <span className="truncate">{c.title}</span>
          </button>
        ))}
      </div>
      <div className="px-4 py-4 border-t border-neutral-800 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="h-8 w-8 rounded-full bg-neutral-700 grid place-items-center text-[11px] font-medium">{config.brandInitials}</div>
          <div className="text-sm">{config.siteDetails}</div>
        </div>
        <div className="h-7 w-7 rounded-md hover:bg-neutral-900 grid place-items-center" aria-label="more">⚙</div>
      </div>
    </aside>
  );
}

export default Sidebar;
