import { Toast } from '@radix-ui/react-toast';
import ScrollToTop from './hooks/scroll-to-top';
import AppProvider from './providers';
import AppRouter from './routes';
import SpinAll from './components/spinAll';

export default function App() {
  return (
    <div>
      <AppProvider>
        <ScrollToTop />
        <AppRouter />
        <SpinAll />
      </AppProvider>
    </div>
  );
}
