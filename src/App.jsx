import { useState } from "react";
import characters from "./characters";

export default function App() {
  const [selected, setSelected] = useState(null);
  const [messages, setMessages] = useState([]);

  const [input, setInput] = useState("");

  // Simple mock "AI" reply for demo
  const getReply = (msg) => {
    return `You said: "${msg}". (Pretend ${selected.name} is replying!)`;
  };

  const sendMessage = () => {
    if (!input.trim()) return;

    const userMessage = { sender: "user", text: input };
    const replyMessage = { sender: "character", text: getReply(input) };

    setMessages((msgs) => [...msgs, userMessage, replyMessage]);
    setInput("");
  };

  if (selected) {
    return (
      <div className="min-h-screen bg-gray-900 text-white flex flex-col p-6 max-w-3xl mx-auto">
        <button
          onClick={() => {
            setSelected(null);
            setMessages([]);
          }}
          className="mb-4 px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded self-start"
        >
          ← Back to selection
        </button>

        <h2 className="text-3xl font-bold mb-2">{selected.name}</h2>
        <p className="mb-6 max-w-md">{selected.description}</p>

        <div className="flex-1 flex flex-col border border-gray-700 rounded p-4 mb-4 overflow-y-auto h-96 bg-gray-800">
          {messages.length === 0 && (
            <p className="text-gray-400 italic">Start chatting with {selected.name}!</p>
          )}
          {messages.map((msg, i) => (
            <div
              key={i}
              className={`mb-2 max-w-xs rounded px-3 py-2 ${
                msg.sender === "user"
                  ? "bg-blue-600 self-end text-white"
                  : "bg-gray-700 self-start text-gray-200"
              }`}
            >
              {msg.text}
            </div>
          ))}
        </div>

        <div className="flex gap-2">
          <input
            type="text"
            placeholder="Say something..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && sendMessage()}
            className="flex-grow rounded px-3 py-2 text-black"
          />
          <button
            onClick={sendMessage}
            className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded"
          >
            Send
          </button>
        </div>
      </div>
    );
  }

  // Selection grid view remains unchanged
  return (
    <div className="min-h-screen bg-gray-900 text-white p-6">
      <h1 className="text-4xl font-bold mb-8 text-center">Welcome to TalkTales 🎭</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 max-w-6xl mx-auto">
        {characters.map((char) => (
          <div
            key={char.id}
            onClick={() => setSelected(char)}
            className="cursor-pointer bg-gray-800 rounded-lg p-4 flex flex-col items-center hover:bg-gray-700 transition"
          >
            <img
              src={char.image}
              alt={char.name}
              className="w-32 h-32 object-contain rounded-md mb-4"
            />
            <h3 className="text-xl font-semibold">{char.name}</h3>
            <p className="text-sm text-gray-300 text-center">{char.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
