import React from "react";
import { getSiteConfig } from "../../../config/siteConfig.js";

function Sidebar({ conversations, currentId, onSelect, onNew }) {
  const config = getSiteConfig();
  return (
    <aside className="w-72 shrink-0 bg-neutral-950 text-neutral-200 flex flex-col border-r border-neutral-800">
      <div className="px-4 py-4 flex items-center justify-between">
        <div className="flex items-center gap-1">
          <img src={config.logo} className="size-10 rounded-lg" />
          <div className="text-sm font-semibold tracking-wide">{config.siteName}</div>
        </div>
        <div className="h-8 w-8 rounded-md hover:bg-neutral-900 grid place-items-center" aria-label="collapse">⋯</div>
      </div>

      <div className="px-4">
        <button onClick={onNew} className="w-full rounded-xl bg-gradient-to-r from-neutral-900 to-neutral-800 hover:from-neutral-800 hover:to-neutral-700 text-sm px-4 py-2.5 flex items-center justify-center gap-2 shadow">
          <span className="h-4 w-4 rounded-full bg-neutral-700" />
          New chat
        </button>
      </div>

      <div className="px-4 pt-5 text-xs text-neutral-400">30 Days</div>
      <div className="flex-1 mt-2 overflow-y-auto px-4 space-y-1">
        {conversations.map((c) => (
          <button
            key={c.id}
            onClick={() => onSelect(c.id)}
            className={`w-full text-left rounded-lg px-3 py-2 text-sm truncate transition ${c.id === currentId ? "bg-neutral-900 ring-1 ring-neutral-700" : "hover:bg-neutral-900"}`}
            title={c.title}
          >
            {c.title}
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
