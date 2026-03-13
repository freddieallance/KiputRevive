import { RouterProvider } from 'react-router';
import { router } from './routes';
import { Toaster } from 'sonner';
import { TranslationBot } from './components/TranslationBot';
import { LanguageProvider } from './context/LanguageContext';

function App() {
  return (
    <LanguageProvider>
      <RouterProvider router={router} />
      <Toaster position="top-center" richColors />
      <TranslationBot />
    </LanguageProvider>
  );
}

export default App;
