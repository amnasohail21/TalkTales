import { useState } from "react";
import characters from "./characters";

export default function App() {
  const [selected, setSelected] = useState(null);

  if (selected) {
    return (
      <div className="min-h-screen bg-gray-900 text-white flex flex-col items-center justify-center p-6">
        <h2 className="text-3xl font-bold mb-4">You selected: {selected.name}</h2>
        <img
          src={selected.image}
          alt={selected.name}
          className="w-48 h-48 object-contain rounded-lg mb-4"
        />
        <p className="text-center max-w-md">{selected.description}</p>
        <button
          onClick={() => setSelected(null)}
          className="mt-6 px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded"
        >
          Back to selection
        </button>
      </div>
    );
  }

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
