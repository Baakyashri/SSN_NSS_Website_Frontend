import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import "./ClubsPage.css";
import MainLayout from "./MainLayout";

/* ============================
   CLUBS DATA
============================ */

const clubsData = {
  nature: {
    name: "🌿 Nature Club",
    color: "#10b981",
    vision:
      "To foster a campus environment where the presence and well-being of diverse animal and bird species are protected, celebrated, and sustained.",
    objectives: [
      "Restore and protect natural habitats on campus",
      "Support campus biodiversity and wildlife conservation",
      "Promote awareness about coexistence with nature",
      "Collaborate with environmental experts and organizations",
    ],
    activities: [
      { icon: "📸", title: "Wildlife Photography Initiatives", desc: "Documenting campus biodiversity" },
      { icon: "🍽️", title: "Food & Water Stations", desc: "Feeding stations for birds and animals" },
      { icon: "🏠", title: "Nesting Boxes Installation", desc: "Safe nesting across campus" },
      { icon: "💰", title: "Fundraising Activities", desc: "Support for campus animals" },
      { icon: "🐾", title: "Animal Shelter Visits", desc: "Visits to local shelters" },
      { icon: "🎤", title: "Expert Talks", desc: "Sessions by environmentalists" },
    ],
  },

  sustainability: {
    name: "♻️ Sustainability Club",
    color: "#0ea5e9",
    vision:
      "To inspire students to understand and apply Sustainable Development Goals (SDGs) and adopt sustainable practices.",
    objectives: [
      "Promote environmental responsibility",
      "Reduce resource consumption",
      "Spread awareness on climate change",
      "Encourage sustainable technologies",
    ],
    activities: [
      { icon: "🎉", title: "Sustainability Week", desc: "Week-long awareness events" },
      { icon: "👣", title: "Carbon Footprint", desc: "Measuring environmental impact" },
      { icon: "🌍", title: "SDG Awareness", desc: "Educational sessions" },
      { icon: "♻️", title: "Best Out of Waste", desc: "Recycling competitions" },
      { icon: "📱", title: "Digital Campaigns", desc: "Online sustainability outreach" },
    ],
  },

  electoral: {
    name: "🗳️ Electoral Club",
    color: "#f59e0b",
    vision:
      "To empower college students with awareness of the electoral process and foster civic participation.",
    objectives: [
      "Encourage democratic participation",
      "Promote voter registration",
      "Educate on voting rights",
      "Strengthen civic responsibility",
    ],
    activities: [
      { icon: "🆔", title: "Voter ID Drives", desc: "Helping students register" },
      { icon: "🗳️", title: "Mock Elections", desc: "Campus elections" },
      { icon: "🎤", title: "Awareness Talks", desc: "Democracy sessions" },
      { icon: "❓", title: "Quizzes", desc: "Interactive civic quizzes" },
      { icon: "📊", title: "Surveys", desc: "Electoral awareness surveys" },
    ],
  },

  tulir: {
    name: "🌾 Tulir Club (Organic Farming)",
    color: "#84cc16",
    vision:
      "To inspire organic farming and eco-friendly agricultural practices.",
    objectives: [
      "Educate on organic farming",
      "Hands-on farming experience",
      "Promote sustainable food",
      "Collaborate with farmers",
    ],
    activities: [
      { icon: "🌱", title: "Organic Plots", desc: "Campus farming plots" },
      { icon: "👨‍🌾", title: "Workshops", desc: "Practical farming training" },
      { icon: "🚜", title: "Farm Visits", desc: "Field exposure" },
      { icon: "🎊", title: "Harvest Festivals", desc: "Celebrating harvest" },
      { icon: "📚", title: "Guest Lectures", desc: "Agriculture experts" },
    ],
  },

  wisewing: {
    name: "👩‍🦰 WISE Wing",
    color: "#ec4899",
    vision:
      "To build a society where women are empowered and valued contributors.",
    mission:
      "To create a supportive platform fostering equality, leadership, and inclusivity.",
    objectives: [
      "Safe campus environment",
      "Women's rights awareness",
      "Leadership development",
      "Support underprivileged women",
    ],
    activities: [
      { icon: "📢", title: "Awareness Campaigns", desc: "Women's issues" },
      { icon: "🏥", title: "Health Programs", desc: "Hygiene & health" },
      { icon: "🎗️", title: "Cancer Awareness", desc: "Early detection education" },
      { icon: "💼", title: "Skill Workshops", desc: "Professional skills" },
    ],
  },

  drugawareness: {
    name: "🚫 Drug Awareness Club",
    color: "#ef4444",
    vision:
      "To create a drug-free campus and educate students about substance abuse.",
    objectives: [
      "Drug abuse awareness",
      "Support systems",
      "Preventive education",
      "Healthcare collaboration",
    ],
    activities: [
      { icon: "📚", title: "Educational Sessions", desc: "Prevention talks" },
      { icon: "🎬", title: "Documentary Screenings", desc: "Impact films" },
      { icon: "🤝", title: "Peer Support", desc: "Student networks" },
      { icon: "👨‍⚕️", title: "Expert Consultations", desc: "Medical guidance" },
      { icon: "📝", title: "Campaigns", desc: "Posters & outreach" },
    ],
  },
};

/* ============================
   COMPONENT
============================ */

const ClubsPage = () => {
  const { clubName } = useParams(); // ✅ SAFE
  const [activeClub, setActiveClub] = useState("nature");

  useEffect(() => {
    if (clubName && clubsData[clubName.toLowerCase()]) {
      setActiveClub(clubName.toLowerCase());
    }
  }, [clubName]);

  const club = clubsData[activeClub];

  return (
    <MainLayout>
      <div className="clubs-page">

        {/* CLUB SELECTOR */}
        <div className="club-selector">
          {Object.keys(clubsData).map((key) => (
            <button
              key={key}
              className={`club-selector-btn ${activeClub === key ? "active" : ""}`}
              onClick={() => setActiveClub(key)}
              style={{
                borderColor: activeClub === key ? clubsData[key].color : "#003366",
              }}
            >
              {clubsData[key].name}
            </button>
          ))}
        </div>

        {/* CLUB CONTENT */}
        <div className="club-content">

          <div
            className="club-header"
            style={{ backgroundColor: club.color }}
          >
            <h1>{club.name}</h1>
          </div>

          <div className="club-section">
            <h2>Vision</h2>
            <p>{club.vision}</p>
          </div>

          {club.mission && (
            <div className="club-section">
              <h2>Mission</h2>
              <p>{club.mission}</p>
            </div>
          )}

          <div className="club-section">
            <h2>Objectives</h2>
            <div className="objectives-list">
              {club.objectives.map((o, i) => (
                <div key={i} className="objective-item">
                  <span className="check-mark">✓</span>
                  <p>{o}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="club-section">
            <h2>Our Activities</h2>
            <div className="activities-grid">
              {club.activities.map((a, i) => (
                <div
                  key={i}
                  className="activity-card"
                  style={{ borderLeftColor: club.color }}
                >
                  <div className="activity-icon">{a.icon}</div>
                  <h3>{a.title}</h3>
                  <p>{a.desc}</p>
                </div>
              ))}
            </div>
          </div>

          <div
            className="club-cta"
            style={{ backgroundColor: club.color }}
          >
            <h2>Join {club.name}</h2>
            <p>Be part of our mission and make a meaningful impact!</p>
          </div>

        </div>
      </div>
    </MainLayout>
  );
};

export default ClubsPage;
