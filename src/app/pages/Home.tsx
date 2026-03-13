import { Link } from "react-router";
import { motion } from "motion/react";
import { Play, BookOpen, Search, Star, Sparkles, Heart } from "lucide-react";
import { useLanguage } from "../context/LanguageContext";

export const Home = () => {
  const { t } = useLanguage();

  return (
    <div className="min-h-screen bg-sky-50 flex flex-col items-center justify-center p-4 md:p-8 overflow-hidden relative">
      {/* Fun Background Decorations */}
      <motion.div 
        animate={{ y: [0, -20, 0], rotate: [0, 10, -10, 0] }} 
        transition={{ repeat: Infinity, duration: 4 }}
        className="absolute top-12 left-12 text-amber-300 hidden md:block"
      >
        <Star size={80} fill="currentColor" />
      </motion.div>
      <motion.div 
        animate={{ scale: [1, 1.2, 1] }} 
        transition={{ repeat: Infinity, duration: 2 }}
        className="absolute bottom-24 right-12 text-rose-300 hidden md:block"
      >
        <Heart size={80} fill="currentColor" />
      </motion.div>
      <motion.div 
        animate={{ rotate: 360 }} 
        transition={{ repeat: Infinity, duration: 20, ease: "linear" }}
        className="absolute top-24 right-24 text-emerald-300 hidden md:block"
      >
        <Sparkles size={60} />
      </motion.div>

      {/* Header */}
      <motion.div 
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="text-center mb-12 z-10 w-full mt-12 md:mt-0"
      >
        <div className="inline-block bg-white px-6 py-2 rounded-full shadow-sm mb-6 border-2 border-sky-100 text-sky-600 font-bold uppercase tracking-widest text-sm md:text-base">
          {t("Welcome to KiputRevive!", "Selamat Datang ke KiputRevive!")}
        </div>
        <h1 className="text-5xl md:text-7xl lg:text-8xl font-black text-stone-800 tracking-tight drop-shadow-sm flex flex-col md:flex-row items-center justify-center gap-4 mb-4">
          {t("Let's Learn!", "Mari Belajar!")} <Sparkles className="text-amber-400" size={56} />
        </h1>
        <p className="text-xl md:text-2xl text-stone-500 font-bold max-w-2xl mx-auto">
          {t("Choose an adventure below to start playing.", "Pilih pengembaraan di bawah untuk mula bermain.")}
        </p>
      </motion.div>

      {/* Big Chunky Buttons for Kids */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full max-w-4xl z-10">
        {/* Play & Learn Card */}
        <Link to="/learn" className="block focus:outline-none">
          <motion.div 
            whileHover={{ scale: 1.05, y: -5 }}
            whileTap={{ scale: 0.95 }}
            className="bg-emerald-400 p-8 rounded-[3rem] shadow-[0_12px_0_0_#059669] active:shadow-[0_0px_0_0_#059669] active:translate-y-[12px] transition-all border-4 border-emerald-500 flex flex-col items-center justify-center h-72 text-white relative overflow-hidden group"
          >
            <div className="bg-white/20 p-8 rounded-full mb-6 group-hover:scale-110 group-hover:bg-white/30 transition-all">
              <Play size={80} fill="currentColor" className="ml-2" />
            </div>
            <h2 className="text-4xl md:text-5xl font-black tracking-wide drop-shadow-md">{t("Play Games", "Main Permainan")}</h2>
          </motion.div>
        </Link>

        {/* Story Time Card */}
        <Link to="/stories" className="block focus:outline-none">
          <motion.div 
            whileHover={{ scale: 1.05, y: -5 }}
            whileTap={{ scale: 0.95 }}
            className="bg-amber-400 p-8 rounded-[3rem] shadow-[0_12px_0_0_#d97706] active:shadow-[0_0px_0_0_#d97706] active:translate-y-[12px] transition-all border-4 border-amber-500 flex flex-col items-center justify-center h-72 text-white relative overflow-hidden group"
          >
            <div className="bg-white/20 p-8 rounded-full mb-6 group-hover:scale-110 group-hover:bg-white/30 transition-all">
              <BookOpen size={80} fill="currentColor" />
            </div>
            <h2 className="text-4xl md:text-5xl font-black tracking-wide drop-shadow-md">{t("Story Time", "Masa Bercerita")}</h2>
          </motion.div>
        </Link>

        {/* Dictionary Card (Full Width) */}
        <Link to="/dictionary" className="block md:col-span-2 focus:outline-none">
          <motion.div 
            whileHover={{ scale: 1.02, y: -5 }}
            whileTap={{ scale: 0.98 }}
            className="bg-sky-400 p-8 rounded-[3rem] shadow-[0_12px_0_0_#0284c7] active:shadow-[0_0px_0_0_#0284c7] active:translate-y-[12px] transition-all border-4 border-sky-500 flex flex-col sm:flex-row items-center justify-center gap-8 h-auto sm:h-56 text-white relative overflow-hidden group mt-2"
          >
            <div className="bg-white/20 p-8 rounded-full group-hover:scale-110 group-hover:bg-white/30 transition-all">
              <Search size={64} strokeWidth={3} />
            </div>
            <div className="text-center sm:text-left">
              <h2 className="text-4xl md:text-5xl font-black tracking-wide mb-2 drop-shadow-md">{t("Magic Words", "Perkataan Ajaib")}</h2>
              <p className="text-sky-100 font-bold text-xl md:text-2xl">{t("Find Kiput meanings!", "Cari maksud Kiput!")}</p>
            </div>
          </motion.div>
        </Link>
      </div>

      {/* Parents Corner & Meet Kiput */}
      <div className="mt-16 z-10 pb-8 flex flex-col md:flex-row gap-4 items-center justify-center">
        <Link to="/contribute" className="text-stone-500 font-bold hover:text-stone-800 transition-colors bg-white/80 backdrop-blur-sm px-8 py-4 rounded-3xl border-2 border-stone-200 shadow-sm flex items-center gap-3 hover:bg-white text-lg">
          👨‍👩‍👧 {t("Parents & Teachers Zone", "Zon Ibu Bapa & Guru")}
        </Link>
        <Link to="/meet-kiput" className="text-amber-600 font-bold hover:text-amber-800 transition-colors bg-amber-100/80 backdrop-blur-sm px-8 py-4 rounded-3xl border-2 border-amber-200 shadow-sm flex items-center gap-3 hover:bg-amber-100 text-lg">
          👋 {t("Meet Kiput", "Kenali Kiput")}
        </Link>
      </div>
    </div>
  );
};
