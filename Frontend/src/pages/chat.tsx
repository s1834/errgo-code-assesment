import { useEffect, useRef, useState } from "react";
import { Send, Smile } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function Chat() {
  const [messages, setMessages] = useState<string[]>([]);
  const [input, setInput] = useState("");
  const [isConnected, setIsConnected] = useState(false);
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const ws = useRef<WebSocket | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const messagesContainerRef = useRef<HTMLDivElement>(null);

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
      setShowEmojiPicker(false);
    }
  };

  const addEmoji = (emoji: string) => {
    setInput((prev) => prev + emoji);
  };

  return (
    <div className="flex flex-col w-screen h-screen bg-gray-100">
      <div className="flex items-center justify-between bg-purple-600 text-white p-4 shadow-md">
        <h1 className="text-xl font-semibold">Live Chat</h1>
        <span className="text-sm flex items-center gap-2">
          <span
            className={`w-2 h-2 rounded-full ${
              isConnected ? "bg-green-400" : "bg-red-400"
            }`}
          />
          {isConnected ? "Online" : "Offline"}
        </span>
      </div>

      <div
        ref={messagesContainerRef}
        className="flex-1 bg-white p-6 overflow-y-auto"
        role="log"
        aria-live="polite"
      >
        {messages.length === 0 && (
          <div className="text-center text-gray-500 text-sm mt-20">
            No messages yet. Start the conversation!
          </div>
        )}
        <AnimatePresence>
          {messages.map((msg, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className={`flex mb-4 ${
                idx % 2 === 0 ? "justify-end" : "justify-start"
              }`}
              aria-label={`Message ${idx + 1}: ${msg}`}
            >
              <div
                className={`flex items-end max-w-[70%] ${
                  idx % 2 === 0 ? "flex-row-reverse" : ""
                }`}
              >
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center text-white text-sm font-semibold ${
                    idx % 2 === 0 ? "bg-purple-500" : "bg-gray-500"
                  }`}
                >
                  {idx % 2 === 0 ? "U" : "O"}
                </div>
                <div
                  className={`p-3 rounded-lg shadow-sm mx-3 ${
                    idx % 2 === 0
                      ? "bg-purple-100 text-gray-800"
                      : "bg-gray-200 text-gray-700"
                  }`}
                >
                  {msg}
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
        <div ref={messagesEndRef} />
      </div>

      <div className="bg-white p-4 shadow-md flex items-center space-x-3 relative">
        <button
          onClick={() => setShowEmojiPicker(!showEmojiPicker)}
          className="p-2 text-gray-600 hover:text-purple-600 transition-colors"
          aria-label="Toggle emoji picker"
        >
          <Smile className="h-6 w-6" />
        </button>
        {showEmojiPicker && (
          <div className="absolute bottom-16 left-4 bg-white rounded-lg shadow-lg p-3 grid grid-cols-6 gap-2 z-10">
            {["😊", "😂", "❤️", "👍", "😎", "🚀"].map((emoji) => (
              <button
                key={emoji}
                onClick={() => addEmoji(emoji)}
                className="text-lg hover:bg-gray-100 rounded p-1"
                aria-label={`Add ${emoji} emoji`}
              >
                {emoji}
              </button>
            ))}
          </div>
        )}
        <input
          className="flex-1 p-3 bg-gray-100 rounded-lg text-gray-700 focus:outline-none focus:ring-2 focus:ring-purple-500 placeholder-gray-400"
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
          className="p-3 bg-purple-500 text-white rounded-full hover:bg-purple-600 transition-colors disabled:bg-gray-400"
          onClick={sendMessage}
          disabled={!isConnected}
          aria-label="Send message"
        >
          <Send className="h-5 w-5" />
        </button>
      </div>
    </div>
  );
}
