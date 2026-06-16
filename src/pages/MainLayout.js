import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import ssnLogo from "../assets/ssn-logo.png";
import nssLogo from "../assets/Nss-logo.png";
import {
  Award,
  Users,
  Mail,
  Menu,
  X,
  TentTree,
  Image,
  HeartHandshake,
  Calendar, 
  Home,
} from "lucide-react";
import "../pages/Home.css";

const MainLayout = ({ children }) => {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <>
      {/* ===== BANNER ===== */}
      <div className="banner">
        <img src={ssnLogo} alt="SSN Logo" className="logo" />

        <div className="college-info">
          <h1>National Service Scheme (NSS)</h1>
          <h2>
            Sri Sivasubramaniya Nadar College of Engineering, Kalavakkam - 603110
          </h2>
          <p>(Autonomous, Anna University)</p>
          <div className="time-display">{currentTime.toLocaleString()}</div>
        </div>

        <img src={nssLogo} alt="NSS Logo" className="nss-logo" />
      </div>

      {/* ===== ANNOUNCEMENT ===== */}
      <div className="announcement-bar">
        🌟 Maintenance Visit – Sept 23 • 📢 Team Meet – Sept 23 • 🎉 Orientation – Sept 24
      </div>

      {/* ===== NAVBAR ===== */}
      <nav className="top-nav">
        <button className="hamburger" onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <X /> : <Menu />}
        </button>

        <ul className={`nav-list ${isOpen ? "open" : ""}`}>
          <li><Link to="/">
           <Home size={18}/> Home
          </Link>
          </li>

          <li>
            <Link to="/achievements">
              <Award size={18} /> Achievements
            </Link>
          </li>

          <li>
            <Link to="/activities">
              <Calendar size={18} /> Events
            </Link>
          </li>


          {/* ===== ANNUAL CAMP DROPDOWN ===== */}
          <li className="dropdown">
            <span className="dropdown-trigger">
              <TentTree size={18} /> Annual Camp ▾
            </span>
            <ul className="dropdown-menu">
              <li><Link to="/annualcamp/2024-2025">📅 2024–2025</Link></li>
              <li><Link to="/annualcamp/2025-2026">📅 2025–2026</Link></li>
            </ul>
          </li>

          {/* ===== TEAMS DROPDOWN ===== */}
          <li className="dropdown">
            <span className="dropdown-trigger">
              <Users size={18} /> Teams ▾
            </span>
            <ul className="dropdown-menu">
              <li><Link to="/teams/core">Core Team</Link></li>
              <li><Link to="/teams/volunteers">Volunteers</Link></li>
            </ul>
          </li>

          {/* ===== CLUBS DROPDOWN ===== */}
          <li className="dropdown">
            <span className="dropdown-trigger">
              <HeartHandshake size={18} /> Clubs ▾
            </span>
            <ul className="dropdown-menu">
              <li><Link to="/clubs/Nature">Nature Club</Link></li>
              <li><Link to="/clubs/Sustainability">Sustainability Club</Link></li>
              <li><Link to="/clubs/Electoral">Electoral Club</Link></li>
              <li><Link to="/clubs/Tulir">Tulir Club</Link></li>
              <li><Link to="/clubs/WISEWing">WISE Wing</Link></li>
              <li><Link to="/clubs/DrugAwareness">Drug Awareness Club</Link></li>
            </ul>
          </li>

          <li>
            <Link to="/gallery">
              <Image size={18} /> Gallery
            </Link>
          </li>

          <li>
            <Link to="/contact">
              <Mail size={18} /> Contact
            </Link>
          </li>
        </ul>
        <div className="login-button">
          <Link to="/login">
            <button className="login-btn">Login</button>
          </Link>
        </div>
      </nav>

      {/* ===== PAGE CONTENT ===== */}
      <main>{children}</main>
    </>
  );
};

export default MainLayout;
