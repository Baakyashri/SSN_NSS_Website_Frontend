import './InitiativesPage.css';
import MainLayout from './MainLayout';

const InitiativesPage = () => {
  return (
    <MainLayout>
      <div className="initiatives-wrapper">
        
        {/* Hero Section */}
        <div className="initiatives-hero">
          <h1>🚀 Recent Initiatives</h1>
          <p className="hero-tagline">Making a Difference, One Initiative at a Time</p>
        </div>

        {/* Introduction */}
        <section className="initiatives-intro">
          <p>
            The NSS unit actively conducts diverse programs and campaigns that address pressing social, 
            environmental, and civic issues. Our initiatives align with national missions and contribute 
            to sustainable development goals.
          </p>
        </section>

        {/* Recent Initiatives Grid */}
        <section className="recent-initiatives-section">
          <h2>What We've Recently Accomplished</h2>
          
          <div className="initiatives-grid">
            
            <div className="initiative-card">
              <div className="initiative-icon">🧹</div>
              <h3>Clean Campus & Coastal Clean-Up Drives</h3>
              <p>
                Regular cleaning drives across campus and coastal areas promote environmental hygiene 
                and create awareness about waste management. Volunteers actively engage in removing 
                plastic waste and promoting a cleaner, greener environment.
              </p>
              <div className="initiative-tag">Environmental Conservation</div>
            </div>

            <div className="initiative-card">
              <div className="initiative-icon">🚫</div>
              <h3>Drug Abuse Awareness Programs</h3>
              <p>
                Educational sessions and awareness campaigns to combat drug abuse among youth. These 
                programs focus on prevention, health impacts, and creating support systems for affected 
                individuals and families.
              </p>
              <div className="initiative-tag">Health & Awareness</div>
            </div>

            <div className="initiative-card">
              <div className="initiative-icon">🌳</div>
              <h3>Environmental Conservation Campaigns</h3>
              <p>
                Tree plantation drives, biodiversity awareness, and sustainable practices workshops. 
                Volunteers work towards creating green spaces and promoting ecological balance in 
                urban and rural areas.
              </p>
              <div className="initiative-tag">Sustainability</div>
            </div>

            <div className="initiative-card">
              <div className="initiative-icon">📚</div>
              <h3>Literacy & Health Awareness Programs</h3>
              <p>
                Community-based teaching programs and health camps targeting underserved populations. 
                These initiatives promote education, basic healthcare awareness, and preventive health 
                practices.
              </p>
              <div className="initiative-tag">Community Development</div>
            </div>

            <div className="initiative-card">
              <div className="initiative-icon">🗳️</div>
              <h3>Electoral Awareness & Voter Registration</h3>
              <p>
                Drives to promote democratic participation through voter registration camps and 
                electoral literacy. Volunteers educate citizens about their voting rights and the 
                importance of informed participation.
              </p>
              <div className="initiative-tag">Civic Engagement</div>
            </div>

          </div>
        </section>

        {/* Alignment with National Missions */}
        <section className="national-alignment-section">
          <h2>Aligned with National Missions</h2>
          <p>
            Our initiatives are strategically aligned with government programs and sustainable 
            development goals, ensuring maximum impact and nationwide relevance.
          </p>
          
          <div className="missions-grid">
            <div className="mission-badge">
              <span className="mission-icon">🇮🇳</span>
              <h4>Swachh Bharat</h4>
            </div>
            <div className="mission-badge">
              <span className="mission-icon">💪</span>
              <h4>Fit India</h4>
            </div>
            <div className="mission-badge">
              <span className="mission-icon">🎉</span>
              <h4>Azadi Ka Amrit Mahotsav</h4>
            </div>
            <div className="mission-badge">
              <span className="mission-icon">🌍</span>
              <h4>SDG Awareness</h4>
            </div>
          </div>
        </section>

        {/* Upcoming Initiatives */}
        <section className="upcoming-section">
          <h2>Up Next</h2>
          <p className="upcoming-intro">
            The NSS unit has exciting plans ahead that will continue to drive positive change and 
            community impact. Join us in these upcoming initiatives:
          </p>
          
          <div className="upcoming-list">
            
            <div className="upcoming-item">
              <div className="upcoming-number">01</div>
              <div className="upcoming-content">
                <h3>Special Residential NSS Camps</h3>
                <p>
                  7-day immersive camps in adopted villages and slums, focusing on community 
                  development, health awareness, and rural empowerment.
                </p>
              </div>
            </div>

            <div className="upcoming-item">
              <div className="upcoming-number">02</div>
              <div className="upcoming-content">
                <h3>Sustainability Week Activities</h3>
                <p>
                  Week-long series of events promoting sustainable practices, waste management, 
                  renewable energy awareness, and environmental conservation.
                </p>
              </div>
            </div>

            <div className="upcoming-item">
              <div className="upcoming-number">03</div>
              <div className="upcoming-content">
                <h3>Community Outreach Programs</h3>
                <p>
                  Targeted programs addressing specific community needs including education support, 
                  health camps, skill development, and livelihood enhancement.
                </p>
              </div>
            </div>

            <div className="upcoming-item">
              <div className="upcoming-number">04</div>
              <div className="upcoming-content">
                <h3>Leadership & Skill-Development Workshops</h3>
                <p>
                  Training sessions for volunteers focusing on leadership, communication, project 
                  management, and community engagement strategies.
                </p>
              </div>
            </div>

            <div className="upcoming-item">
              <div className="upcoming-number">05</div>
              <div className="upcoming-content">
                <h3>National-Level Youth Programs</h3>
                <p>
                  Participation in national integration camps, youth festivals, and collaborative 
                  programs that bring together NSS units from across India.
                </p>
              </div>
            </div>

          </div>
        </section>

        {/* Call to Action */}
        <section className="initiatives-cta">
          <h2>Be Part of the Change</h2>
          <p>
            Every initiative creates ripples of positive change. Join NSS and contribute to building 
            a better, more responsible society. Together, we can make a lasting impact.
          </p>
        </section>

      </div>
    </MainLayout>
  );
};

export default InitiativesPage;