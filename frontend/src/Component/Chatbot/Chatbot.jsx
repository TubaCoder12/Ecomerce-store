import React, { useState, useRef, useEffect } from "react";
import axios from "axios";

export default function TravelChatbot() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false); // Default closed
  const messagesEndRef = useRef(null);

  useEffect(() => {
    setMessages([
      {
        sender: "bot",
        text:
          "🌍 Welcome to AI Travel Assistant! Ask me about:\n\n• Places in Lahore, Islamabad, Karachi\n• Northern areas & hill stations\n• Travel tips & best times to visit\n\nWhere would you like to explore?",
      },
    ]);
  }, []);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const sendMessage = async () => {
    const userInput = input.trim();
    if (!userInput || isLoading) return;

    const userMessage = { sender: "user", text: userInput };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsLoading(true);

    try {
      const res = await api.post("/chatbot", {
  message: userInput,
});


      const botMessage = {
        sender: "bot",
        text: res.data.reply,
      };
      setMessages((prev) => [...prev, botMessage]);
    } catch {
      const errorMessage = {
        sender: "bot",
        text:
          "I can help with travel in Pakistan! 🗺️ Try asking:\n• Best places in Lahore?\n• Things to do in Islamabad?\n• Northern areas to visit?\n• Hill stations for summer?",
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const quickQuestions = [
    "Best places in Lahore?",
    "Things to do in Islamabad?",
    "Northern areas to visit?",
    "Hill stations for summer?",
    "Best time to visit Pakistan?",
  ];

  const clearChat = () => {
    setMessages([
      {
        sender: "bot",
        text: "🌍 Hello! Ask me about travel destinations in Pakistan.",
      },
    ]);
  };

  // If chatbot closed, show small floating button
  if (!isOpen) {
    return (
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 z-50 bg-orange-500 text-white w-14 h-14 rounded-full shadow-xl flex items-center justify-center text-2xl hover:bg-orange-600 transition"
      >
        💬
      </button>
    );
  }

  return (
    <div className="fixed bottom-5 right-1/2 sm:right-5 translate-x-1/2 sm:translate-x-0 z-50 w-[90%] sm:w-[400px] bg-[#fbefde] rounded-2xl shadow-2xl p-4 sm:p-6">
      {/* Header */}
      <div className="flex justify-between items-center mb-3">
        <h2 className="text-xl font-bold">🌍 AI Travel Assistant</h2>
        <div className="flex gap-2">
          <button
            onClick={clearChat}
            className="px-3 py-1 bg-slate-50 text-black rounded-full hover:bg-white transition"
          >
            ♻
          </button>
          <button
            onClick={() => setIsOpen(false)}
            className="px-3 py-1 bg-red-500 text-white rounded-full hover:bg-red-600 transition"
          >
            ✖
          </button>
        </div>
      </div>

      {/* Quick Questions */}
      <div className="mb-3 p-3 bg-orange-300 rounded-xl">
        <p className="text-black font-semibold mb-2">Suggestions:</p>
        <div className="flex flex-wrap gap-2">
          {quickQuestions.map((q, i) => (
            <button
              key={i}
              onClick={() => setInput(q)}
              className="bg-white text-orange-600 px-3 py-1 rounded-full text-sm hover:bg-orange-100"
            >
              {q}
            </button>
          ))}
        </div>
      </div>

      {/* Messages */}
      <div className="h-64 overflow-y-auto bg-white rounded-xl p-3 shadow-inner mb-3">
        {messages.map((m, i) => (
          <div
            key={i}
            className={`mb-3 ${m.sender === "user" ? "text-right" : "text-left"}`}
          >
            <div
              className={`inline-block max-w-[80%] p-3 rounded-xl text-sm ${
                m.sender === "user"
                  ? "bg-orange-500 text-white rounded-br-none"
                  : "bg-gray-100 text-black rounded-bl-none"
              }`}
            >
              {m.text}
            </div>
          </div>
        ))}
        {isLoading && (
          <div className="text-left mb-3">
            <div className="inline-block max-w-[80%] p-3 rounded-xl bg-gray-100 text-black rounded-bl-none">
              <div className="flex items-center gap-2 text-sm">
                <div className="flex space-x-1">
                  <div className="w-2 h-2 bg-gray-600 rounded-full animate-bounce"></div>
                  <div
                    className="w-2 h-2 bg-gray-600 rounded-full animate-bounce"
                    style={{ animationDelay: "0.1s" }}
                  ></div>
                  <div
                    className="w-2 h-2 bg-gray-600 rounded-full animate-bounce"
                    style={{ animationDelay: "0.2s" }}
                  ></div>
                </div>
                Finding travel suggestions...
              </div>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <div className="flex gap-2">
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && sendMessage()}
          disabled={isLoading}
          placeholder="Ask something..."
          className="flex-1 px-3 py-2 rounded-full border border-orange-300 focus:ring-2 focus:ring-orange-500"
        />
        <button
          onClick={sendMessage}
          disabled={isLoading || !input.trim()}
          className="px-6 py-2 bg-orange-500 text-white rounded-full hover:bg-orange-600 disabled:bg-orange-300"
        >
          {isLoading ? "..." : "Send"}
        </button>
      </div>

      {/* Footer */}
      <div className="mt-3 text-center text-sm text-black">
        AI Travel Assistant • Free Forever
      </div>
    </div>
  );
}
