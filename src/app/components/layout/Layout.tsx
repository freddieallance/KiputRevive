import { Link, Outlet, useLocation } from "react-router";
import { Menu, X, Globe, BookOpen, Mic, Home as HomeIcon, Sparkles } from "lucide-react";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";

export function Layout() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  // Close mobile menu on route change
  useEffect(() => {
    setIsMenuOpen(false);
  }, [location.pathname]);

  const navItems = [
    { path: "/", label: "Home", icon: HomeIcon },
    { path: "/learn", label: "Learn", icon: BookOpen },
    { path: "/stories", label: "Stories", icon: Sparkles },
    { path: "/tools", label: "AI Tools", icon: Mic },
  ];

  return (
    <div className="min-h-screen bg-stone-50 text-stone-900 font-sans flex flex-col">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-stone-50/90 backdrop-blur-md border-b border-stone-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <Link to="/" className="flex items-center gap-2 group">
              <div className="w-10 h-10 bg-emerald-700 rounded-lg flex items-center justify-center text-white shadow-sm group-hover:bg-emerald-800 transition-colors">
                <Globe size={20} />
              </div>
              <div className="flex flex-col">
                <span className="font-bold text-lg leading-none tracking-tight text-emerald-900">Kiput Heritage</span>
                <span className="text-xs text-stone-500 font-medium">Language Preservation</span>
              </div>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center gap-8">
              {navItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`flex items-center gap-2 text-sm font-medium transition-colors py-2 px-3 rounded-md ${
                    location.pathname === item.path
                      ? "text-emerald-700 bg-emerald-50"
                      : "text-stone-600 hover:text-emerald-700 hover:bg-stone-100"
                  }`}
                >
                  <item.icon size={16} />
                  {item.label}
                </Link>
              ))}
              <button className="bg-emerald-700 hover:bg-emerald-800 text-white px-4 py-2 rounded-full text-sm font-medium transition-colors shadow-sm">
                Donate
              </button>
            </nav>

            {/* Mobile Menu Button */}
            <button
              className="md:hidden p-2 text-stone-600 hover:text-emerald-700 transition-colors"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-label="Toggle menu"
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Navigation Overlay */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-white border-b border-stone-200 overflow-hidden"
          >
            <div className="px-4 py-4 space-y-2">
              {navItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`flex items-center gap-3 px-4 py-3 rounded-lg text-base font-medium transition-colors ${
                    location.pathname === item.path
                      ? "bg-emerald-50 text-emerald-800"
                      : "text-stone-600 hover:bg-stone-50"
                  }`}
                >
                  <item.icon size={20} />
                  {item.label}
                </Link>
              ))}
              <div className="pt-4 border-t border-stone-100 mt-4">
                <button className="w-full bg-emerald-700 text-white py-3 rounded-lg font-medium shadow-sm active:scale-95 transition-transform">
                  Donate to Support
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Content */}
      <main className="flex-grow">
        <Outlet />
      </main>

      {/* Footer */}
      <footer className="bg-stone-900 text-stone-400 py-12 border-t border-stone-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="col-span-1 md:col-span-1">
              <div className="flex items-center gap-2 mb-4 text-white">
                <Globe size={24} />
                <span className="font-bold text-xl">Kiput Heritage</span>
              </div>
              <p className="text-sm leading-relaxed">
                Empowering the Kiput community through digital documentation, education, and AI-driven preservation tools.
              </p>
            </div>
            
            <div>
              <h3 className="text-white font-semibold mb-4">Resources</h3>
              <ul className="space-y-2 text-sm">
                <li><Link to="/learn" className="hover:text-emerald-400 transition-colors">Dictionary</Link></li>
                <li><Link to="/stories" className="hover:text-emerald-400 transition-colors">Folktales</Link></li>
                <li><Link to="/tools" className="hover:text-emerald-400 transition-colors">AI Archive Tools</Link></li>
              </ul>
            </div>

            <div>
              <h3 className="text-white font-semibold mb-4">Community</h3>
              <ul className="space-y-2 text-sm">
                <li><a href="#" className="hover:text-emerald-400 transition-colors">Workshops</a></li>
                <li><a href="#" className="hover:text-emerald-400 transition-colors">Contributions</a></li>
                <li><a href="#" className="hover:text-emerald-400 transition-colors">Elders Council</a></li>
              </ul>
            </div>

            <div>
              <h3 className="text-white font-semibold mb-4">Contact</h3>
              <p className="text-sm mb-2">Long Kiput, Baram, Sarawak</p>
              <p className="text-sm">contact@kiputheritage.org</p>
            </div>
          </div>
          <div className="mt-12 pt-8 border-t border-stone-800 text-xs text-center">
            <p>&copy; {new Date().getFullYear()} Indigenous Language Preservation Initiative. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
