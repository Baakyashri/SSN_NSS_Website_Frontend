import './AnnualReportPage.css';
import MainLayout from './MainLayout';

const AnnualReportPage = () => {
  return (
    <MainLayout>
      <div className="annual-report-wrapper">
        
        {/* Hero Section */}
        <div className="report-hero">
          <h1>Annual Report</h1>
          <p className="hero-tagline">NSS Unit of SSN College of Engineering</p>
        </div>

        {/* Introduction */}
        <section className="report-intro">
          <p>
            The Annual Report presents a comprehensive overview of the activities and service 
            contributions of the NSS Unit of SSN College of Engineering during the academic year. 
            Our documented efforts showcase the dedication and impact of our volunteers in creating 
            meaningful change across communities.
          </p>
        </section>

        {/* Volunteer Requirements */}
        <section className="requirements-section">
          <h2>NSS Volunteer Requirements</h2>
          <p>
            Every NSS volunteer is committed to fulfilling specific service hours and participation 
            criteria to earn the prestigious NSS certificate and contribute effectively to society.
          </p>
          
          <div className="requirements-grid">
            <div className="requirement-card">
              <div className="req-number">120</div>
              <h3>Hours per Year</h3>
              <p>Regular activities conducted throughout the academic year</p>
            </div>

            <div className="requirement-card">
              <div className="req-number">240</div>
              <h3>Total Hours</h3>
              <p>Cumulative hours over two years to earn the NSS certificate</p>
            </div>

            <div className="requirement-card">
              <div className="req-number">7</div>
              <h3>Day Camp</h3>
              <p>Special Residential Camp in adopted villages or slums</p>
            </div>
          </div>
        </section>

        {/* Activity Categories */}
        <section className="activities-categories-section">
          <h2>Activity Categories</h2>
          <p>
            NSS activities are systematically divided into distinct categories to ensure comprehensive 
            community engagement and volunteer development.
          </p>
          
          <div className="categories-list">
            <div className="category-item">
              <div className="category-icon">📋</div>
              <div className="category-content">
                <h3>Orientation and Skill Training</h3>
                <p>
                  Initial induction programs and continuous skill development workshops that prepare 
                  volunteers for effective community service and leadership roles.
                </p>
              </div>
            </div>

            <div className="category-item">
              <div className="category-icon">🏫</div>
              <div className="category-content">
                <h3>Campus Development Work</h3>
                <p>
                  Initiatives focused on improving campus infrastructure, maintaining cleanliness, 
                  and creating sustainable spaces within the college environment.
                </p>
              </div>
            </div>

            <div className="category-item">
              <div className="category-icon">🤝</div>
              <div className="category-content">
                <h3>Community Service in Rural and Urban Areas</h3>
                <p>
                  Direct engagement with communities through health camps, educational programs, 
                  sanitation drives, and developmental initiatives in both urban and rural settings.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Year-Round Activities */}
        <section className="year-round-section">
          <h2>Year-Round Activities</h2>
          <p>
            Throughout the year, the NSS unit conducts a wide range of programs addressing various 
            social, environmental, and civic needs.
          </p>
          
          <div className="activities-grid">
            <div className="activity-box">
              <span className="activity-emoji">🏥</span>
              <h4>Health Awareness Programs</h4>
            </div>
            <div className="activity-box">
              <span className="activity-emoji">🧹</span>
              <h4>Sanitation Drives</h4>
            </div>
            <div className="activity-box">
              <span className="activity-emoji">📚</span>
              <h4>Literacy Initiatives</h4>
            </div>
            <div className="activity-box">
              <span className="activity-emoji">🚨</span>
              <h4>Disaster Management Training</h4>
            </div>
            <div className="activity-box">
              <span className="activity-emoji">🌱</span>
              <h4>Environmental Conservation</h4>
            </div>
            <div className="activity-box">
              <span className="activity-emoji">🇮🇳</span>
              <h4>National Day Celebrations</h4>
            </div>
          </div>

          <p className="activities-description">
            Volunteers actively participate in both urban outreach programs and rural development 
            initiatives, creating lasting impact across diverse communities.
          </p>
        </section>

        {/* Organizational Structure */}
        <section className="organization-section">
          <h2>Organizational Framework</h2>
          
          <div className="org-info">
            <div className="org-card">
              <h3>Operating Authority</h3>
              <p>
                The NSS unit operates under the <strong>Ministry of Youth Affairs and Sports</strong>, 
                Government of India, ensuring alignment with national youth development policies and 
                programs.
              </p>
            </div>

            <div className="org-card">
              <h3>Participation Scope</h3>
              <p>
                NSS volunteers actively take part in:
              </p>
              <ul>
                <li>State-level and national-level camps</li>
                <li>Youth festivals and cultural programs</li>
                <li>Adventure programs and leadership camps</li>
                <li>Integration camps promoting national unity</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Impact Statement */}
        <section className="impact-section">
          <h2>Our Impact</h2>
          <div className="impact-content">
            <p>
              Through consistent dedication and structured programming, the NSS Unit of SSN College 
              of Engineering continues to bridge the gap between academic learning and social 
              responsibility. Our volunteers emerge as responsible citizens equipped with leadership 
              skills, empathy, and a commitment to community welfare.
            </p>
            <div className="impact-quote">
              <p>
                "The annual report not only documents our activities but also celebrates the 
                transformative journey of every volunteer who contributes to building a better society."
              </p>
            </div>
          </div>
        </section>

        {/* Download Section */}
        <section className="download-section">
          <h2>Access Full Report</h2>
          <p>
            Download our comprehensive annual reports to explore detailed accounts of activities, 
            volunteer contributions, achievements, and community impact.
          </p>
          <div className="download-buttons">
            <button className="download-btn">
              📄 Download 2024-25 Report
            </button>
            <button className="download-btn secondary">
              📋 View Previous Reports
            </button>
          </div>
        </section>

      </div>
    </MainLayout>
  );
};

export default AnnualReportPage;