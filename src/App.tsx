import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider, CssBaseline } from '@mui/material';
import { useAppStore } from './store/useAppStore';
import { lightTheme, darkTheme } from './styles/theme';
import { MainLayout } from './components/templates';
import {
  HomePage,
  MarrHildrethPage,
  CannyPage,
  BoxFiltersPage,
  FreemanChainPage,
  WatershedPage,
  OtsuPage,
  CountingPage,
  SegmentationPage,
} from './pages';

function App() {
  const themeMode = useAppStore((state) => state.themeMode);
  const theme = themeMode === 'light' ? lightTheme : darkTheme;

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <MainLayout>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/marr-hildreth" element={<MarrHildrethPage />} />
            <Route path="/canny" element={<CannyPage />} />
            <Route path="/box-filters" element={<BoxFiltersPage />} />
            <Route path="/freeman-chain" element={<FreemanChainPage />} />
            <Route path="/watershed" element={<WatershedPage />} />
            <Route path="/otsu" element={<OtsuPage />} />
            <Route path="/counting" element={<CountingPage />} />
            <Route path="/segmentation" element={<SegmentationPage />} />
          </Routes>
        </MainLayout>
      </Router>
    </ThemeProvider>
  );
}

export default App;
