import { Link, Outlet, useLocation } from "react-router";
import { Menu, X, BookOpen, Feather, Languages, MessageSquarePlus, Home } from "lucide-react";
import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

function cn(...inputs: (string | undefined | null | false)[]) {
  return twMerge(clsx(inputs));
}

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const links = [
    { name: "Home", path: "/", icon: Home },
    { name: "Learn", path: "/learn", icon: BookOpen },
    { name: "Stories", path: "/stories", icon: Feather },
    { name: "Dictionary", path: "/dictionary", icon: Languages },
    { name: "Contribute", path: "/contribute", icon: MessageSquarePlus },
  ];

  return (
    <nav className="sticky top-0 z-50 bg-stone-900/95 backdrop-blur-sm border-b border-stone-800 text-stone-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="flex items-center gap-2 font-bold text-xl tracking-wide text-emerald-400">
            <Feather className="h-6 w-6" />
            <span>KIPUT<span className="text-stone-100">REVIVE</span></span>
            <span className="bg-emerald-900/50 text-emerald-400 text-[10px] px-2 py-0.5 rounded border border-emerald-800 ml-1 uppercase tracking-wider">Beta</span>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-1">
            {links.map((link) => {
              const isActive = location.pathname === link.path;
              const Icon = link.icon;
              return (
                <Link
                  key={link.name}
                  to={link.path}
                  className={cn(
                    "px-4 py-2 rounded-md text-sm font-medium transition-colors flex items-center gap-2",
                    isActive
                      ? "bg-stone-800 text-emerald-400"
                      : "text-stone-300 hover:bg-stone-800 hover:text-white"
                  )}
                >
                  <Icon className="h-4 w-4" />
                  {link.name}
                </Link>
              );
            })}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 rounded-md text-stone-400 hover:text-white hover:bg-stone-800 focus:outline-none"
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-stone-900 border-b border-stone-800"
          >
            <div className="px-2 pt-2 pb-3 space-y-1">
              {links.map((link) => {
                const isActive = location.pathname === link.path;
                const Icon = link.icon;
                return (
                  <Link
                    key={link.name}
                    to={link.path}
                    onClick={() => setIsOpen(false)}
                    className={cn(
                      "block px-3 py-2 rounded-md text-base font-medium flex items-center gap-3",
                      isActive
                        ? "bg-stone-800 text-emerald-400"
                        : "text-stone-300 hover:bg-stone-800 hover:text-white"
                    )}
                  >
                    <Icon className="h-5 w-5" />
                    {link.name}
                  </Link>
                );
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

const Footer = () => (
  <footer className="bg-stone-950 text-stone-400 py-8 border-t border-stone-900">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row justify-between items-center gap-4">
      <div className="text-center md:text-left">
        <h3 className="text-lg font-semibold text-stone-100 mb-1">Kiput Language Project</h3>
        <p className="text-sm">Preserving heritage through technology.</p>
      </div>
      <div className="flex gap-6 text-sm">
        <a href="#" className="hover:text-emerald-400 transition-colors">About</a>
        <a href="#" className="hover:text-emerald-400 transition-colors">Privacy</a>
        <a href="#" className="hover:text-emerald-400 transition-colors">Contact</a>
      </div>
      <div className="text-sm text-stone-600">
        &copy; {new Date().getFullYear()} Indigenous Tech Initiative
      </div>
    </div>
  </footer>
);

export const Layout = () => {
  return (
    <div className="min-h-screen bg-stone-50 flex flex-col font-sans text-stone-900">
      <Navbar />
      <main className="flex-grow">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};
