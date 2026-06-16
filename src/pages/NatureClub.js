import './ClubDetailPage.css';
import MainLayout from './MainLayout';

const NatureTeamPage = () => {
  return (
    <MainLayout>
      <div className="team-detail-wrapper">
        
        {/* Hero Section */}
        <div className="team-detail-hero nature-bg">
          <div className="team-hero-icon">🌿</div>
          <h1>Nature Team</h1>
          <p className="hero-tagline">Protecting Campus Biodiversity</p>
        </div>

        {/* Vision */}
        <section className="vision-section">
          <h2>Vision</h2>
          <p>
            To foster a campus environment where the presence and well-being of diverse animal and bird 
            species are protected, celebrated, and sustained.
          </p>
        </section>

        {/* Objectives */}
        <section className="objectives-detail-section">
          <h2>Objectives</h2>
          <div className="objectives-list">
            <div className="objective-box">
              <span className="check-icon">✓</span>
              <p>Restore and protect natural habitats on campus</p>
            </div>
            <div className="objective-box">
              <span className="check-icon">✓</span>
              <p>Support campus biodiversity and wildlife conservation</p>
            </div>
            <div className="objective-box">
              <span className="check-icon">✓</span>
              <p>Promote awareness about coexistence with nature</p>
            </div>
            <div className="objective-box">
              <span className="check-icon">✓</span>
              <p>Collaborate with environmental experts and organizations</p>
            </div>
          </div>
        </section>

        {/* Activities */}
        <section className="activities-detail-section">
          <h2>Our Activities</h2>
          <div className="activities-detail-grid">
            
            <div className="activity-detail-card">
              <div className="activity-detail-icon">📸</div>
              <h3>Wildlife Photography Initiatives</h3>
              <p>Wild Camera Events to document and celebrate campus biodiversity through photography.</p>
            </div>

            <div className="activity-detail-card">
              <div className="activity-detail-icon">🍽️</div>
              <h3>Food & Water Stations</h3>
              <p>Setting up feeding and drinking stations for birds and animals across campus.</p>
            </div>

            <div className="activity-detail-card">
              <div className="activity-detail-icon">🏠</div>
              <h3>Nesting Boxes Installation</h3>
              <p>Installing safe nesting boxes for birds to encourage breeding and habitat security.</p>
            </div>

            <div className="activity-detail-card">
              <div className="activity-detail-icon">💰</div>
              <h3>Fundraising Activities</h3>
              <p>Organizing fundraisers to support campus animal welfare and conservation efforts.</p>
            </div>

            <div className="activity-detail-card">
              <div className="activity-detail-icon">🐾</div>
              <h3>Animal Shelter Visits</h3>
              <p>Regular visits to local animal shelters to provide support and volunteer services.</p>
            </div>

            <div className="activity-detail-card">
              <div className="activity-detail-icon">🎤</div>
              <h3>Expert Talks</h3>
              <p>Inviting environmentalists and veterinarians for educational sessions and workshops.</p>
            </div>

          </div>
        </section>

        {/* Call to Action */}
        <section className="team-cta-section">
          <h2>Join the Nature Team</h2>
          <p>
            Be part of our mission to protect and celebrate the diverse species that share our campus. 
            Together, we can create a harmonious environment where nature thrives.
          </p>
        </section>

      </div>
    </MainLayout>
  );
};

export default NatureTeamPage;