import React from "react";
import { useEffect, useRef, useState } from "react";
import { useOutletContext } from "react-router-dom";
import {IoIosSend} from "react-icons/io";
import { getSiteConfig } from "../config/siteConfig.js";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

function Chat() {
  const config = getSiteConfig();
  const { current, updateCurrent } = useOutletContext();
  const [input, setInput] = useState("");
  const [isStreaming, setIsStreaming] = useState(false);
  const listRef = useRef(null);
  const nextMsgId = useRef(1);

  useEffect(() => {
    if (listRef.current) {
      listRef.current.scrollTop = listRef.current.scrollHeight;
    }
  }, [current?.messages]);

  const sendMessage = () => {
    if (!input.trim() || isStreaming) return;
    const user = { id: nextMsgId.current++, role: "user", content: input.trim() };
    const assistant = { id: nextMsgId.current++, role: "assistant", content: "" };
    updateCurrent((c) => ({
      ...c,
      title: c.title === "New chat" ? (user.content.length > 40 ? user.content.slice(0, 40) + "…" : user.content) : c.title,
      messages: [...c.messages, user, assistant],
    }));
    setInput("");
    streamReply(user.content, assistant.id);
  };

  const streamReply = (prompt, assistantId) => {
    setIsStreaming(true);
    const url = new URL(`${API_BASE_URL}/api/llama/stream`);
    url.searchParams.set("prompt", prompt);
    url.searchParams.set("sessionId", String(current.id));
    const es = new EventSource(url.toString());
    es.onmessage = (event) => {
      try {
        const { text } = JSON.parse(event.data);
        if (typeof text === "string") {
          updateCurrent((c) => ({
            ...c,
            messages: c.messages.map((m) => (m.id === assistantId ? { ...m, content: m.content + text } : m)),
          }));
        }
      } catch {
        void 0;
      }
    };
    es.addEventListener("done", () => {
      setIsStreaming(false);
      es.close();
    });
    es.onerror = () => {
      setIsStreaming(false);
      updateCurrent((c) => ({
        ...c,
        messages: c.messages.map((m) => (m.id === assistantId ? { ...m, content: m.content || "Connection failed. Is the backend running on port 5000?" } : m)),
      }));
      es.close();
    };
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  if (!current) return null;

  return (
    <div className="flex flex-col min-h-screen">
      {current.messages.length === 0 ? (
        <div className="flex-1 grid place-items-center px-6">
          <div className="w-full max-w-2xl">
            <div className="text-center mb-6">
              <div className="inline-flex items-center gap-2 text-lg font-semibold">
                <span className="h-5 w-5 rounded-full bg-blue-600 inline-block" />
                How can I help you?
              </div>
            </div>
            <div className="rounded-2xl bg-neutral-900 border border-neutral-800 shadow px-4 py-3">
              <textarea
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder={`Message ${config.siteName}`}
                rows={2}
                className="w-full resize-none rounded-xl bg-neutral-900 text-neutral-200 placeholder:text-neutral-500 focus:outline-none"
              />
              <div className="mt-3 flex items-center justify-between">
                <div className="flex gap-2">
                  {/* <button className="rounded-full bg-neutral-800 px-3 py-1 text-xs">DeepThink</button>
                  <button className="rounded-full bg-neutral-800 px-3 py-1 text-xs">Search</button> */}
                </div>
                <div className="flex items-center gap-3">
                  <button className="h-5 w-5 rounded-full bg-neutral-800" aria-label="attach" />
                    <button onClick={sendMessage} disabled={isStreaming || !input.trim()} className="h-8 w-8 flex items-center justify-center rounded-full bg-blue-600 disabled:opacity-50" aria-label="send" >
                        <IoIosSend />
                    </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <>
          <div ref={listRef} className="flex-1 overflow-y-auto px-6 py-6 space-y-4">
            {current.messages.map((m) => (
              <div key={m.id} className={`flex ${m.role === "user" ? "justify-end" : "justify-start"}`}>
                <div className={`max-w-[75%] rounded-2xl px-4 py-2 text-sm whitespace-pre-wrap break-words ${m.role === "user" ? "bg-blue-600 text-white" : "bg-neutral-800 text-neutral-200"}`}>
                  {m.content}
                </div>
              </div>
            ))}
          </div>
          <div className="border-t border-neutral-800 bg-neutral-900">
            <div className="max-w-3xl mx-auto px-4 py-3">
              <div className="flex items-end gap-2">
                <textarea
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={handleKeyDown}
                  placeholder="Message…"
                  rows={1}
                  className="flex-1 resize-none rounded-xl border border-neutral-800 bg-neutral-900 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <button onClick={sendMessage} disabled={isStreaming || !input.trim()} className="rounded-xl bg-blue-600 px-4 py-2 text-sm font-medium text-white disabled:opacity-50">Send</button>
              </div>
              <div className="mt-2 text-xs text-neutral-500">Press Enter to send, Shift+Enter for newline</div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default Chat;
