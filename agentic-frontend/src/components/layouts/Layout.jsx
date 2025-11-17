import React, { useRef, useState } from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "./sidebar/Sidebar.jsx";

function Layout() {
  const nextConvId = useRef(2);
  const [conversations, setConversations] = useState([
    { id: 1, title: "New chat", messages: [] },
  ]);
  const [currentId, setCurrentId] = useState(1);

  const updateCurrent = (updater) => {
    setConversations((prev) => prev.map((c) => (c.id === currentId ? updater(c) : c)));
  };

  const onNew = () => {
    const id = nextConvId.current++;
    setConversations((prev) => [{ id, title: "New chat", messages: [] }, ...prev]);
    setCurrentId(id);
  };

  const current = conversations.find((c) => c.id === currentId);

  return (
    <div className="min-h-screen bg-neutral-950 text-neutral-200 flex">
      <Sidebar conversations={conversations} currentId={currentId} onSelect={setCurrentId} onNew={onNew} />
      <div className="flex-1">
        <Outlet context={{ current, updateCurrent, onNew }} />
      </div>
    </div>
  );
}

export default Layout;
