import './VolunteerStoriesPage.css';
import MainLayout from './MainLayout';

const VolunteerStoriesPage = () => {
  return (
    <MainLayout>
      <div className="volunteer-stories-wrapper">
        
        {/* Hero Section */}
        <div className="volunteer-hero">
          <h1>🌟 Volunteer Stories</h1>
          <p className="hero-tagline">NSS is a journey of personal transformation</p>
        </div>

        {/* Introduction */}
        <section className="stories-intro">
          <p>
            Volunteers share experiences that reflect growth, leadership, and social responsibility. 
            Through NSS, students discover their potential while making meaningful contributions to society.
          </p>
        </section>

        {/* Transformation Areas */}
        <section className="transformation-section">
          <h2>What Volunteers Gain</h2>
          <div className="transformation-grid">
            <div className="transformation-card">
              <div className="transform-icon">🎯</div>
              <h3>Leadership & Teamwork</h3>
              <p>
                Volunteers develop strong leadership qualities and learn the power of collaborative 
                effort through coordinating events, camps, and community initiatives.
              </p>
            </div>

            <div className="transformation-card">
              <div className="transform-icon">🌍</div>
              <h3>Real-World Exposure</h3>
              <p>
                Direct engagement with social challenges provides practical understanding of issues 
                like poverty, health, education, and environmental conservation.
              </p>
            </div>

            <div className="transformation-card">
              <div className="transform-icon">💬</div>
              <h3>Communication & Confidence</h3>
              <p>
                Interacting with diverse communities enhances communication skills, public speaking 
                abilities, and overall self-confidence.
              </p>
            </div>

            <div className="transformation-card">
              <div className="transform-icon">🤝</div>
              <h3>Social Responsibility</h3>
              <p>
                NSS instills a deep sense of responsibility toward society, encouraging volunteers 
                to become active, engaged citizens committed to positive change.
              </p>
            </div>
          </div>
        </section>

        {/* National Representation */}
        <section className="representation-section">
          <h2>Representing SSN at Prestigious Platforms</h2>
          <p>
            Participation in national and state-level programs allows volunteers to represent SSN 
            at prestigious platforms, bringing pride to the institution and shaping them into socially 
            conscious citizens.
          </p>
          
          <div className="highlights-grid">
            <div className="highlight-card">
              <div className="highlight-icon">🇮🇳</div>
              <h3>National Integration Camps</h3>
              <p>
                Volunteers experience cultural exchange and unity by participating in camps that 
                bring together NSS members from across India, fostering national integration.
              </p>
            </div>

            <div className="highlight-card">
              <div className="highlight-icon">🎊</div>
              <h3>National Youth Festivals</h3>
              <p>
                Representing SSN at national youth festivals where volunteers showcase talent, 
                innovation, and leadership on a national stage.
              </p>
            </div>

            <div className="highlight-card">
              <div className="highlight-icon">🎖️</div>
              <h3>Defence Expo & Adventure Camps</h3>
              <p>
                Service at national events like Defence Expo and participation in adventure camps 
                build resilience, discipline, and teamwork under challenging conditions.
              </p>
            </div>

            <div className="highlight-card">
              <div className="highlight-icon">🏆</div>
              <h3>Best Volunteer Awards</h3>
              <p>
                Recognition from Anna University for outstanding service, leadership, and dedication 
                to community welfare, inspiring others to follow the path of service.
              </p>
            </div>
          </div>
        </section>

        {/* Testimonials Section */}
        <section className="testimonials-section">
          <h2>Voices from Our Volunteers</h2>
          
          <div className="testimonial-card">
            <div className="quote-mark">"</div>
            <p className="testimonial-text">
              Being part of NSS has helped me grow personally and professionally while making a 
              real difference in people's lives. The experiences I gained through community service 
              are invaluable.
            </p>
            <div className="testimonial-author">
              <p className="author-name">– Ananya</p>
              <p className="author-detail">Final Year Student</p>
            </div>
          </div>

          <div className="testimonial-card">
            <div className="quote-mark">"</div>
            <p className="testimonial-text">
              NSS taught me that true education goes beyond textbooks. Working with rural communities 
              and contributing to their development opened my eyes to the real challenges our society faces.
            </p>
            <div className="testimonial-author">
              <p className="author-name">– Rajesh Kumar</p>
              <p className="author-detail">NSS Volunteer, 2023 Batch</p>
            </div>
          </div>

          <div className="testimonial-card">
            <div className="quote-mark">"</div>
            <p className="testimonial-text">
              The leadership skills and confidence I developed through NSS activities have been 
              instrumental in my career. NSS doesn't just build resumes; it builds character.
            </p>
            <div className="testimonial-author">
              <p className="author-name">– Priya Sharma</p>
              <p className="author-detail">Alumni, Working Professional</p>
            </div>
          </div>
        </section>

        {/* Call to Action */}
        <section className="cta-section">
          <h2>Begin Your Journey</h2>
          <p>
            Every volunteer's story is unique, but they all share one thing in common: 
            the transformative power of service. Join NSS and write your own story of growth, 
            impact, and meaningful change.
          </p>
          <div className="cta-highlight">
            <p><strong>"Not Me, But You"</strong> – The spirit that transforms individuals into change-makers.</p>
          </div>
        </section>

      </div>
    </MainLayout>
  );
};

export default VolunteerStoriesPage;