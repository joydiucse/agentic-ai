import { useEffect, useRef, useState } from "react";

function App() {
  const [messages, setMessages] = useState([
    { id: 1, role: "assistant", content: "Hi! Ask me anything." },
  ]);
  const [input, setInput] = useState("");
  const [isStreaming, setIsStreaming] = useState(false);
  const listRef = useRef(null);
  const nextId = useRef(2);

  useEffect(() => {
    if (listRef.current) {
      listRef.current.scrollTop = listRef.current.scrollHeight;
    }
  }, [messages]);

  const sendMessage = () => {
    if (!input.trim() || isStreaming) return;

    const userMsg = { id: nextId.current++, role: "user", content: input.trim() };
    const assistantMsg = { id: nextId.current++, role: "assistant", content: "" };
    setMessages((prev) => [...prev, userMsg, assistantMsg]);
    setInput("");
    streamReply(userMsg.content, assistantMsg.id);
  };

  const streamReply = (prompt, assistantId) => {
    setIsStreaming(true);
    const url = new URL("http://localhost:5000/api/llama/stream");
    url.searchParams.set("prompt", prompt);

    const es = new EventSource(url.toString());

    es.onmessage = (event) => {
      try {
        const { text } = JSON.parse(event.data);
        if (typeof text === "string") {
          setMessages((prev) =>
            prev.map((m) =>
              m.id === assistantId ? { ...m, content: m.content + text } : m
            )
          );
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
      setMessages((prev) =>
        prev.map((m) =>
          m.id === assistantId ? { ...m, content: m.content || "Connection failed. Is the backend running on port 5000?" } : m
        )
      );
      es.close();
    };
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <header className="border-b bg-white">
        <div className="mx-auto max-w-3xl px-4 py-3 flex items-center justify-between">
          <div className="font-semibold">Chatbot</div>
          <div className="text-sm text-gray-500">{isStreaming ? "Streaming…" : "Ready"}</div>
        </div>
      </header>

      <main className="flex-1">
        <div ref={listRef} className="mx-auto max-w-3xl px-4 py-6 space-y-4 overflow-y-auto" style={{ minHeight: "65vh" }}>
          {messages.map((m) => (
            <div key={m.id} className={`flex ${m.role === "user" ? "justify-end" : "justify-start"}`}>
              <div className={`max-w-[80%] rounded-2xl px-4 py-2 text-sm whitespace-pre-wrap break-words ${m.role === "user" ? "bg-blue-600 text-white" : "bg-gray-200 text-gray-900"}`}>
                {m.content || (isStreaming && m.role === "assistant" ? "" : "")}
              </div>
            </div>
          ))}
        </div>
      </main>

      <footer className="sticky bottom-0 border-t bg-white">
        <div className="mx-auto max-w-3xl px-4 py-3">
          <div className="flex items-end gap-2">
            <textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Message…"
              rows={1}
              className="flex-1 resize-none rounded-xl border border-gray-300 bg-white px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button
              onClick={sendMessage}
              disabled={isStreaming}
              className="rounded-xl bg-blue-600 px-4 py-2 text-sm font-medium text-white disabled:opacity-50"
            >
              Send
            </button>
          </div>
          <div className="mt-2 text-xs text-gray-500">Press Enter to send, Shift+Enter for newline</div>
        </div>
      </footer>
    </div>
  );
}

export default App;
