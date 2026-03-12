import { Link } from "react-router";
import { motion } from "motion/react";
import { ArrowLeft, Users, MapPin, Heart } from "lucide-react";

export const MeetKiput = () => {
  return (
    <div className="min-h-screen bg-amber-50 pb-20">
      {/* Header */}
      <div className="bg-amber-400 p-6 md:p-8 rounded-b-[3rem] shadow-sm sticky top-0 z-20 border-b-4 border-amber-500">
        <div className="max-w-4xl mx-auto flex items-center gap-4">
          <Link to="/" className="bg-white p-3 rounded-full shadow-sm hover:scale-110 active:scale-95 transition-all text-amber-500">
            <ArrowLeft size={28} strokeWidth={3} />
          </Link>
          <h1 className="text-3xl md:text-5xl font-black text-white tracking-wide drop-shadow-md flex-1 text-center pr-12">
            Meet the Kiput
          </h1>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 mt-8 md:mt-12 space-y-8">
        
        {/* Intro Image */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-[2rem] p-4 md:p-6 shadow-sm border-2 border-stone-200"
        >
          <div className="relative h-64 md:h-96 rounded-[1.5rem] overflow-hidden mb-6">
            <img 
              src="/pictures/kiput.webp"
              alt="Kiput People"
              className="w-full h-full object-cover"
            />
          </div>
          <div className="text-center">
            <h2 className="text-2xl md:text-3xl font-bold text-stone-800 mb-4 flex justify-center items-center gap-2">
              <Users className="text-amber-500" /> The Kiput Community
            </h2>
            <p className="text-lg text-stone-600 font-medium max-w-2xl mx-auto">
              The Kiput people are a unique indigenous community from the beautiful island of Borneo. 
              Known for their strength, resilience, and rich cultural heritage.
            </p>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Map and Location */}
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-sky-50 rounded-[2rem] p-6 shadow-sm border-2 border-sky-200 flex flex-col items-center text-center"
          >
            <div className="bg-sky-200 p-4 rounded-full mb-4">
              <MapPin size={40} className="text-sky-600" />
            </div>
            <h3 className="text-2xl font-black text-sky-800 mb-4">Where They Live</h3>
            <div className="relative w-full h-48 rounded-[1.5rem] overflow-hidden mb-4 border-2 border-sky-300">
              <img 
                src="/pictures/baram.png"
                alt="Baram River Map"
                className="w-full h-full object-cover"
              />
            </div>
            <p className="text-sky-900 font-medium">
              They live along the scenic banks of the <strong>Baram River</strong> in Northern Sarawak, Malaysia. The river is the heart of their daily life!
            </p>
          </motion.div>

          {/* Population Info */}
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-rose-50 rounded-[2rem] p-6 shadow-sm border-2 border-rose-200 flex flex-col items-center justify-center text-center"
          >
            <div className="bg-rose-200 p-4 rounded-full mb-4">
              <Heart size={40} className="text-rose-600" />
            </div>
            <h3 className="text-2xl font-black text-rose-800 mb-4">Current Population</h3>
            <div className="text-6xl md:text-7xl font-black text-rose-500 mb-4 drop-shadow-sm">
              ~2,500
            </div>
            <p className="text-rose-900 font-medium text-lg">
              Today, there are around 2,500 Kiput people. They are a small but incredibly proud community, working hard to keep their language and traditions alive.
            </p>
          </motion.div>
        </div>

      </div>
    </div>
  );
};
