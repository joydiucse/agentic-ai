import React from "react";

function Sidebar({ conversations, currentId, onSelect, onNew }) {
  return (
    <aside className="w-64 shrink-0 bg-neutral-900 border-r border-neutral-800 text-neutral-200 flex flex-col">
      <div className="px-3 py-3 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="h-6 w-6 rounded-full bg-blue-600" />
          <div className="font-semibold">Joy-GPT</div>
        </div>
        <button className="h-8 w-8 rounded-md hover:bg-neutral-800" aria-label="collapse" />
      </div>
      <div className="px-3">
        <button onClick={onNew} className="w-full rounded-xl bg-neutral-800 hover:bg-neutral-700 text-sm px-3 py-2 flex items-center justify-center gap-2">
          <span className="h-4 w-4 rounded-full bg-neutral-700" />
          New chat
        </button>
      </div>
      <div className="px-3 pt-4 text-xs text-neutral-400">30 Days</div>
      <div className="flex-1 mt-2 overflow-y-auto px-3 space-y-1">
        {conversations.map((c) => (
          <button
            key={c.id}
            onClick={() => onSelect(c.id)}
            className={`w-full text-left rounded-lg px-3 py-2 text-sm truncate ${c.id === currentId ? "bg-neutral-800" : "hover:bg-neutral-800"}`}
            title={c.title}
          >
            {c.title}
          </button>
        ))}
      </div>
      <div className="px-3 py-3 border-t border-neutral-800 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="h-7 w-7 rounded-full bg-neutral-700 grid place-items-center text-[10px]">JA</div>
          <div className="text-sm">Joynal Abedin</div>
        </div>
        <button className="h-6 w-6 rounded-md hover:bg-neutral-800" aria-label="more" />
      </div>
    </aside>
  );
}

export default Sidebar;
