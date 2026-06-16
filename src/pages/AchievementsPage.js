import './AchievementsPage.css';
import MainLayout from './MainLayout';
// Import your images
import bestUnitAward from '../assets/achievements/best_unit_award.png';
import youthFestival from '../assets/achievements/youth_festival_noida.png';
import bestVolunteer from '../assets/achievements/best_volunteer.png';
import defenceExpo from '../assets/achievements/defence_expo.png';
import adventureCamp1 from '../assets/achievements/adventure_camp.png';
import marchPast1 from '../assets/achievements/march_past1.png';
import marchPast2 from '../assets/achievements/march_past2.png';
import marchPast3 from '../assets/achievements/march_past3.png';

const AchievementsPage = () => {
  return (
    <MainLayout>
      <div className="achievements-wrapper">
        
        {/* Hero Section */}
        <div className="achievements-hero">
          <h1>Our Achievements</h1>
          <p className="hero-subtitle">Excellence in Service, Leadership & National Representation</p>
        </div>

        {/* Introduction */}
        <section className="achievements-intro">
          <p>
            The NSS Unit of SSN College of Engineering has consistently demonstrated excellence in 
            community service, leadership, and national-level participation. Over the years, the unit 
            has received prestigious awards and recognitions and has represented the institution at 
            state and national platforms. These achievements reflect the dedication, discipline, and 
            service-oriented spirit of our volunteers, guided by the motto <strong>"Not Me, But You"</strong>.
          </p>
        </section>

        {/* Best NSS Unit Award */}
        <section className="achievement-section">
          <div className="achievement-header">
            <span className="achievement-icon">🥇</span>
            <h2>Best NSS Unit Award – Anna University</h2>
          </div>
          <div className="achievement-content-with-image">
            <div className="achievement-text">
              <div className="achievement-details">
                <p><strong>Achievement:</strong> Best NSS Unit Award</p>
                <p><strong>Awarding Authority:</strong> Anna University</p>
                <p><strong>Number of Times Received:</strong> Six Times</p>
                <p><strong>Years:</strong> Multiple academic years</p>
              </div>
              <p className="achievement-description">
                The NSS Unit of SSN has been honored with the Best NSS Unit Award by Anna University 
                on six occasions, recognizing its outstanding contribution to community service, volunteer 
                participation, and impactful outreach programs. This award stands as a testament to the 
                consistent performance and commitment of the unit in aligning academic institutions with 
                societal development.
              </p>
            </div>
            <div className="achievement-image">
              <img src={bestUnitAward} alt="Best NSS Unit Award" />
            </div>
          </div>
        </section>

        {/* National Integration Camp */}
        <section className="achievement-section">
          <div className="achievement-header">
            <span className="achievement-icon">🌍</span>
            <h2>National Integration Camp (NIC)</h2>
          </div>
          
          <div className="nic-cards">
            <div className="nic-card">
              <h3>📌 NIC Participation – Davangere, Karnataka (2019)</h3>
              <div className="volunteer-info">
                <p><strong>Volunteer:</strong> Tarrani</p>
                <p><strong>Department:</strong> Electrical and Electronics Engineering (EEE)</p>
                <p><strong>Batch:</strong> 2019</p>
              </div>
              <p>
                The volunteer represented SSN College of Engineering at the National Integration Camp 
                (NIC) held in Davangere, Karnataka. The camp focused on national unity, cultural exchange, 
                and social harmony, bringing together NSS volunteers from across India.
              </p>
            </div>

            <div className="nic-card">
              <h3>📌 NIC Participation – Karaikudi, Tamil Nadu (2021)</h3>
              <div className="volunteer-info">
                <p><strong>Volunteer:</strong> Gokul S</p>
                <p><strong>Department:</strong> Electronics and Communication Engineering (ECE)</p>
                <p><strong>Batch:</strong> 2021</p>
              </div>
              <p>
                Participation in the National Integration Camp at Karaikudi provided exposure to 
                inter-state collaboration, cultural programs, and community service activities, 
                strengthening the volunteer's leadership and civic awareness.
              </p>
            </div>
          </div>
        </section>

        {/* National Youth Festival */}
        <section className="achievement-section">
          <div className="achievement-header">
            <span className="achievement-icon">🎉</span>
            <h2>National Youth Festival Participation</h2>
          </div>
          
          <div className="achievement-content-with-image reverse">
            <div className="achievement-image">
              <img src={youthFestival} alt="National Youth Festival - Noida" />
            </div>
            <div className="achievement-text">
              <div className="festival-section">
                <h3>📌 National Youth Festival – Rohtak, Haryana (2019)</h3>
                <div className="volunteer-info">
                  <p><strong>Volunteer:</strong> Sathya Preetha</p>
                  <p><strong>Department:</strong> Electrical and Electronics Engineering (EEE)</p>
                  <p><strong>Batch:</strong> 2019</p>
                </div>
                <p>
                  The volunteer represented the NSS Unit of SSN at the National Youth Festival held in 
                  Rohtak, Haryana. The festival celebrated youth leadership, innovation, cultural diversity, 
                  and social responsibility at a national level.
                </p>
              </div>

              <div className="festival-section">
                <h3>📌 National Youth Festival – Noida (2018)</h3>
                <div className="volunteer-info">
                  <p><strong>Volunteers:</strong></p>
                  <ul>
                    <li>Dinesh T – EEE</li>
                    <li>Ruba M – Biomedical Engineering (BME)</li>
                  </ul>
                  <p><strong>Batch:</strong> 2020 Passed Out</p>
                </div>
                <p>
                  The volunteers actively participated in the National Youth Festival at Noida, contributing 
                  to discussions, cultural events, and service-oriented programs aimed at youth empowerment.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Best NSS Volunteer Award */}
        <section className="achievement-section">
          <div className="achievement-header">
            <span className="achievement-icon">🏅</span>
            <h2>Best NSS Volunteer Award – Anna University</h2>
          </div>
          
          <div className="achievement-content-with-image">
            <div className="achievement-text">
              <h3>📌 Best Volunteer Award (2022–2023)</h3>
              <div className="volunteer-info">
                <p><strong>Volunteer:</strong> Ajitha Baharathi</p>
                <p><strong>Department:</strong> Biomedical Engineering (BME)</p>
              </div>
              <p>
                Ajitha Baharathi was awarded the Best NSS Volunteer by Anna University for her exceptional 
                service, leadership, and dedication to community welfare activities. She currently works 
                with Teach For India, continuing her commitment to social transformation.
              </p>
            </div>
            <div className="achievement-image">
              <img src={bestVolunteer} alt="Best NSS Volunteer Award" />
            </div>
          </div>
        </section>

        {/* Defence Expo */}
        <section className="achievement-section">
          <div className="achievement-header">
            <span className="achievement-icon">🎖</span>
            <h2>Participation in Defence Expo 2018</h2>
          </div>
          
          <div className="achievement-content-with-image reverse">
            <div className="achievement-image">
              <img src={defenceExpo} alt="Defence Expo 2018" />
            </div>
            <div className="achievement-text">
              <div className="achievement-details">
                <p><strong>Event:</strong> Defence Expo</p>
                <p><strong>Year:</strong> 2018</p>
              </div>
              <p>
                NSS volunteers from SSN actively volunteered during Defence Expo 2018, contributing to 
                crowd management, assistance services, and event coordination. This exposure provided 
                real-time experience in large-scale national event management.
              </p>
            </div>
          </div>
        </section>

        {/* National Adventure Camp */}
        <section className="achievement-section">
          <div className="achievement-header">
            <span className="achievement-icon">🧗</span>
            <h2>National Adventure Camp</h2>
          </div>
          
          <div className="achievement-text-full">
            <h3>📌 National Adventure Camp (2022)</h3>
            <div className="volunteer-info">
              <p><strong>Volunteer:</strong> Muthu Velan M</p>
            </div>
            <p>
              The volunteer participated in the National Adventure Camp 2022, which focused on adventure 
              training, resilience building, teamwork, and leadership under challenging conditions.
            </p>
          </div>
          
          <div className="photo-gallery">
            <img src={adventureCamp1} alt="Adventure Camp Activity 1" />
          </div>
        </section>

        {/* March Past */}
        <section className="achievement-section">
          <div className="achievement-header">
            <span className="achievement-icon">🇮🇳</span>
            <h2>March Past – National Celebrations</h2>
          </div>
          
          <div className="achievement-text-full">
            <div className="achievement-details">
              <p><strong>Events:</strong></p>
              <ul>
                <li>Independence Day</li>
                <li>Republic Day</li>
              </ul>
            </div>
            <p>
              NSS volunteers actively participated in March Past events during Independence Day and 
              Republic Day celebrations, demonstrating discipline, unity, and patriotic spirit.
            </p>
          </div>
          
          <div className="photo-gallery-three">
            <img src={marchPast1} alt="March Past - Independence Day" />
            <img src={marchPast2} alt="March Past - Republic Day" />
            <img src={marchPast3} alt="March Past Celebration" />
          </div>
        </section>

        {/* Closing Statement */}
        <section className="achievements-closing">
          <p>
            Each achievement and participation strengthens the legacy of NSS at SSN and inspires future 
            volunteers to uphold the values of selfless service.
          </p>
        </section>

      </div>
    </MainLayout>
  );
};

export default AchievementsPage;