import { RouterProvider } from 'react-router';
import { router } from './routes';
import { Toaster } from 'sonner';
import { TranslationBot } from './components/TranslationBot';

function App() {
  return (
    <>
      <RouterProvider router={router} />
      <Toaster position="top-center" richColors />
      <TranslationBot />
    </>
  );
}

export default App;
