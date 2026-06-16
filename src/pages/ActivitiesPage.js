import React, { useEffect, useState } from "react";
import "./ActivitiesPage.css";

const ActivitiesPage = () => {
  const [activities, setActivities] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("https://nss-website-backend.onrender.com/api/activities")
      .then((res) => res.json())
      .then((data) => {
        setActivities(Array.isArray(data) ? data : []);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching activities:", err);
        setActivities([]);
        setLoading(false);
      });
  }, []);

  /* Inline override — forces full width regardless of parent layout */
  const pageStyle = {
    width: "100%",
    maxWidth: "100%",
    boxSizing: "border-box",
    display: "block",
    float: "none",
    flex: "unset",
    gridColumn: "unset",
  };

  if (loading) {
    return (
      <div className="activities-container" style={pageStyle}>
        <div className="page-hero">
          <h2>NSS Activities</h2>
          <p>Explore our latest activities and events</p>
        </div>
        <div className="skeleton-grid">
          {[1, 2, 3].map((i) => (
            <div key={i} className="skeleton-card">
              <div className="skeleton-header" />
              <div className="skeleton-body">
                <div className="skeleton-line wide" />
                <div className="skeleton-line" />
                <div className="skeleton-line narrow" />
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="activities-container" style={pageStyle}>
      <div className="page-hero">
        <h2>NSS Activities</h2>
        <p>Explore our latest activities and events</p>
      </div>

      {activities.length === 0 ? (
        <div className="no-activities">
          <span className="no-activities-icon">📋</span>
          <p>No activities available right now. Check back soon!</p>
        </div>
      ) : (
        <div className="activities-grid" style={{ display: "grid", gridTemplateColumns: "1fr", gap: "20px", width: "100%" }}>
          {activities.map((activity, index) => (
            <article key={activity._id || index} className="activity-card">

              {/* HEADER */}
              <div className="activity-header">
                <div className="activity-header-top">
                  <span className={`status-badge status-${(activity.status || "past").toLowerCase()}`}>
                    {activity.status || "Past"}
                  </span>
                  {activity.date && (
                    <span className="activity-date">
                      {new Date(activity.date).toLocaleDateString("en-IN", {
                        day: "numeric",
                        month: "short",
                        year: "numeric",
                      })}
                    </span>
                  )}
                </div>
                <h3 className="activity-title">{activity.title}</h3>
                {activity.location && (
                  <div className="activity-location">
                    <span className="location-icon">📍</span>
                    {activity.location}
                  </div>
                )}
              </div>

              {/* BODY */}
              <div className="activity-body">
                {activity.description && (
                  <p className="activity-description">{activity.description}</p>
                )}

                {/* PHOTOS */}
                {activity.photos?.length > 0 && (
                  <div className="activity-section">
                    <h4 className="section-label">Photos</h4>
                    <div className="photos-grid">
                      {activity.photos.map((photo, i) => {
                        const imageUrl = photo.url?.startsWith("http")
                          ? photo.url
                          : `https://nss-website-backend.onrender.com${photo.url}`;
                        return (
                          <img
                            key={i}
                            src={imageUrl}
                            alt={`Activity photo ${i + 1}`}
                            className="activity-photo"
                            loading="lazy"
                            onError={(e) => (e.target.style.display = "none")}
                          />
                        );
                      })}
                    </div>
                  </div>
                )}

                {/* REPORTS */}
                {activity.reports?.length > 0 && (
                  <div className="activity-section">
                    <h4 className="section-label">Reports</h4>
                    <ul className="report-list">
                      {activity.reports.map((report, i) => (
                        <li key={i}>
                          <a
                            className="report-link"
                            href={`https://nss-website-backend.onrender.com/download-report?url=${encodeURIComponent(
                              report.url
                            )}&filename=${encodeURIComponent(report.original_name)}`}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            <span className="report-icon">📄</span>
                            <span className="report-name">{report.original_name}</span>
                            <span className="report-download-icon">↓</span>
                          </a>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>

            </article>
          ))}
        </div>
      )}
    </div>
  );
};

export default ActivitiesPage;