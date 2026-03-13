import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { ArrowLeft, Check, X, Volume2, Star, Heart, Trophy, RefreshCcw } from "lucide-react";
import { kiputUnits, Unit, Word } from "../data/kiputData";
import { toast } from "sonner";
import { useLanguage } from "../context/LanguageContext";

// --- Components ---

const ProgressBar = ({ progress }: { progress: number }) => (
  <div className="w-full bg-stone-200 h-4 rounded-full overflow-hidden">
    <motion.div 
      className="h-full bg-emerald-500"
      initial={{ width: 0 }}
      animate={{ width: `${progress}%` }}
      transition={{ type: "spring", stiffness: 100 }}
    />
  </div>
);

const HeartDisplay = ({ hearts }: { hearts: number }) => (
  <div className="flex items-center gap-1 text-rose-500 font-bold text-lg">
    <Heart className="fill-rose-500" size={24} />
    <span>{hearts}</span>
  </div>
);

const UnitCard = ({ unit, onClick, isLocked }: { unit: Unit, onClick: () => void, isLocked: boolean }) => {
  const { t } = useLanguage();
  return (
    <motion.div
      whileHover={!isLocked ? { scale: 1.05 } : {}}
      whileTap={!isLocked ? { scale: 0.95 } : {}}
      onClick={!isLocked ? onClick : undefined}
      className={`relative mb-8 p-6 rounded-3xl w-full max-w-sm mx-auto flex items-center justify-between shadow-[0_6px_0_0_rgba(0,0,0,0.1)] transition-colors border-2 ${
        isLocked 
          ? "bg-stone-200 border-stone-300 text-stone-400 cursor-not-allowed grayscale" 
          : "bg-white border-stone-200 cursor-pointer hover:bg-stone-50"
      }`}
    >
      <div className="flex flex-col">
        <span className="text-xs font-bold uppercase tracking-wider mb-1 text-stone-400">{t("Unit", "Unit")} {unit.id}</span>
        <h3 className="text-xl font-bold text-stone-800">{t(unit.title, unit.titleBm)}</h3>
        <p className="text-sm text-stone-500">{t(unit.description, unit.descriptionBm)}</p>
      </div>
      
      <div className={`w-16 h-16 rounded-full flex items-center justify-center text-white font-bold text-2xl shadow-inner ${unit.color}`}>
         {isLocked ? <span className="opacity-50">🔒</span> : <Star className="fill-white" />}
      </div>
    </motion.div>
  );
};

// --- Main Page ---

export const Learn = () => {
  const [activeUnit, setActiveUnit] = useState<Unit | null>(null);
  const [isSentenceGeneratorActive, setIsSentenceGeneratorActive] = useState(false);

  return (
    <div className="min-h-screen bg-stone-50 pb-20">
      <AnimatePresence mode="wait">
        {isSentenceGeneratorActive ? (
          <SentenceGenerator key="generator" onExit={() => setIsSentenceGeneratorActive(false)} />
        ) : !activeUnit ? (
          <UnitPath 
            key="path" 
            onSelectUnit={setActiveUnit} 
            onOpenGenerator={() => setIsSentenceGeneratorActive(true)} 
          />
        ) : (
          <LessonSession key="session" unit={activeUnit} onExit={() => setActiveUnit(null)} />
        )}
      </AnimatePresence>
    </div>
  );
};

const SentenceGenerator = ({ onExit }: { onExit: () => void }) => {
  const { t } = useLanguage();

  const subjects = [
    { kiput: "Kau", english: "I", bm: "Saya", audio: "/audio/kau.mp3", emoji: "🧍" },
    { kiput: "Nau", english: "You", bm: "Awak", audio: "/audio/nau.mp3", emoji: "🫵" },
    { kiput: "Kaueng", english: "Friend", bm: "Kawan", audio: "/audio/kaueng.mp3", emoji: "🤝" },
    { kiput: "Tamah", english: "Father", bm: "Bapa", audio: "/audio/tamah.mp3", emoji: "👨" },
    { kiput: "Tinah", english: "Mother", bm: "Ibu", audio: "/audio/tinah.mp3", emoji: "👩" },
    { kiput: "Ark", english: "Brother", bm: "Abang", audio: "/audio/ark.mp3", emoji: "👦" },
    { kiput: "Asau", english: "Dog", bm: "Anjing", audio: "/audio/asau.mp3", emoji: "🐶" },
    { kiput: "Usair", english: "Cat", bm: "Kucing", audio: "/audio/usair.mp3", emoji: "🐱" },
    { kiput: "Ucit", english: "Monkey", bm: "Monyet", audio: "/audio/ucit.mp3", emoji: "🐒" }
  ];

  const verbs = [
    { kiput: "kuman", english: "eats", bm: "makan", audio: "/audio/kuman.mp3", emoji: "🍽️" },
    { kiput: "misap", english: "drinks", bm: "minum", audio: "/audio/misap.mp3", emoji: "💧" },
    { kiput: "maceh", english: "reads", bm: "baca", audio: "/audio/maceh.mp3", emoji: "📖" },
    { kiput: "belajen", english: "learns", bm: "belajar", audio: "/audio/belajen.mp3", emoji: "🧠" },
    { kiput: "umau", english: "goes to", bm: "pergi ke", audio: "/audio/umau.mp3", emoji: "🚶" },
    { kiput: "mikat", english: "wakes up", bm: "bangun", audio: "/audio/mikat.mp3", emoji: "⏰" }
  ];

  const objectsByVerb: Record<string, { kiput: string, english: string, bm: string, audio: string, emoji: string }[]> = {
    kuman: [
      { kiput: "kanan", english: "rice", bm: "nasi", audio: "/audio/kanan.mp3", emoji: "🍚" },
      { kiput: "putai", english: "banana", bm: "pisang", audio: "/audio/putai_banana.mp3", emoji: "🍌" },
      { kiput: "sup", english: "soup", bm: "sup", audio: "/audio/sup.mp3", emoji: "🥣" },
      { kiput: "putak", english: "fish", bm: "ikan", audio: "/audio/putak.mp3", emoji: "🐟" },
      { kiput: "an", english: "chicken", bm: "ayam", audio: "/audio/an_food.mp3", emoji: "🍗" }
    ],
    misap: [
      { kiput: "sik", english: "water", bm: "air", audio: "/audio/sik.mp3", emoji: "🚰" }
    ],
    maceh: [
      { kiput: "buk", english: "book", bm: "buku", audio: "/audio/buk.mp3", emoji: "📚" }
    ],
    belajen: [
      { kiput: "barau", english: "new things", bm: "perkara baru", audio: "/audio/barau.mp3", emoji: "✨" }
    ],
    umau: [
      { kiput: "sekulah", english: "school", bm: "sekolah", audio: "/audio/sekulah.mp3", emoji: "🏫" },
      { kiput: "cau", english: "river", bm: "sungai", audio: "/audio/cau.mp3", emoji: "🌊" }
    ],
    mikat: [
      { kiput: "awin", english: "early", bm: "awal", audio: "/audio/awin.mp3", emoji: "🌅" }
    ]
  };

  const [subject, setSubject] = useState(subjects[0]);
  const [verb, setVerb] = useState(verbs[0]);
  const [object, setObject] = useState(objectsByVerb[verbs[0].kiput][0]);
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // When verb changes, ensure the object makes sense for that verb
  useEffect(() => {
    const validObjects = objectsByVerb[verb.kiput];
    setObject(validObjects[0]);
  }, [verb]);

  const generateRandom = () => {
    const s = subjects[Math.floor(Math.random() * subjects.length)];
    const v = verbs[Math.floor(Math.random() * verbs.length)];
    const validObjects = objectsByVerb[v.kiput];
    const o = validObjects[Math.floor(Math.random() * validObjects.length)];
    
    setSubject(s);
    setVerb(v);
    setObject(o);
  };

  const playSequence = async () => {
    if (isPlaying) return;
    setIsPlaying(true);
    
    const playAudioFile = (path: string) => new Promise(resolve => {
      const audio = new Audio(path);
      audio.onended = resolve;
      audio.onerror = resolve; // Continue even if audio fails
      audio.play().catch(resolve);
    });

    await playAudioFile(subject.audio);
    await new Promise(r => setTimeout(r, 200));
    await playAudioFile(verb.audio);
    await new Promise(r => setTimeout(r, 200));
    await playAudioFile(object.audio);
    
    setIsPlaying(false);
  };

  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      className="max-w-3xl mx-auto pt-6 px-4 flex flex-col items-center justify-center min-h-[calc(100vh-80px)]"
    >
      <div className="w-full flex justify-between items-center mb-12">
        <button onClick={onExit} className="p-3 bg-stone-200 hover:bg-stone-300 rounded-full text-stone-600 transition-colors">
          <X size={24} />
        </button>
        <h2 className="text-3xl md:text-4xl font-black text-purple-600 drop-shadow-sm flex items-center gap-3">
          ✨ {t("Magic Sentences", "Ayat Ajaib")} ✨
        </h2>
        <div className="w-12"></div> {/* Spacer for centering */}
      </div>

      <div className="bg-white p-8 md:p-12 rounded-[2.5rem] shadow-[0_8px_0_0_#e7e5e4] border-4 border-stone-100 w-full relative">
        <button 
          onClick={generateRandom}
          className="absolute -top-6 -right-6 md:-right-8 bg-amber-400 hover:bg-amber-500 text-white p-4 rounded-full shadow-[0_4px_0_0_#d97706] active:shadow-none active:translate-y-[4px] transition-all transform hover:rotate-12"
          title={t("Randomize!", "Rawak!")}
        >
          <RefreshCcw size={32} />
        </button>

        <div className="flex flex-col md:flex-row gap-6 md:gap-4 justify-between items-center mb-12">
          {/* Subject Card */}
          <div className="flex flex-col items-center">
            <div className="text-sm font-bold text-stone-400 uppercase tracking-widest mb-3">{t("Who", "Siapa")}</div>
            <div className="bg-sky-100 border-4 border-sky-300 w-40 h-40 rounded-3xl flex flex-col items-center justify-center p-4 relative overflow-hidden">
               <span className="text-6xl mb-2">{subject.emoji}</span>
               <span className="text-xl font-bold text-sky-800">{subject.kiput}</span>
               <span className="text-sm text-sky-600">{t(subject.english, subject.bm)}</span>
            </div>
          </div>

          <div className="text-stone-300 text-4xl hidden md:block">+</div>

          {/* Verb Card */}
          <div className="flex flex-col items-center">
            <div className="text-sm font-bold text-stone-400 uppercase tracking-widest mb-3">{t("Action", "Tindakan")}</div>
            <div className="bg-rose-100 border-4 border-rose-300 w-40 h-40 rounded-3xl flex flex-col items-center justify-center p-4 relative overflow-hidden">
               <span className="text-6xl mb-2">{verb.emoji}</span>
               <span className="text-xl font-bold text-rose-800">{verb.kiput}</span>
               <span className="text-sm text-rose-600">{t(verb.english, verb.bm)}</span>
            </div>
          </div>

          <div className="text-stone-300 text-4xl hidden md:block">+</div>

          {/* Object Card */}
          <div className="flex flex-col items-center">
            <div className="text-sm font-bold text-stone-400 uppercase tracking-widest mb-3">{t("What", "Apa")}</div>
            <div className="bg-emerald-100 border-4 border-emerald-300 w-40 h-40 rounded-3xl flex flex-col items-center justify-center p-4 relative overflow-hidden">
               <span className="text-6xl mb-2">{object.emoji}</span>
               <span className="text-xl font-bold text-emerald-800">{object.kiput}</span>
               <span className="text-sm text-emerald-600">{t(object.english, object.bm)}</span>
            </div>
          </div>
        </div>

        <div className="text-center bg-stone-50 rounded-2xl p-6 border-2 border-stone-200 mb-8">
            <div className="text-3xl md:text-5xl font-black text-stone-800 mb-2 tracking-tight">
                {subject.kiput} {verb.kiput} {object.kiput}.
            </div>
            <div className="text-lg md:text-xl text-stone-500 font-medium">
                "{t(subject.english, subject.bm)} {t(verb.english, verb.bm)} {t(object.english, object.bm)}."
            </div>
        </div>

        <button 
          onClick={playSequence}
          disabled={isPlaying}
          className={`w-full py-6 rounded-2xl text-white font-black text-2xl flex items-center justify-center gap-4 transition-all
            ${isPlaying 
              ? "bg-purple-400 cursor-not-allowed translate-y-[6px]" 
              : "bg-purple-500 hover:bg-purple-600 shadow-[0_6px_0_0_#7e22ce] active:shadow-none active:translate-y-[6px]"
            }
          `}
        >
          <Volume2 size={32} className={isPlaying ? "animate-pulse" : ""} />
          {isPlaying ? t("Reading...", "Membaca...") : t("Read Aloud", "Baca Kuat")}
        </button>
      </div>
    </motion.div>
  );
};

// --- Helper for Grouping Categories ---

const getCategory = (title: string) => {
  const t = title.toLowerCase();
  if (t.includes('family')) return { name: 'Family', emoji: '👨‍👩‍👧', bg: 'bg-emerald-100', text: 'text-emerald-800', border: 'border-emerald-200' };
  if (t.includes('animal')) return { name: 'Animals', emoji: '🐶', bg: 'bg-sky-100', text: 'text-sky-800', border: 'border-sky-200' };
  if (t.includes('food')) return { name: 'Food & Drinks', emoji: '🍎', bg: 'bg-amber-100', text: 'text-amber-800', border: 'border-amber-200' };
  if (t.includes('nature')) return { name: 'Nature', emoji: '🌿', bg: 'bg-lime-100', text: 'text-lime-800', border: 'border-lime-200' };
  if (t.includes('number')) return { name: 'Numbers', emoji: '🔢', bg: 'bg-violet-100', text: 'text-violet-800', border: 'border-violet-200' };
  if (t.includes('color')) return { name: 'Colors', emoji: '🎨', bg: 'bg-fuchsia-100', text: 'text-fuchsia-800', border: 'border-fuchsia-200' };
  if (t.includes('emotion')) return { name: 'Emotions', emoji: '❤️', bg: 'bg-pink-100', text: 'text-pink-800', border: 'border-pink-200' };
  if (t.includes('school')) return { name: 'School', emoji: '🎒', bg: 'bg-indigo-100', text: 'text-indigo-800', border: 'border-indigo-200' };
  if (t.includes('daily') || t.includes('question')) return { name: 'Daily Life', emoji: '☀️', bg: 'bg-rose-100', text: 'text-rose-800', border: 'border-rose-200' };
  return { name: 'More Fun Words', emoji: '🌟', bg: 'bg-stone-100', text: 'text-stone-800', border: 'border-stone-200' };
};

// --- Sub-Screens ---

const UnitPath = ({ onSelectUnit, onOpenGenerator }: { onSelectUnit: (u: Unit) => void, onOpenGenerator: () => void }) => {
  const { t } = useLanguage();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Group units by category
  const groupedUnits = kiputUnits.reduce((acc, unit) => {
    const cat = getCategory(unit.title);
    if (!acc[cat.name]) {
      acc[cat.name] = { category: cat, units: [] };
    }
    acc[cat.name].units.push(unit);
    return acc;
  }, {} as Record<string, { category: ReturnType<typeof getCategory>, units: Unit[] }>);

  const getCategoryNameBm = (name: string) => {
    switch (name) {
      case 'Family': return 'Keluarga';
      case 'Animals': return 'Haiwan';
      case 'Food & Drinks': return 'Makanan & Minuman';
      case 'Nature': return 'Alam Semulajadi';
      case 'Numbers': return 'Nombor';
      case 'Colors': return 'Warna';
      case 'Emotions': return 'Emosi';
      case 'School': return 'Sekolah';
      case 'Daily Life': return 'Kehidupan Harian';
      default: return 'Lebih Banyak Perkataan Menarik';
    }
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="max-w-2xl mx-auto pt-12 px-4"
    >
      <div className="text-center mb-12">
        <h1 className="text-4xl font-black text-stone-800 mb-4 drop-shadow-sm">{t("Your Learning Path", "Laluan Pembelajaran Anda")}</h1>
        <p className="text-lg text-stone-500 font-medium">{t("Master Kiput step-by-step.", "Kuasai Kiput langkah demi langkah.")}</p>
      </div>

      <motion.button
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        onClick={onOpenGenerator}
        className="w-full bg-gradient-to-r from-purple-500 to-pink-500 rounded-[2.5rem] p-8 text-white flex flex-col items-center justify-center mb-12 shadow-[0_8px_0_0_#9d174d] active:shadow-none active:translate-y-[8px] cursor-pointer transition-all border-4 border-white"
      >
        <span className="text-5xl mb-3 drop-shadow-md">✨🎰</span>
        <h2 className="text-3xl font-black mb-2 tracking-wide">{t("Magic Sentence Builder", "Pembina Ayat Ajaib")}</h2>
        <p className="text-purple-100 text-lg font-medium">{t("Create and listen to fun sentences!", "Bina dan dengar ayat yang menyeronokkan!")}</p>
      </motion.button>
      
      <div className="space-y-12">
        {Object.values(groupedUnits).map(({ category, units }) => (
          <div key={category.name} className={`p-6 md:p-8 rounded-[2.5rem] shadow-sm border-4 ${category.bg} ${category.border}`}>
            <div className="flex items-center gap-4 mb-6 ml-2">
              <div className="bg-white w-14 h-14 rounded-full flex items-center justify-center shadow-sm text-3xl">
                {category.emoji}
              </div>
              <h2 className={`text-3xl font-black ${category.text}`}>{t(category.name, getCategoryNameBm(category.name))}</h2>
            </div>
            <div className="space-y-4">
              {units.map((unit) => (
                <UnitCard 
                  key={unit.id} 
                  unit={unit} 
                  onClick={() => onSelectUnit(unit)}
                  isLocked={false} 
                />
              ))}
            </div>
          </div>
        ))}
        
        <div className="text-center mt-12 p-10 border-4 border-dashed border-stone-300 rounded-[2.5rem] text-stone-500 bg-white">
          <span className="text-5xl mb-4 block">🚀</span>
          <p className="font-black text-2xl mb-2 text-stone-700">{t("More Units Coming Soon", "Lebih Banyak Unit Akan Datang")}</p>
          <p className="text-lg">{t("Help us add more content via the Parents & Teachers Zone!", "Bantu kami tambah lebih banyak kandungan melalui Zon Ibu Bapa & Guru!")}</p>
        </div>
      </div>
    </motion.div>
  );
};

const LessonSession = ({ unit, onExit }: { unit: Unit, onExit: () => void }) => {
  const { t } = useLanguage();
  const [hearts, setHearts] = useState(5);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [status, setStatus] = useState<"idle" | "correct" | "wrong">("idle");
  const [isCompleted, setIsCompleted] = useState(false);

  // Generate questions from the unit's words
  // In a real app, shuffle and mix question types
  const questions = unit.words.map(word => ({
    type: "translate_to_english",
    question: word.kiput,
    answer: t(word.english, word.bm),
    audio: word.audio,
    options: [
      t(word.english, word.bm), 
      ...unit.words
        .filter(w => w.id !== word.id)
        .map(w => t(w.english, w.bm))
        .sort(() => 0.5 - Math.random()) // Simple shuffle
        .slice(0, 3)
    ].sort(() => 0.5 - Math.random())
  }));

  const currentQuestion = questions[currentQuestionIndex];

  useEffect(() => {
    window.scrollTo(0, 0);
    window.dispatchEvent(new CustomEvent('setChatbotVisibility', { detail: false }));
    return () => {
      window.dispatchEvent(new CustomEvent('setChatbotVisibility', { detail: true }));
    };
  }, []);

  const playAudio = (path: string) => {
    // This is where the magic happens for user audio
    const audio = new Audio(path);
    audio.play().catch(e => {
      console.warn("Audio play failed (file might not exist yet):", e);
      toast.error(`Audio file missing: ${path}`);
    });
  };

  const handleCheck = () => {
    if (!selectedOption) return;

    if (selectedOption === currentQuestion.answer) {
      setStatus("correct");
      playAudio("/sounds/correct.mp3"); // Placeholder for effect sound
      // Also play pronunciation if available
      if (currentQuestion.audio) {
         setTimeout(() => playAudio(currentQuestion.audio), 500);
      }
    } else {
      setStatus("wrong");
      setHearts(h => Math.max(0, h - 1));
      playAudio("/sounds/wrong.mp3"); // Placeholder for effect sound
    }
  };

  const handleNext = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
      setSelectedOption(null);
      setStatus("idle");
    } else {
      setIsCompleted(true);
    }
  };

  // Auto-fail if hearts reach 0
  useEffect(() => {
    if (hearts === 0) {
      // Handle game over logic here
      toast.error(t("Out of hearts! Try again.", "Kehabisan nyawa! Cuba lagi."));
      onExit();
    }
  }, [hearts, onExit, t]);

  if (isCompleted) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[80vh] text-center px-4">
        <motion.div 
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          className="mb-8 text-emerald-500"
        >
          <Trophy size={120} />
        </motion.div>
        <h2 className="text-4xl font-bold text-stone-800 mb-4">{t("Lesson Complete!", "Pelajaran Selesai!")}</h2>
        <p className="text-xl text-stone-600 mb-8">{t("You earned +10 XP", "Anda mendapat +10 XP")}</p>
        <div className="flex gap-4">
          <button 
            onClick={onExit}
            className="px-8 py-3 bg-emerald-500 hover:bg-emerald-600 text-white font-bold rounded-xl shadow-[0_4px_0_0_#059669] active:shadow-none active:translate-y-[4px] transition-all"
          >
            {t("Continue", "Teruskan")}
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto pt-6 px-4 h-[calc(100vh-80px)] flex flex-col">
      {/* Header */}
      <div className="flex items-center gap-4 mb-8">
        <button onClick={onExit} className="text-stone-400 hover:text-stone-600">
          <X size={24} />
        </button>
        <ProgressBar progress={((currentQuestionIndex) / questions.length) * 100} />
        <HeartDisplay hearts={hearts} />
      </div>

      {/* Question Area */}
      <div className="flex-grow flex flex-col justify-center">
        <h2 className="text-2xl font-bold text-stone-800 mb-8">{t("Select the correct meaning", "Pilih maksud yang betul")}</h2>
        
        <div className="mb-12 flex flex-col items-center">
            <div className="flex items-center gap-4 mb-4">
                {currentQuestion.audio && (
                    <button 
                        onClick={() => playAudio(currentQuestion.audio)}
                        className="w-12 h-12 bg-sky-500 rounded-xl shadow-[0_4px_0_0_#0284c7] text-white flex items-center justify-center active:translate-y-[4px] active:shadow-none transition-all"
                    >
                        <Volume2 size={24} />
                    </button>
                )}
                <div className="text-4xl font-bold text-stone-800 border-2 border-stone-200 p-6 rounded-2xl inline-block min-w-[200px] text-center bg-white shadow-sm">
                    {currentQuestion.question}
                </div>
            </div>
            {currentQuestion.audio && <p className="text-stone-400 text-sm">{t("Tap speaker to listen", "Tekan pembesar suara untuk mendengar")}</p>}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
          {currentQuestion.options.map((option, idx) => (
            <button
              key={idx}
              onClick={() => status === "idle" && setSelectedOption(option)}
              disabled={status !== "idle"}
              className={`
                p-4 rounded-xl border-2 text-lg font-bold transition-all text-left relative
                ${selectedOption === option 
                    ? "bg-sky-100 border-sky-400 text-sky-700 shadow-[0_2px_0_0_#38bdf8]" 
                    : "bg-white border-stone-200 text-stone-700 hover:bg-stone-50 shadow-[0_4px_0_0_#e7e5e4] active:shadow-none active:translate-y-[4px]"}
                ${status !== "idle" && option === currentQuestion.answer ? "!bg-emerald-100 !border-emerald-500 !text-emerald-700" : ""}
                ${status === "wrong" && selectedOption === option ? "!bg-rose-100 !border-rose-500 !text-rose-700" : ""}
              `}
            >
              {option}
            </button>
          ))}
        </div>
      </div>

      {/* Footer / Feedback Area */}
      <div className={`
        fixed bottom-16 md:bottom-0 left-0 right-0 p-4 md:p-8 border-t-2 
        ${status === "idle" ? "bg-white border-stone-200" : ""}
        ${status === "correct" ? "bg-emerald-100 border-emerald-200" : ""}
        ${status === "wrong" ? "bg-rose-100 border-rose-200" : ""}
        transition-colors duration-300 z-50
      `}>
        <div className="max-w-2xl mx-auto flex justify-between items-center">
          {status === "idle" ? (
            <div className="flex-grow flex justify-end">
              <button
                onClick={handleCheck}
                disabled={!selectedOption}
                className="w-full md:w-auto px-12 py-3 bg-emerald-500 disabled:bg-stone-300 hover:bg-emerald-600 text-white font-bold rounded-xl shadow-[0_4px_0_0_#059669] active:shadow-none active:translate-y-[4px] transition-all uppercase tracking-wider"
              >
                {t("Check", "Semak")}
              </button>
            </div>
          ) : (
            <>
              <div className="flex items-center gap-4">
                <div className={`w-12 h-12 rounded-full flex items-center justify-center ${status === "correct" ? "bg-emerald-500" : "bg-rose-500"} text-white`}>
                  {status === "correct" ? <Check size={28} /> : <X size={28} />}
                </div>
                <div>
                  <h3 className={`text-xl font-bold ${status === "correct" ? "text-emerald-800" : "text-rose-800"}`}>
                    {status === "correct" ? t("Excellent!", "Cemerlang!") : t("Not quite right...", "Kurang tepat...")}
                  </h3>
                  {status === "wrong" && (
                    <p className="text-rose-600">{t("Correct answer:", "Jawapan yang betul:")} <strong>{currentQuestion.answer}</strong></p>
                  )}
                </div>
              </div>
              <button
                onClick={handleNext}
                className={`px-8 py-3 font-bold rounded-xl shadow-[0_4px_0_0_rgba(0,0,0,0.1)] active:shadow-none active:translate-y-[4px] transition-all uppercase tracking-wider
                  ${status === "correct" ? "bg-emerald-500 text-white hover:bg-emerald-600 shadow-[0_4px_0_0_#059669]" : "bg-rose-500 text-white hover:bg-rose-600 shadow-[0_4px_0_0_#be123c]"}
                `}
              >
                {t("Continue", "Teruskan")}
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};
