import React, { useState } from "react";
import { Bar } from "react-chartjs-2";
import "./TeamsPage.css";
import MainLayout from "./MainLayout";

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

// const TeamsPage = ({ defaultTab = "core" }) => {
//   const [activeTab, setActiveTab] = useState(defaultTab);

/* ============================
   CORE TEAM DATA
============================ */

const coreTeamVerticals = {
  eventmanagement: {
    name: "🎯 Event Management",
    color: "#f59e0b",
    role:
      "The Event Management Vertical is responsible for the end-to-end coordination of NSS events, ensuring smooth execution and adherence to schedules, permissions, and logistics.",
    responsibilities: [
      {
        phase: "Before the Event",
        items: [
          "Confirm event date, time, and venue",
          "Coordinate with the Design Team for posters and publicity",
          "Inform Media and Photography teams",
          "Assess financial requirements and inform the Finance Team",
          "Arrange banners, tools, and permissions",
        ],
      },
      {
        phase: "After the Event",
        items: [
          "Ensure attendance is properly updated",
          "Confirm photo and video documentation",
          "Coordinate with Documentation Team for report submission",
          "Verify bill settlement with Finance Team",
        ],
      },
    ],
  },

  finance: {
    name: "💰 Finance",
    color: "#10b981",
    role:
      "The Finance Vertical manages budgeting, bill handling, and financial transparency for NSS activities.",
    responsibilities: [
      {
        phase: "Responsibilities",
        items: [
          "Budget planning for events",
          "Collecting and managing bills with proper bill numbers",
          "Uploading financial records",
          "Handling finances for offline events and annual camps",
        ],
      },
      {
        phase: "Key Principles",
        items: [
          "Responsible spending",
          "Proper documentation",
          "Accountability and transparency",
        ],
      },
    ],
  },

  photography: {
    name: "📸 Photography & Videography",
    color: "#06b6d4",
    role:
      "Documents all NSS activities visually for record-keeping and outreach.",
    responsibilities: [
      {
        phase: "Responsibilities",
        items: [
          "Capturing high-quality photos and videos during events",
          "Providing documentation photos for reports",
          "Supporting social media and archival needs",
        ],
      },
    ],
  },

  socialmedia: {
    name: "📱 Social Media",
    color: "#ec4899",
    role:
      "Manages all official NSS SSN social media handles and ensures consistent online engagement.",
    responsibilities: [
      {
        phase: "Responsibilities",
        items: [
          "Posting updates, reels, and stories for events",
          "Engaging students through quizzes and interactive content",
          "Maintaining Instagram, Facebook, YouTube, X (Twitter), and Linktree",
        ],
      },
    ],
  },

  technical: {
    name: "💻 Technical",
    color: "#6366f1",
    role:
      "The Technical Vertical manages the official NSS SSN website and digital infrastructure.",
    responsibilities: [
      {
        phase: "Responsibilities",
        items: [
          "Developing and maintaining the NSS website",
          "Updating events, teams, and activity data",
          "Fixing technical issues and ensuring smooth operation",
          "Coordinating with other verticals to upload content",
          "Managing basic backend and database updates",
        ],
      },
    ],
  },
};

/* ============================
   VOLUNTEERS DATA
============================ */

const volunteerOverview = {
  description:
    "Our volunteers are the backbone of NSS at SSN College. They actively participate in events, support communities, and contribute to social welfare initiatives.",
  responsibilities: [
    "Participate in NSS events and initiatives",
    "Support core verticals during events",
    "Maintain ethical conduct and teamwork",
    "Log attendance and contribution hours",
  ],
};

const monthlyContributions = {
  labels: [
    "Jan","Feb","Mar","Apr","May","Jun",
    "Jul","Aug","Sep","Oct","Nov","Dec",
  ],
  datasets: [
    {
      label: "Hours Contributed",
      data: [120, 100, 80, 150, 200, 170, 190, 210, 180, 160, 140, 130],
      backgroundColor: "#ffffff",
    },
  ],
};

/* ============================
   COMPONENT
============================ */

const TeamsPage = () => {
  const [activeTab, setActiveTab] = useState("core");
  const [activeVertical, setActiveVertical] = useState("eventmanagement");
  const [showAttendancePrompt, setShowAttendancePrompt] = useState(false);
  const [attendanceAccess, setAttendanceAccess] = useState(false);
  const [passcode, setPasscode] = useState("");

  const vertical = coreTeamVerticals[activeVertical];

  const handleAttendanceSubmit = () => {
    if (passcode === "SSN2025") {
      setAttendanceAccess(true);
      setShowAttendancePrompt(false);
      setPasscode("");
    } else {
      alert("Incorrect passcode");
      setPasscode("");
    }
  };

  return (
    <MainLayout>
      <div className="teams-page">
        <h2>NSS Teams</h2>

        {/* PAGE TABS */}
        <div className="teams-tabs-wrapper">
          <div className="team-tabs">
            <button
              className={activeTab === "core" ? "active" : ""}
              onClick={() => setActiveTab("core")}
            >
              Core Team
            </button>
            <button
              className={activeTab === "volunteers" ? "active" : ""}
              onClick={() => setActiveTab("volunteers")}
            >
              Volunteers
            </button>
          </div>
        </div>

        {/* ================= CORE TEAM ================= */}
        {activeTab === "core" && (
          <div className="core-team-new">

            <div className="core-intro-new">
              <p>
                NSS at SSN College operates through structured verticals that
                ensure planning, execution, documentation, and outreach are
                handled professionally and efficiently.
              </p>
            </div>

            {/* VERTICAL SELECTOR */}
            <div className="vertical-selector">
              {Object.keys(coreTeamVerticals).map((key) => (
                <button
                  key={key}
                  className={`vertical-selector-btn ${
                    activeVertical === key ? "active" : ""
                  }`}
                  onClick={() => setActiveVertical(key)}
                  style={{
                    borderColor:
                      activeVertical === key
                        ? coreTeamVerticals[key].color
                        : "#003366",
                  }}
                >
                  {coreTeamVerticals[key].name}
                </button>
              ))}
            </div>

            {/* VERTICAL CONTENT */}
            <div className="vertical-content">
              <div
                className="vertical-content-header"
                style={{ backgroundColor: vertical.color }}
              >
                <h1>{vertical.name}</h1>
              </div>

              <div className="vertical-section-content role-section">
                <h2>Role Overview</h2>
                <p>{vertical.role}</p>
              </div>

              <div className="vertical-section-content responsibilities-section">
                <h2>Responsibilities</h2>
                {vertical.responsibilities.map((resp, i) => (
                  <div key={i} className="responsibility-block">
                    <h3>{resp.phase}</h3>
                    <div className="responsibility-list">
                      {resp.items.map((item, j) => (
                        <div key={j} className="responsibility-item">
                          <span className="check-mark">✓</span>
                          <p>{item}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>

              <div
                className="vertical-cta"
                style={{ backgroundColor: vertical.color }}
              >
                <h2>Join {vertical.name}</h2>
                <p>
                  Be part of our operational excellence and make every NSS event
                  successful!
                </p>
              </div>
            </div>
          </div>
        )}

        {/* ================= VOLUNTEERS ================= */}
        {activeTab === "volunteers" && (
          <div className="volunteers-section">
            <div className="volunteer-intro">
              <p>{volunteerOverview.description}</p>
              <h4>Responsibilities</h4>
              <ul>
                {volunteerOverview.responsibilities.map((r, i) => (
                  <li key={i}>{r}</li>
                ))}
              </ul>
            </div>

            <div className="overview-cards">
              <div className="card">
                <h3>Total Volunteers</h3>
                <p>1300+</p>
              </div>
              <div className="card">
                <h3>Total Hours</h3>
                <p>1000+</p>
              </div>
              <div className="card">
                <h3>Events</h3>
                <p>250+</p>
              </div>
            </div>

            <div className="contributions-graph">
              <Bar
                data={monthlyContributions}
                options={{
                  responsive: true,
                  maintainAspectRatio: false,
                  plugins: { legend: { display: false } },
                }}
              />
            </div>

            <div className="attendance-section">
              {!attendanceAccess ? (
                <button
                  className="attendance-btn"
                  onClick={() => setShowAttendancePrompt(true)}
                >
                  View Attendance Sheets
                </button>
              ) : (
                <div className="attendance-links">
                  <h4>Select Year</h4>

                  <a
                    href="https://docs.google.com/spreadsheets/d/1HBx1zccr7rSksv-H9IbO2U292MaUhar70t-PUkQ_Ulc/edit?gid=1040787099#gid=1040787099"
                    className="attendance-btn"
                  >
                    📘 First Year Attendance
                  </a>

                  <a
                    href="https://docs.google.com/spreadsheets/d/1HBx1zccr7rSksv-H9IbO2U292MaUhar70t-PUkQ_Ulc/edit?gid=1040787099#gid=1040787099"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="attendance-btn"
                  >
                    📗 Second Year Attendance
                  </a>

                  <a
                    href="https://docs.google.com/spreadsheets/d/1DFk62phy0veBHnJj3saI96LiyS-zV3GYp92mnYSgt5k/edit?usp=sharing"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="attendance-btn"
                  >
                    📙 Third Year Attendance
                  </a>
                </div>
               
              )}
            </div>

            {showAttendancePrompt && (
              <div className="attendance-modal">
                <div className="modal-content">
                  <h4>Enter Passcode</h4>
                  <input
                    type="password"
                    value={passcode}
                    onChange={(e) => setPasscode(e.target.value)}
                  />
                  <div className="modal-buttons">
                    <button onClick={handleAttendanceSubmit}>Submit</button>
                    <button onClick={() => setShowAttendancePrompt(false)}>
                      Cancel
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </MainLayout>
  );
};

export default TeamsPage;
