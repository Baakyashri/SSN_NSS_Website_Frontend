import React from "react";
import "./CollaboratorsPage.css";
import efiLogo from '../assets/efiLogo.png';
import goonjLogo from '../assets/goonjLogo.png';

const CollaboratorsPage = () => {
  return (
   
    <section id="collaboration" className="section">
      <div className="container">
        <div className="content-card fade-in">
          <h2 className="section-heading">
            <i className="fas fa-handshake"></i> Our Collaborations
          </h2>
          <div className="collaboration-grid">
            <div className="collaboration-item">
              <img
                src={efiLogo}
                alt="EFI Logo"
                className="collab-logo"
              />
              <h3>Environmentalist Foundation of India (EFI)</h3>
              <p>
                A partnership focused on wildlife conservation and habitat
                restoration.
              </p>
            </div>

            <div className="collaboration-item">
              <img
                src={goonjLogo}
                alt="Goonj Logo"
                className="collab-logo"
              />
              <h3>Goonj</h3>
              <p>
                Working together on community development and disaster relief
                efforts.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CollaboratorsPage;
