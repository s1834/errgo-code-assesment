import { useEffect, useRef, useState } from "react";
import { Send } from "lucide-react";

export default function Chat() {
  const [messages, setMessages] = useState<string[]>([]);
  const [input, setInput] = useState("");
  const [isConnected, setIsConnected] = useState(false);
  const ws = useRef<WebSocket | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const messagesContainerRef = useRef<HTMLDivElement>(null);

  // Scroll to bottom when new messages are added, only if near bottom
  useEffect(() => {
    const container = messagesContainerRef.current;
    if (container) {
      const isNearBottom =
        container.scrollHeight - container.scrollTop <=
        container.clientHeight + 50;
      if (isNearBottom) {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
      }
    }
  }, [messages]);

  // WebSocket connection handling
  useEffect(() => {
    ws.current = new WebSocket("ws://localhost:3000");

    ws.current.onopen = () => {
      setIsConnected(true);
    };

    ws.current.onmessage = (event) => {
      try {
        const data = JSON.parse(event.data);
        if (data.type === "history") {
          setMessages(data.messages);
        } else if (data.type === "new_message") {
          setMessages((prev) => [...prev, data.message]);
        }
      } catch (error) {
        console.error("Error parsing WebSocket message:", error);
      }
    };

    ws.current.onerror = () => {
      setIsConnected(false);
    };

    ws.current.onclose = () => {
      setIsConnected(false);
    };

    return () => {
      ws.current?.close();
    };
  }, []);

  const sendMessage = () => {
    if (
      input.trim() &&
      ws.current &&
      ws.current.readyState === ws.current.OPEN
    ) {
      ws.current.send(input);
      setInput("");
    }
  };

  return (
    <div className="flex-1 flex flex-col overflow-auto bg-gray-50 min-h-screen">
      {/* Centered Content Container */}
      <div className="flex-1 flex flex-col items-center justify-center p-4">
        <div className="max-w-xl w-full">
          <div className="text-center mb-6">
            <h1 className="text-2xl font-semibold text-gray-800">Live Chat</h1>
            <p className="text-sm text-gray-500">
              {isConnected ? `${messages.length} messages` : "Connecting..."}
            </p>
          </div>

          {/* Messages Container */}
          <div
            ref={messagesContainerRef}
            className="bg-gray-100 rounded-md p-4 h-96 overflow-y-auto mb-4 shadow-sm"
            role="log"
            aria-live="polite"
          >
            {messages.length === 0 && (
              <div className="text-center text-gray-500 text-sm">
                No messages yet. Start chatting!
              </div>
            )}
            {messages.map((msg, idx) => (
              <div
                key={idx}
                className={`mb-2 p-2 rounded-md text-gray-700 transition-opacity duration-300 ${
                  idx % 2 === 0 ? "bg-white" : "bg-gray-200"
                }`}
              >
                {msg}
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>

          {/* Input Container */}
          <div className="flex w-full">
            <input
              className="flex-1 p-3 rounded-l-md bg-gray-100 text-gray-700 focus:outline-none focus:ring-2 focus:ring-purple-500"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") sendMessage();
              }}
              placeholder="Type your message..."
              disabled={!isConnected}
              aria-label="Chat message input"
            />
            <button
              className="bg-purple-500 text-white px-4 py-3 rounded-r-md hover:bg-purple-600 transition-colors flex items-center disabled:bg-gray-400"
              onClick={sendMessage}
              disabled={!isConnected}
              aria-label="Send message"
            >
              <Send className="h-5 w-5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
