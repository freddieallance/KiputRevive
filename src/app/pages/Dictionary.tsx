import { useState } from "react";
import { Search, Mic, Volume2 } from "lucide-react";
import { kiputUnits } from "../data/kiputData";
import { toast } from "sonner";

export const Dictionary = () => {
  const [searchTerm, setSearchTerm] = useState("");
  
  // Flatten all words from units for the dictionary
  const dictionaryData = kiputUnits.flatMap(unit => unit.words);

  const filteredWords = dictionaryData.filter(item => 
    item.kiput.toLowerCase().includes(searchTerm.toLowerCase()) || 
    item.english.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const playAudio = (path: string) => {
    const audio = new Audio(path);
    audio.play().catch(() => toast.error("Audio file not found."));
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-stone-900 mb-4">Digital Dictionary</h1>
        <p className="text-lg text-stone-600">
          Search for words in English or Kiput.
        </p>
      </div>

      {/* Search Bar */}
      <div className="relative mb-12">
        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
          <Search className="h-5 w-5 text-stone-400" />
        </div>
        <input
          type="text"
          placeholder="Search for a word..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full pl-12 pr-4 py-4 bg-white border border-stone-200 rounded-2xl shadow-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent text-lg transition-shadow"
        />
      </div>

      {/* Results */}
      <div className="space-y-4">
        {filteredWords.length > 0 ? (
          filteredWords.map((item) => (
            <div 
              key={item.id} 
              className="bg-white p-6 rounded-xl border border-stone-100 shadow-sm hover:border-emerald-200 transition-colors flex justify-between items-center"
            >
              <div>
                <div className="flex items-center gap-3 mb-1">
                  <h3 className="text-2xl font-bold text-stone-900">{item.kiput}</h3>
                  <span className="text-stone-400 text-sm italic">/{item.pronunciation}/</span>
                </div>
                <p className="text-lg text-emerald-700 font-medium">{item.english}</p>
              </div>
              
              <button 
                onClick={() => playAudio(item.audio)}
                className="p-3 rounded-full bg-stone-100 hover:bg-emerald-100 text-stone-600 hover:text-emerald-700 transition-colors"
                title="Play pronunciation"
              >
                <Volume2 className="h-6 w-6" />
              </button>
            </div>
          ))
        ) : (
          <div className="text-center py-12 bg-white rounded-xl border border-dashed border-stone-300">
            <p className="text-stone-500">No words found for "{searchTerm}".</p>
          </div>
        )}
      </div>
    </div>
  );
};
