// src/pages/Gallery.js
import React, { useEffect, useState } from "react";
import axios from "axios";
import "./Gallery.css";
import { API_BASE } from "../utils/api";
import MainLayout from './MainLayout';

const Gallery = () => {
  // ===== STATE DECLARATIONS =====
  const [albums, setAlbums] = useState([]);
  const [photos, setPhotos] = useState({});
  const [selectedAlbum, setSelectedAlbum] = useState(null);
  const [modalImage, setModalImage] = useState(null);

  // ===== LOCK BACKGROUND SCROLL WHEN MODAL OPENS =====
  useEffect(() => {
    document.body.style.overflow = modalImage ? "hidden" : "auto";
  }, [modalImage]);

  // ===== FETCH ALBUMS & PHOTOS =====
  useEffect(() => {
    const fetchAlbums = () => {
      axios
        .get(`${API_BASE}/api/albums`)
        .then((res) => {
          const data = res.data || [];
          setAlbums(data.map((a) => a.name));

          const photosMap = {};
          data.forEach((a) => {
            photosMap[a.name] = a.photos || [];
          });
          setPhotos(photosMap);
        })
        .catch((err) => console.error("Error fetching gallery:", err));
    };

    fetchAlbums();

    // Listen for gallery updates
    const onGalleryUpdated = () => fetchAlbums();
    window.addEventListener("galleryUpdated", onGalleryUpdated);

    // Cross-tab sync
    const onStorage = (e) => {
      if (e.key === "galleryUpdated") fetchAlbums();
    };
    window.addEventListener("storage", onStorage);

    return () => {
      window.removeEventListener("galleryUpdated", onGalleryUpdated);
      window.removeEventListener("storage", onStorage);
    };
  }, []);

  return (
    <MainLayout>

      <div className="gallery-wrapper">
        <div className="gallery-container">
          <h2 className="gallery-title">📸 Our Gallery</h2>

          {/* ===== ALBUM LIST VIEW ===== */}
          {!selectedAlbum ? (
            <div className="album-grid">
              {albums.map((album) => (
                <div
                  className="album-card"
                  key={album}
                  onClick={() => setSelectedAlbum(album)}
                >
                  {/* Inside the album-grid map */}
                  <div className="album-thumb">
                    {photos[album]?.[0] ? (
                      <img
                        src={
                          /* Check if the URL is already a full Cloudinary link */
                          photos[album][0].url.startsWith("http")
                            ? photos[album][0].url
                            : `${API_BASE}${photos[album][0].url}`
                        }
                        alt={`${album} thumbnail`}
                      />
                    ) : (
                      <div className="empty-thumb">No Photos</div>
                    )}
                  </div>
                  <div className="album-name">{album}</div>
                </div>
              ))}
            </div>
          ) : (
            /* ===== ALBUM PHOTOS VIEW ===== */
            <div className="album-view">
              <div className="album-header">
                <h3>{selectedAlbum}</h3>
                <button
                  className="back-btn"
                  onClick={() => setSelectedAlbum(null)}
                >
                  ← Back
                </button>
              </div>

{/* Inside the album-view (photo-grid) */}
              <div className="photo-grid">
                {photos[selectedAlbum]?.map((photo, index) => {
                  /* Determine the correct source URL */
                  const src = photo.url.startsWith("http")
                    ? photo.url
                    : `${API_BASE}${photo.url}`;

                  return (
                    <div
                      className="photo-card"
                      key={index}
                      /* Update modal to use the correct src */
                      onClick={() => setModalImage(src)}
                    >
                      <div className="photo-img-wrapper">
                        <img src={src} alt={photo.name || "photo"} />
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* ===== MODAL VIEW ===== */}
          {modalImage && (
            <div
              className="modal-overlay"
              onClick={() => setModalImage(null)}
            >
              <div
                className="modal-content"
                onClick={(e) => e.stopPropagation()}
              >
                <img
                  src={modalImage}
                  alt="Gallery Preview"
                  className="modal-img"
                />
                <button
                  className="modal-close"
                  onClick={() => setModalImage(null)}
                >
                  ✖
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

    </MainLayout>
  );
};

export default Gallery;
