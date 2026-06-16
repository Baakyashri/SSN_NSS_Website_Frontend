import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import './AnnualCampPage.css';
import MainLayout from './MainLayout';
import camp2026_day1 from '../assets/camp-gallery/Day-1.jpg';
import camp2026_day2 from '../assets/camp-gallery/Day-2.jpg';
import camp2026_day3 from '../assets/camp-gallery/Day-3.jpg';
import camp2026_day4 from '../assets/camp-gallery/Day-4.jpg';
import camp2026_day5 from '../assets/camp-gallery/Day-5.jpg';
import camp2026_day6 from '../assets/camp-gallery/Day-6.jpg';
// ... repeat for day2 to day6
/* ============================================================
   CAMP DATA PER YEAR
   To add photos:
     1. Import at the top of this file:
        import day1p1 from '../assets/camp-gallery/2024-2025/day1-photo1.jpg';
     2. Add to the matching day's photos array:
        photos: [day1p1, day1p2, ...]
============================================================ */

const campData = {
  '2024-2025': {
    label: '2024–2025',
    dateRange: '24.02.2024 – 01.03.2024',
    village: 'Thandalam Village',
    volunteers: 70,
    days: [
      {
        id: 'day1',
        title: 'Day 1 – Team Formation & Village Survey',
        description:
          'Volunteers conducted village surveys covering 85 households and began school renovation activities while building strong community connections.',
        photos: [],
      },
      {
        id: 'day2',
        title: 'Day 2 – Saplings & Community Drive',
        description:
          'Saplings were planted in schools and garbage clearance drives were conducted, strengthening environmental awareness.',
        photos: [],
      },
      {
        id: 'day3',
        title: 'Day 3 – Empowering Students & Civic Engagement',
        description:
          'Infrastructure improvements continued, and a voter ID registration drive helped register around 100 individuals.',
        photos: [],
      },
      {
        id: 'day4',
        title: 'Day 4 – School Renovation & Youth Discussion',
        description:
          'Classroom renovations were completed and interactive sessions were conducted on social awareness.',
        photos: [],
      },
      {
        id: 'day5',
        title: 'Day 5 – Lake Cleanup & Fun Activities',
        description:
          'A lake cleanup drive was conducted with EFI, followed by fun activities to boost volunteer morale.',
        photos: [],
      },
      {
        id: 'day6',
        title: 'Day 6 – Science Expo & Cultural Heritage',
        description:
          'A science exhibition and cultural visit strengthened both academic and cultural learning.',
        photos: [],
      },
      {
        id: 'day7',
        title: 'Day 7 – Valedictory & Reflections',
        description:
          'The valedictory ceremony celebrated volunteer contributions and concluded the camp on a positive note.',
        photos: [],
      },
    ],
    conclusion:
      'The NSS Annual Camp 2024–2025 fostered leadership, service, and community bonding, leaving a lasting impact on both volunteers and villagers.',
  },

 '2025-2026': {
    label: '2025–2026',
    dateRange: '06.03.26 - 11.03.26',
    village: 'Panditha Medu Village',
    volunteers: 30,
    days: [
      {
        id: 'day1',
        title: 'Day 1 – Team Formation & Village Survey',
        description:
          'Volunteers conducted village surveys covering 85 households and began school renovation activities while building strong community connections.',
        photos: [camp2026_day1],
      },
      {
        id: 'day2',
        title: 'Day 2 – Saplings & Community Drive',
        description:
          'Saplings were planted in schools and garbage clearance drives were conducted, strengthening environmental awareness.',
        photos: [camp2026_day2],
      },
      {
        id: 'day3',
        title: 'Day 3– School Renovation & Youth Discussion',
        description:
          'Classroom renovations were completed and interactive sessions were conducted on social awareness.',
        photos: [camp2026_day3],
      },
      {
        id: 'day4',
        title: 'Day 4 – Lake Cleanup & Fun Activities',
        description:
          'A lake cleanup drive was conducted with EFI, followed by fun activities to boost volunteer morale.',
        photos: [camp2026_day4],
      },
      {
        id: 'day5',
        title: 'Day 5 – Science Expo & Cultural Heritage',
        description:
          'A science exhibition and cultural visit strengthened both academic and cultural learning.',
        photos: [camp2026_day5],
      },
      {
        id: 'day6',
        title: 'Day 6 – Valedictory & Reflections',
        description:
          'The valedictory ceremony celebrated volunteer contributions and concluded the camp on a positive note.',
        photos: [camp2026_day6],
      },
    ],
    conclusion:
      'The NSS Annual Camp 2024–2025 fostered leadership, service, and community bonding, leaving a lasting impact on both volunteers and villagers.',
  },
};

const AnnualCampPage = () => {
  const { year } = useParams();
  const data = campData[year];

  const [activeDay, setActiveDay] = useState('all');
  const [lightbox, setLightbox] = useState(null);

  /* Unknown year fallback */
  if (!data) {
    return (
      <MainLayout>
        <div className="camp-not-found">
          <h2>Year Not Found</h2>
          <p>No camp data found for <strong>{year}</strong>.</p>
          <Link to="/" className="camp-back-btn">← Back to Home</Link>
        </div>
      </MainLayout>
    );
  }

  const isUpcoming = data.volunteers === 0;

  const allPhotos = data.days.flatMap((d) =>
    d.photos.map((src) => ({ src, dayId: d.id }))
  );

  const visiblePhotos =
    activeDay === 'all'
      ? allPhotos
      : (data.days.find((d) => d.id === activeDay)?.photos || []).map((src) => ({ src, dayId: activeDay }));

  return (
    <MainLayout>
      <div className="camp-container">

        {/* SIDEBAR */}
        <aside className="camp-sidebar">
          <div className="camp-year-badge">{data.label}</div>
          <nav>
            <ul>
              <li><a href="#overview">Overview</a></li>
              {data.days.map((d, i) => (
                <li key={d.id}><a href={`#${d.id}`}>Day {i + 1}</a></li>
              ))}
              <li><a href="#conclusion">Conclusion</a></li>
              <li><a href="#gallery">📸 Gallery</a></li>
            </ul>
          </nav>
        </aside>

        {/* MAIN */}
        <main className="camp-content">

          {/* OVERVIEW */}
          <section id="overview">
            <h2>Overview – NSS Annual Camp {data.label}</h2>

            {isUpcoming ? (
              <div className="camp-upcoming-banner">
                🚀 This camp is upcoming. Details and photos will be updated soon!
              </div>
            ) : (
              <div className="camp-meta-grid">
                <div className="camp-meta-card">
                  <span className="camp-meta-icon">📅</span>
                  <div><strong>Dates</strong><p>{data.dateRange}</p></div>
                </div>
                <div className="camp-meta-card">
                  <span className="camp-meta-icon">📍</span>
                  <div><strong>Location</strong><p>{data.village}</p></div>
                </div>
                <div className="camp-meta-card">
                  <span className="camp-meta-icon">👥</span>
                  <div><strong>Volunteers</strong><p>{data.volunteers}+</p></div>
                </div>
                <div className="camp-meta-card">
                  <span className="camp-meta-icon">🗓️</span>
                  <div><strong>Duration</strong><p>7 Days</p></div>
                </div>
              </div>
            )}

            <p style={{ marginTop: '1.2rem' }}>
              <strong>SSN COLLEGE OF ENGINEERING</strong> — Kalavakkam – 603110<br />
              NSS Annual Camp {data.label} conducted by the NSS Unit of SSN and Anna University.
            </p>
          </section>

          {/* DAY SECTIONS */}
          {data.days.map((day, i) => (
            <section key={day.id} id={day.id}>
              <h2>{day.title}</h2>
              <p>{day.description}</p>
              {day.photos.length > 0 && (
                <div className="gallery-grid" style={{ marginTop: '1.2rem' }}>
{day.photos.map((src, idx) => (
  <img
    key={idx}
    src={src}
    alt={`Day ${i + 1} activity ${idx + 1}`}
    onClick={() => setLightbox(src)}
    style={{ cursor: 'pointer' }}
  />
))}
                </div>
              )}
            </section>
          ))}

          {/* CONCLUSION */}
          <section id="conclusion">
            <h2>Conclusion</h2>
            <p>{data.conclusion}</p>
          </section>

          {/* GALLERY */}
          <section id="gallery">
            <h2>📸 Photo Gallery – {data.label}</h2>

            <div className="camp-gallery-tabs">
              <button
                className={`camp-gallery-tab ${activeDay === 'all' ? 'active' : ''}`}
                onClick={() => setActiveDay('all')}
              >
                All Photos {allPhotos.length > 0 && `(${allPhotos.length})`}
              </button>
              {data.days.map((d, i) => (
                <button
                  key={d.id}
                  className={`camp-gallery-tab ${activeDay === d.id ? 'active' : ''}`}
                  onClick={() => setActiveDay(d.id)}
                >
                  Day {i + 1} {d.photos.length > 0 && `(${d.photos.length})`}
                </button>
              ))}
            </div>

            {visiblePhotos.length > 0 ? (
              <div className="gallery-grid camp-gallery-grid">
                {visiblePhotos.map((item, idx) => (
                  <img
                    key={idx}
                    src={item.src}
                    alt={`Camp activity ${idx + 1}`}
                    onClick={() => setLightbox(item.src)}
                    style={{ cursor: 'pointer' }}
                  />
                ))}
              </div>
            ) : (
              <div className="camp-empty-gallery">
                <span style={{ fontSize: '3rem' }}>{isUpcoming ? '🏕️' : '📂'}</span>
                <p>
                  {isUpcoming
                    ? `Photos will be added once the ${data.label} camp is completed.`
                    : 'Import your images and add them to the photos array in campData.'}
                </p>
              </div>
            )}
          </section>

        </main>
      </div>

      {/* LIGHTBOX */}
      {lightbox && (
        <div className="camp-lightbox-overlay" onClick={() => setLightbox(null)}>
          <div className="camp-lightbox-content" onClick={(e) => e.stopPropagation()}>
            <button className="camp-lightbox-close" onClick={() => setLightbox(null)}>✖</button>
            <img src={lightbox} alt="Lightbox view" className="camp-lightbox-img" />
          </div>
        </div>
      )}
    </MainLayout>
  );
};

export default AnnualCampPage;
