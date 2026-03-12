import { useState, useRef, useEffect, useMemo } from "react";
import { Play, Pause, X, ChevronLeft, ChevronRight, BookOpen, Volume2, Sparkles, Settings2 } from "lucide-react";
import { Link } from "react-router";
import { motion, AnimatePresence } from "motion/react";
import { kiputStories, Story } from "../data/kiputData";

export const Stories = () => {
  const [selectedStory, setSelectedStory] = useState<Story | null>(null);

  return (
    <div className="min-h-screen bg-sky-50 py-12 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      <AnimatePresence mode="wait">
        {!selectedStory ? (
          <motion.div
            key="library"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="max-w-6xl mx-auto"
          >
            <div className="text-center mb-16">
              <h1 className="text-5xl md:text-6xl font-black text-stone-800 tracking-tight drop-shadow-sm flex items-center justify-center gap-4 mb-4">
                Story Library <BookOpen className="text-amber-400" size={48} />
              </h1>
              <p className="text-xl md:text-2xl text-stone-500 font-bold max-w-2xl mx-auto">
                Pick a magic book to read and listen!
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-12">
              {kiputStories.map((story) => (
                <motion.div
                  key={story.id}
                  whileHover={{ y: -10, rotate: -2 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setSelectedStory(story)}
                  className="cursor-pointer group relative perspective-1000"
                >
                  {/* Book Spine / Shadow effect */}
                  <div className="absolute inset-y-0 left-0 w-8 bg-stone-900 rounded-l-2xl shadow-[-10px_0_20px_rgba(0,0,0,0.2)] z-0 transform -translate-x-2 group-hover:-translate-x-3 transition-transform" />
                  
                  {/* Main Cover */}
                  <div className="bg-white rounded-2xl overflow-hidden shadow-xl border-4 border-white transform origin-left transition-transform group-hover:rotate-y-[-10deg] h-[400px] flex flex-col relative z-10">
                    <div className="h-3/4 overflow-hidden relative">
                      <img
                        src={story.coverImage}
                        alt={story.title}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-stone-900/60 to-transparent" />
                      <div className="absolute bottom-4 left-4 right-4 flex justify-between items-end">
                        <span className="bg-amber-400 text-amber-900 text-xs font-black px-3 py-1.5 rounded-full uppercase tracking-wider shadow-sm">
                          {story.duration}
                        </span>
                      </div>
                    </div>
                    <div className="p-4 flex-1 bg-stone-100 flex items-center justify-center text-center">
                      <h3 className="text-2xl font-black text-stone-800 leading-tight">{story.title}</h3>
                    </div>
                  </div>
                </motion.div>
              ))}

              {/* Call to action card */}
              <div className="bg-sky-100 rounded-3xl border-4 border-dashed border-sky-300 p-8 flex flex-col items-center justify-center text-center h-[400px]">
                <Sparkles size={64} className="text-sky-400 mb-6" />
                <h3 className="text-3xl font-black text-sky-900 mb-2">More Books</h3>
                <p className="text-sky-700 font-bold mb-6 text-xl">Coming soon!</p>
              </div>
            </div>
          </motion.div>
        ) : (
          <BookReader key="reader" story={selectedStory} onClose={() => setSelectedStory(null)} />
        )}
      </AnimatePresence>
    </div>
  );
};

// --- Sub-component: Book Reader ---

const BookReader = ({ story, onClose }: { story: Story, onClose: () => void }) => {
  const [currentPageIndex, setCurrentPageIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [playbackRate, setPlaybackRate] = useState(1);
  const [showSpeedMenu, setShowSpeedMenu] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [slideDirection, setSlideDirection] = useState<"left" | "right">("right");
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const page = story.pages[currentPageIndex];

  // Split text into sentences for highlighting
  const sentences = useMemo(() => {
    // Basic sentence splitting by punctuation
    return page.text.match(/[^.!?]+[.!?]+|\s*[^.!?]+$/g)?.map(s => s.trim()).filter(Boolean) || [page.text];
  }, [page.text]);

  // Calculate which sentence is currently playing based on character proportion
  const currentSentenceIndex = useMemo(() => {
    if (!duration || duration === 0 || sentences.length === 0) return -1;
    if (!isPlaying && currentTime === 0) return -1;

    const totalChars = sentences.reduce((acc, s) => acc + s.length, 0);
    const progress = currentTime / duration;
    const targetChars = progress * totalChars;

    let charCount = 0;
    for (let i = 0; i < sentences.length; i++) {
      charCount += sentences[i].length;
      if (charCount >= targetChars) {
        return i;
      }
    }
    return sentences.length - 1;
  }, [currentTime, duration, sentences, isPlaying]);

  // Play audio when page turns
  useEffect(() => {
    // Stop any currently playing audio
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
      audioRef.current = null;
    }

    setCurrentTime(0);
    setDuration(0);
    setIsPlaying(false);

    if (page && page.audio) {
      const audio = new Audio(page.audio);
      audioRef.current = audio;
      audio.playbackRate = playbackRate;
      
      audio.onloadedmetadata = () => {
        setDuration(audio.duration);
      };

      audio.ontimeupdate = () => {
        setCurrentTime(audio.currentTime);
      };

      audio.onended = () => {
        setIsPlaying(false);
        setCurrentTime(audio.duration || 0);
      };
      
      audio.onerror = () => {
        // Silently ignore if MP3 isn't created yet so kids aren't interrupted
        setIsPlaying(false);
      };

      // Try to play automatically
      setIsPlaying(true);
      audio.play().catch(() => {
        // Browsers block autoplay without user interaction, handle gracefully
        setIsPlaying(false);
      });
    }

    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current.src = "";
      }
    };
  }, [currentPageIndex, page]); // Intentionally omitting playbackRate so it doesn't restart audio on speed change

  // Update playback rate when it changes
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.playbackRate = playbackRate;
    }
  }, [playbackRate]);

  // Ensure audio stops when unmounting the BookReader entirely
  useEffect(() => {
    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current.src = "";
        audioRef.current = null;
      }
    };
  }, []);

  const togglePlay = () => {
    if (!audioRef.current) return;
    
    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      if (currentTime >= duration && duration > 0) {
        audioRef.current.currentTime = 0;
      }
      audioRef.current.play().catch(() => {});
      setIsPlaying(true);
    }
  };

  const nextPage = () => {
    if (currentPageIndex < story.pages.length - 1) {
      setSlideDirection("right");
      setCurrentPageIndex(prev => prev + 1);
    }
  };

  const prevPage = () => {
    if (currentPageIndex > 0) {
      setSlideDirection("left");
      setCurrentPageIndex(prev => prev - 1);
    }
  };

  const speedOptions = [0.5, 0.75, 1, 1.25, 1.5];

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      className="fixed inset-0 z-[60] bg-stone-900/80 backdrop-blur-sm flex flex-col items-center justify-center p-4 sm:p-8"
    >
      {/* Top Bar */}
      <div className="absolute top-4 sm:top-8 left-0 right-0 px-4 sm:px-8 flex justify-between items-center z-10 w-full max-w-7xl mx-auto">
        <button 
          onClick={onClose}
          className="bg-white/20 hover:bg-white text-white hover:text-stone-900 p-3 sm:p-4 rounded-full backdrop-blur-md transition-all font-bold flex items-center gap-2"
        >
          <X size={24} />
          <span className="hidden sm:inline">Close Book</span>
        </button>

        <div className="bg-white/20 backdrop-blur-md text-white px-6 py-2 rounded-full font-bold text-lg tracking-widest uppercase">
          Page {currentPageIndex + 1} of {story.pages.length}
        </div>
      </div>

      {/* The Book */}
      <div className="w-full max-w-6xl aspect-[3/4] sm:aspect-video bg-[#fdfbf7] rounded-3xl shadow-2xl overflow-hidden flex flex-col sm:flex-row relative">
        {/* Book binding center line (desktop only) */}
        <div className="hidden sm:block absolute left-1/2 top-0 bottom-0 w-12 -ml-6 bg-gradient-to-r from-transparent via-stone-200/50 to-transparent z-20 pointer-events-none" />

        <AnimatePresence mode="popLayout" custom={slideDirection}>
          <motion.div
            key={currentPageIndex}
            custom={slideDirection}
            initial={{ x: slideDirection === "right" ? 300 : -300, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: slideDirection === "right" ? -300 : 300, opacity: 0 }}
            transition={{ type: "spring", stiffness: 200, damping: 20 }}
            className="flex-1 flex flex-col sm:flex-row w-full h-full absolute inset-0"
          >
            {/* Left Page: Illustration */}
            <div className="h-1/2 sm:h-full sm:w-1/2 bg-stone-100 relative p-4 sm:p-8 sm:pr-4 flex items-center justify-center">
              <div className="w-full h-full rounded-2xl overflow-hidden shadow-inner border-4 border-white bg-white">
                <img 
                  src={page.image} 
                  alt="Story illustration" 
                  className="w-full h-full object-cover"
                />
              </div>
            </div>

            {/* Right Page: Text & Audio Controls */}
            <div className="h-1/2 sm:h-full sm:w-1/2 bg-[#fdfbf7] p-4 sm:p-12 sm:pl-10 flex flex-col relative">
              <div className="flex-1 flex items-center justify-center overflow-y-auto min-h-0">
                <div className={`font-serif text-stone-800 leading-snug sm:leading-relaxed text-center whitespace-pre-wrap py-2 sm:py-4 ${page.text.length > 150 ? 'text-base sm:text-2xl lg:text-3xl' : 'text-lg sm:text-3xl lg:text-4xl'}`}>
                  {sentences.map((sentence, idx) => (
                    <span 
                      key={idx} 
                      className={`transition-colors duration-300 ${idx === currentSentenceIndex ? 'bg-amber-200 text-amber-900 rounded-md px-1' : ''}`}
                    >
                      {sentence}{" "}
                    </span>
                  ))}
                </div>
              </div>

              {/* Audio Controls */}
              <div className="mt-3 sm:mt-6 flex flex-col items-center gap-2 sm:gap-4 shrink-0">
                {/* Progress Bar */}
                {duration > 0 && (
                  <div className="w-full max-w-md h-1.5 sm:h-2 bg-stone-200 rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-emerald-400 transition-all duration-100 ease-linear"
                      style={{ width: `${(currentTime / duration) * 100}%` }}
                    />
                  </div>
                )}

                <div className="flex items-center gap-2 sm:gap-4 relative">
                  <button 
                    onClick={togglePlay}
                    className={`flex items-center gap-2 sm:gap-3 px-6 py-2 sm:px-8 sm:py-4 rounded-full text-base sm:text-2xl font-bold transition-all shadow-[0_4px_0_0_rgba(0,0,0,0.1)] sm:shadow-[0_6px_0_0_rgba(0,0,0,0.1)] active:translate-y-[4px] sm:active:translate-y-[6px] active:shadow-none
                      ${isPlaying ? 'bg-amber-400 text-amber-900 shadow-[0_4px_0_0_#b45309] sm:shadow-[0_6px_0_0_#b45309]' : 'bg-emerald-400 text-emerald-900 shadow-[0_4px_0_0_#047857] sm:shadow-[0_6px_0_0_#047857] hover:bg-emerald-300'}`}
                  >
                    {isPlaying ? <Pause fill="currentColor" size={20} className="sm:w-8 sm:h-8" /> : <Volume2 size={20} className="sm:w-8 sm:h-8" />}
                    {isPlaying ? "Playing..." : "Read to me"}
                  </button>

                  {/* Speed Control */}
                  <div className="relative">
                    <button
                      onClick={() => setShowSpeedMenu(!showSpeedMenu)}
                      className="p-2 sm:p-4 rounded-full bg-stone-100 text-stone-600 hover:bg-stone-200 transition-colors shadow-sm"
                      title="Playback Speed"
                    >
                      <Settings2 size={20} className="sm:w-6 sm:h-6" />
                    </button>
                    
                    <AnimatePresence>
                      {showSpeedMenu && (
                        <motion.div
                          initial={{ opacity: 0, y: 10, scale: 0.95 }}
                          animate={{ opacity: 1, y: 0, scale: 1 }}
                          exit={{ opacity: 0, y: 10, scale: 0.95 }}
                          className="absolute bottom-full right-0 mb-2 bg-white rounded-xl shadow-xl border border-stone-100 overflow-hidden flex flex-col w-32 z-50"
                        >
                          <div className="px-3 py-2 bg-stone-50 border-b border-stone-100 text-xs font-bold text-stone-500 uppercase tracking-wider text-center">
                            Speed
                          </div>
                          {speedOptions.map(speed => (
                            <button
                              key={speed}
                              onClick={() => {
                                setPlaybackRate(speed);
                                setShowSpeedMenu(false);
                              }}
                              className={`px-4 py-2 text-sm font-medium transition-colors hover:bg-emerald-50 ${playbackRate === speed ? 'bg-emerald-100 text-emerald-700' : 'text-stone-700'}`}
                            >
                              {speed}x
                            </button>
                          ))}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Navigation Arrows */}
        {currentPageIndex > 0 && (
          <button 
            onClick={prevPage}
            className="absolute left-2 sm:left-6 top-1/2 -translate-y-1/2 w-14 h-14 sm:w-20 sm:h-20 bg-white shadow-xl rounded-full flex items-center justify-center text-stone-600 hover:text-emerald-500 hover:scale-110 active:scale-95 transition-all z-30"
          >
            <ChevronLeft size={40} className="-ml-1" />
          </button>
        )}
        
        {currentPageIndex < story.pages.length - 1 && (
          <button 
            onClick={nextPage}
            className="absolute right-2 sm:right-6 top-1/2 -translate-y-1/2 w-14 h-14 sm:w-20 sm:h-20 bg-white shadow-xl rounded-full flex items-center justify-center text-stone-600 hover:text-emerald-500 hover:scale-110 active:scale-95 transition-all z-30"
          >
            <ChevronRight size={40} className="-mr-1" />
          </button>
        )}
      </div>
    </motion.div>
  );
};
