import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LandingPage from './LandingPage';
import ContactPage from './ContactPage';
import PrivacyPage from './PrivacyPage';
import GamesPage from './GamesPage';
import ArcadePage from './ArcadePage';
import PokerPage from './PokerPage';
import MagicPage from './MagicPage';
import './App.css';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/privacy" element={<PrivacyPage />} />
        <Route path="/games" element={<GamesPage />} />
        <Route path="/arcade" element={<ArcadePage />} />
        <Route path="/poker" element={<PokerPage />} />
        <Route path="/magic" element={<MagicPage />} />
        {/* <Route path="/jobs" element={<JobsPage />} /> */}
      </Routes>
    </Router>
  )
}

export default App;