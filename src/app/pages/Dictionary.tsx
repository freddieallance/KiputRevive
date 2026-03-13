import { useState } from "react";
import { Search, Mic, Volume2 } from "lucide-react";
import { kiputUnits } from "../data/kiputData";
import { toast } from "sonner";
import { useLanguage } from "../context/LanguageContext";

export const Dictionary = () => {
  const { t } = useLanguage();
  const [searchTerm, useStateSearchTerm] = useState("");
  
  // Flatten all words from units for the dictionary
  const dictionaryData = kiputUnits.flatMap(unit => unit.words);

  const filteredWords = dictionaryData.filter(item => 
    item.kiput.toLowerCase().includes(searchTerm.toLowerCase()) || 
    item.english.toLowerCase().includes(searchTerm.toLowerCase()) ||
    (item.bm && item.bm.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  const playAudio = (path: string) => {
    const audio = new Audio(path);
    audio.play().catch(() => toast.error(t("Audio file not found.", "Fail audio tidak dijumpai.")));
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-stone-900 mb-4">{t("Digital Dictionary", "Kamus Digital")}</h1>
        <p className="text-lg text-stone-600">
          {t("Search for words in English or Kiput.", "Cari perkataan dalam Bahasa Inggeris, Bahasa Malaysia atau Kiput.")}
        </p>
      </div>

      {/* Search Bar */}
      <div className="relative mb-12">
        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
          <Search className="h-5 w-5 text-stone-400" />
        </div>
        <input
          type="text"
          placeholder={t("Search for a word...", "Cari perkataan...")}
          value={searchTerm}
          onChange={(e) => useStateSearchTerm(e.target.value)}
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
                <p className="text-lg text-emerald-700 font-medium">{t(item.english, item.bm || item.english)}</p>
              </div>
              
              <button 
                onClick={() => playAudio(item.audio)}
                className="p-3 rounded-full bg-stone-100 hover:bg-emerald-100 text-stone-600 hover:text-emerald-700 transition-colors"
                title={t("Play pronunciation", "Mainkan sebutan")}
              >
                <Volume2 className="h-6 w-6" />
              </button>
            </div>
          ))
        ) : (
          <div className="text-center py-12 bg-white rounded-xl border border-dashed border-stone-300">
            <p className="text-stone-500">{t(`No words found for "${searchTerm}".`, `Tiada perkataan dijumpai untuk "${searchTerm}".`)}</p>
          </div>
        )}
      </div>
    </div>
  );
};
