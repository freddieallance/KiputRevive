import { Link, Outlet, useLocation } from "react-router";
import { BookOpen, Feather, Languages, MessageSquarePlus, Home } from "lucide-react";
import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { useEffect } from "react";
import { useLanguage } from "../context/LanguageContext";

function cn(...inputs: (string | undefined | null | false)[]) {
  return twMerge(clsx(inputs));
}

const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
};

const Navbar = () => {
  const location = useLocation();
  const { t, language, setLanguage } = useLanguage();

  const links = [
    { name: t("Home", "Laman Utama"), path: "/", icon: Home },
    { name: t("Learn", "Belajar"), path: "/learn", icon: BookOpen },
    { name: t("Stories", "Cerita"), path: "/stories", icon: Feather },
    { name: t("Dictionary", "Kamus"), path: "/dictionary", icon: Languages },
    { name: t("Contribute", "Sumbangan"), path: "/contribute", icon: MessageSquarePlus },
  ];

  return (
    <>
      {/* Top Navbar (Desktop only) */}
      <nav className="hidden md:block sticky top-0 z-50 bg-stone-900/95 backdrop-blur-sm border-b border-stone-800 text-stone-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <Link to="/" className="flex items-center gap-2 font-bold text-xl tracking-wide text-emerald-400">
              <Feather className="h-6 w-6" />
              <span>KIPUT<span className="text-stone-100">REVIVE</span></span>
              <span className="bg-emerald-900/50 text-emerald-400 text-[10px] px-2 py-0.5 rounded border border-emerald-800 ml-1 uppercase tracking-wider">Beta</span>
            </Link>

            <div className="flex items-center space-x-1">
              {links.map((link) => {
                const isActive = location.pathname === link.path;
                const Icon = link.icon;
                return (
                  <Link
                    key={link.path}
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
              <div className="pl-4 ml-2 border-l border-stone-700">
                <button
                  onClick={() => setLanguage(language === 'en' ? 'bm' : 'en')}
                  className="px-3 py-1.5 rounded-md text-sm font-medium transition-colors flex items-center gap-2 text-stone-300 hover:bg-stone-800 hover:text-white"
                >
                  <Languages className="h-4 w-4" />
                  {language === 'en' ? 'BM' : 'EN'}
                </button>
              </div>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Top Header (Logo only) */}
      <div className="md:hidden sticky top-0 z-50 bg-stone-900/95 backdrop-blur-sm border-b border-stone-800 text-stone-100 h-14 flex items-center justify-between px-4">
        <Link to="/" className="flex items-center gap-2 font-bold text-lg tracking-wide text-emerald-400">
          <Feather className="h-5 w-5" />
          <span>KIPUT<span className="text-stone-100">REVIVE</span></span>
        </Link>
        <button
          onClick={() => setLanguage(language === 'en' ? 'bm' : 'en')}
          className="px-2 py-1 rounded-md text-xs font-medium transition-colors flex items-center gap-1 text-stone-300 hover:bg-stone-800 hover:text-white"
        >
          <Languages className="h-4 w-4" />
          {language === 'en' ? 'BM' : 'EN'}
        </button>
      </div>

      {/* Bottom Navigation (Mobile only) */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-stone-900/95 backdrop-blur-md border-t border-stone-800 pb-safe">
        <div className="flex items-center justify-around h-16 px-2">
          {links.map((link) => {
            const isActive = location.pathname === link.path;
            const Icon = link.icon;
            return (
              <Link
                key={link.path}
                to={link.path}
                className={cn(
                  "flex flex-col items-center justify-center w-full h-full space-y-1 transition-colors",
                  isActive ? "text-emerald-400" : "text-stone-400 hover:text-stone-200"
                )}
              >
                <Icon className={cn("h-5 w-5", isActive && "fill-emerald-400/20")} />
                <span className="text-[10px] font-medium">{link.name}</span>
              </Link>
            );
          })}
        </div>
      </nav>
    </>
  );
};

const Footer = () => {
  const { t } = useLanguage();
  return (
    <footer className="bg-stone-950 text-stone-400 py-8 border-t border-stone-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row justify-between items-center gap-4">
        <div className="text-center md:text-left">
          <h3 className="text-lg font-semibold text-stone-100 mb-1">{t("Kiput Language Project", "Projek Bahasa Kiput")}</h3>
          <p className="text-sm">{t("Preserving heritage through technology.", "Memelihara warisan melalui teknologi.")}</p>
        </div>
        <div className="flex gap-6 text-sm">
          <a href="#" className="hover:text-emerald-400 transition-colors">{t("About", "Tentang")}</a>
          <a href="#" className="hover:text-emerald-400 transition-colors">{t("Privacy", "Privasi")}</a>
          <a href="#" className="hover:text-emerald-400 transition-colors">{t("Contact", "Hubungi")}</a>
        </div>
        <div className="text-sm text-stone-600">
          &copy; {new Date().getFullYear()} {t("Indigenous Tech Initiative", "Inisiatif Teknologi Peribumi")}
        </div>
      </div>
    </footer>
  );
};

export const Layout = () => {
  return (
    <div className="min-h-screen bg-stone-50 flex flex-col font-sans text-stone-900 pb-16 md:pb-0">
      <ScrollToTop />
      <Navbar />
      <main className="flex-grow">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};
