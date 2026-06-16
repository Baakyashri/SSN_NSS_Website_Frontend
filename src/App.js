import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import MissionPage from "./pages/MissionPage";
import TeamsPage from "./pages/TeamsPage";
import InitiativesPage from "./pages/InitiativesPage";
import AchievementsPage from "./pages/AchievementsPage";
import AnnualCampPage from "./pages/AnnualCampPage";
import VolunteerStoriesPage from "./pages/VolunteerStoriesPage";
import AnnualReportPage from "./pages/AnnualReportPage";
import CollaboratorsPage from "./pages/CollaboratorsPage";
import ContactUsPage from "./pages/ContactUsPage";
import Login from "./pages/Login";
import AdminDashboard from "./pages/AdminDashboard";
import Gallery from "./pages/Gallery";
import ActivitiesPage from "./pages/ActivitiesPage";
import ResetPassword from "./pages/ResetPassword";
import ClubsPage from "./pages/ClubsPage";

function App() {
  return (
    <Router>
      <Routes>
        {/* ===== PUBLIC PAGES ===== */}
        <Route path="/" element={<Home />} />
        <Route path="/mission" element={<MissionPage />} />
        <Route path="/initiatives" element={<InitiativesPage />} />
        <Route path="/achievements" element={<AchievementsPage />} />
        <Route path="/annualcamp/:year" element={<AnnualCampPage />} />
        <Route path="/volunteer_stories" element={<VolunteerStoriesPage />} />
        <Route path="/annualreport" element={<AnnualReportPage />} />
        <Route path="/collaborators" element={<CollaboratorsPage />} />
        <Route path="/contact" element={<ContactUsPage />} />
        <Route path="/gallery" element={<Gallery />} />
        <Route path="/activities" element={<ActivitiesPage />} />

        {/* ===== TEAMS ROUTES ===== */}
        <Route path="/teams" element={<TeamsPage defaultTab="core" />} />
        <Route path="/teams/core" element={<TeamsPage defaultTab="core" />} />
        <Route path="/teams/volunteers" element={<TeamsPage defaultTab="volunteers" />} />

        {/* ===== CLUBS ROUTES ===== */}
        <Route path="/clubs" element={<ClubsPage />} />
        <Route path="/clubs/:clubName" element={<ClubsPage />} />

        {/* ===== AUTH / DASHBOARD ===== */}
        <Route path="/login" element={<Login />} />
        <Route path="/admin-dashboard" element={<AdminDashboard />} />
        <Route path="/reset-password/:token" element={<ResetPassword />} />
      </Routes>
    </Router>
  );
}

export default App;
