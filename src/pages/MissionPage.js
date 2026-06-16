import './MissionPage.css'; 
import missionPhoto from '../assets/mission_photo.png';
import MainLayout from './MainLayout';

const MissionPage = () => {

  return (
    <MainLayout>
      <div className="mission-page-wrapper">
        
        {/* Hero Banner */}
        <div className="mission-hero">
          <h1>Our Mission</h1>
          <p className="mission-tagline">"Not Me, But You"</p>
        </div>

        {/* Mission Statement */}
        <section className="mission-section-content">
          <div className="mission-image-container">
            <img src={missionPhoto} alt="NSS Mission" />
          </div>
          <div className="mission-text">
            <h2>Bridging Campus & Community</h2>
            <p>
              The National Service Scheme (NSS) is an integral part of the higher education system, 
              functioning as the extension dimension envisioned by the University Grants Commission. 
              NSS bridges the gap between campus and community, enabling students to step beyond 
              classrooms and actively engage with society.
            </p>
            <p>
              Our mission is to instill social responsibility, empathy, leadership, and civic sense 
              among students by involving them in meaningful community service activities in both 
              urban and rural areas.
            </p>
          </div>
        </section>

        {/* Philosophy */}
        <section className="philosophy-section">
          <h2>Our Philosophy</h2>
          <p>
            Guided by the philosophy <strong>"Not Me, But You"</strong>, NSS emphasizes selfless service, 
            democratic living, dignity of labour, and collective growth. Through sustained service, 
            volunteers undergo attitude change, behavior modification, improved communication, 
            confidence, and character building.
          </p>
          <div className="philosophy-values">
            <div className="value-badge">Selfless Service</div>
            <div className="value-badge">Democratic Living</div>
            <div className="value-badge">Dignity of Labour</div>
            <div className="value-badge">Collective Growth</div>
          </div>
        </section>

        {/* Core Objectives */}
        <section className="objectives-section-content">
          <h2>Core Objectives</h2>
          <div className="objectives-grid">
            <div className="objective-item">
              <span className="objective-icon">🤝</span>
              <h3>Community Development</h3>
              <p>Social outreach and community engagement</p>
            </div>
            <div className="objective-item">
              <span className="objective-icon">🌱</span>
              <h3>Environmental Conservation</h3>
              <p>Sustainability and green initiatives</p>
            </div>
            <div className="objective-item">
              <span className="objective-icon">🏥</span>
              <h3>Health & Awareness</h3>
              <p>Hygiene and wellness programs</p>
            </div>
            <div className="objective-item">
              <span className="objective-icon">🇮🇳</span>
              <h3>National Integration</h3>
              <p>Civic engagement and unity</p>
            </div>
            <div className="objective-item">
              <span className="objective-icon">✨</span>
              <h3>Personality Development</h3>
              <p>Growth through service</p>
            </div>
          </div>
        </section>

        {/* How We Serve */}
        <section className="service-section">
          <h2>How We Serve</h2>
          <p>
            Our activities span across diverse fields, including environmental sustainability, 
            rural development, education, health, and gender awareness. Through NSS, students 
            participate in:
          </p>
          <ul className="service-activities">
            <li>
              <span className="activity-icon">🌿</span>
              <span>Tree Plantation Drives</span>
            </li>
            <li>
              <span className="activity-icon">🏥</span>
              <span>Blood Donation Camps</span>
            </li>
            <li>
              <span className="activity-icon">📚</span>
              <span>Teaching Programs in Villages</span>
            </li>
            <li>
              <span className="activity-icon">🧹</span>
              <span>Clean-Up and Sanitation Initiatives</span>
            </li>
            <li>
              <span className="activity-icon">📣</span>
              <span>Awareness Campaigns</span>
            </li>
          </ul>
        </section>

        {/* Team Message */}
        <section className="message-section-content">
          <h2>Message from our NSS Team</h2>
          <blockquote>
            "The true education of an engineer lies in how they use their skills to serve and 
            uplift others. NSS helps students not only grow but give back — responsibly and 
            passionately."
          </blockquote>
        </section>

      </div>
    </MainLayout>
  );
};

export default MissionPage;