import React, { useEffect, useState } from 'react';
import { API_BASE } from '../../utils/api';

const GalleryTab = ({
  selectedAction,
  formData,
  setFormData
}) => {
  const [albumsList, setAlbumsList] = useState([]);
  const [galleryFiles, setGalleryFiles] = useState(null);
  const [galleryUploading, setGalleryUploading] = useState(false);
  const [newAlbumName, setNewAlbumName] = useState('');

  // Fetch albums on component mount
  useEffect(() => {
    const fetchAlbums = async () => {
      try {
        const res = await fetch(`${API_BASE}/albums/get-albums`);
        const data = await res.json();
        setAlbumsList(data || []);
      } catch (err) {
        console.error('Error fetching albums:', err);
      }
    };
    fetchAlbums();
  }, []);

  const handleCreateAlbum = async (e) => {
    e.preventDefault();
    if (!newAlbumName) return alert('Enter album name');
    try {
      const res = await fetch(`${API_BASE}/albums/create-albums`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: newAlbumName })
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || data.message);
      alert('Album created');
      setNewAlbumName('');
      const ref = await fetch(`${API_BASE}/albums/get-albums`);
      const arr = await ref.json();
      setAlbumsList(arr || []);
      // notify gallery viewers to refresh
      try {
        localStorage.setItem('galleryUpdated', Date.now().toString());
        window.dispatchEvent(new Event('galleryUpdated'));
      } catch (err) {}
    } catch (err) {
      alert('Create album error: ' + err.message);
    }
  };

  const handleGalleryFileChange = (e) => {
    const files = Array.from(e.target.files || []);
    setGalleryFiles(files.length ? files : null);
  };

  const handleGalleryUpload = async (albumId) => {
    if (!albumId) {
      return alert('Select an album');
    }
    if (!galleryFiles || galleryFiles.length === 0) {
      return alert('Choose photos to upload');
    }
    const form = new FormData();
    galleryFiles.forEach((file) => {
      form.append('photos', file);
    });
    try {
      setGalleryUploading(true);
      const res = await fetch(
        `${API_BASE}/albums/${albumId}/photos`,
        {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`
          },
          body: form
        }
      );
      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || data.message || 'Upload failed');
      }
      alert(data.message || 'Photos uploaded');
      setGalleryFiles(null);
      const ref = await fetch(`${API_BASE}/albums/get-albums`);
      const arr = await ref.json();
      setAlbumsList(arr || []);
      try {
        localStorage.setItem('galleryUpdated', Date.now().toString());
        window.dispatchEvent(new Event('galleryUpdated'));
      } catch (e) {}
    } catch (err) {
      console.error(err);
      alert('Upload error: ' + err.message);
    } finally {
      setGalleryUploading(false);
    }
  };

  const handleDeleteAlbum = async (albumId) => {
    if (!albumId) {
      return alert('Select an album');
    }
    const album = albumsList.find(a => a._id === albumId);
    if (!window.confirm(`Delete album "${album?.name}"?`)) {
      return;
    }
    try {
      const res = await fetch(
        `${API_BASE}/albums/delete-albums/${albumId}`,
        {
          method: 'DELETE'
        }
      );
      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || data.message || 'Delete failed');
      }
      alert(data.message || 'Album deleted');
      const ref = await fetch(`${API_BASE}/albums/get-albums`);
      const arr = await ref.json();
      setAlbumsList(arr || []);
      try {
        localStorage.setItem('galleryUpdated', Date.now().toString());
        window.dispatchEvent(new Event('galleryUpdated'));
      } catch (e) {}
      setFormData(prev => ({ ...prev, albumId: '' }));
    } catch (err) {
      alert('Delete error: ' + err.message);
    }
  };

  const handleDeletePhoto = async (albumId, photoId) => {
    if (!window.confirm('Delete this photo?')) {
      return;
    }
    try {
      const res = await fetch(`${API_BASE}/albums/${albumId}/photos/${photoId}`, {
        method: 'DELETE'
      });
      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || data.message || 'Delete photo failed');
      }
      alert(data.message || 'Photo deleted');
      const ref = await fetch(`${API_BASE}/albums/get-albums`);
      const arr = await ref.json();
      setAlbumsList(arr || []);
      try {
        localStorage.setItem('galleryUpdated', Date.now().toString());
        window.dispatchEvent(new Event('galleryUpdated'));
      } catch (e) {}
    } catch (err) {
      alert('Delete photo error: ' + err.message);
    }
  };

  switch (selectedAction) {
    case 'add':
      return (
        <div className="form-card">
          <h3>Create Album / Upload</h3>
          <form onSubmit={handleCreateAlbum} style={{ marginBottom: 12 }}>
            <input
              type="text"
              placeholder="New album name"
              value={newAlbumName}
              onChange={(e) => setNewAlbumName(e.target.value)}
            />
            <button type="submit">Create Album</button>
          </form>

          <div style={{ marginBottom: 12 }}>
            <label>Select album to upload (or create above):</label>
            <select
              name="albumId"
              value={formData.albumId || ''}
              onChange={(e) => setFormData(prev => ({ ...prev, albumId: e.target.value }))}
            >
              <option value="">-- Select --</option>
              {albumsList.map((a) => (
                <option key={a._id} value={a._id}>{a.name}</option>
              ))}
            </select>
          </div>

          <div style={{ marginBottom: 12 }}>
            <input type="file" multiple accept="image/*" onChange={handleGalleryFileChange} />
            <button
              onClick={() => handleGalleryUpload(formData.albumId)}
              disabled={galleryUploading}
              style={{ marginLeft: 8 }}
            >
              {galleryUploading ? 'Uploading...' : 'Upload to Album'}
            </button>
          </div>
        </div>
      );

    case 'update':
      return (
        <div className="form-card">
          <h3>Update Album (upload/delete photos)</h3>
          <div style={{ marginBottom: 12 }}>
            <label>Select album:</label>
            <select
              name="albumId"
              value={formData.albumId || ''}
              onChange={(e) => setFormData(prev => ({ ...prev, albumId: e.target.value }))}
            >
              <option value="">-- Select --</option>
              {albumsList.map((a) => (
                <option key={a._id} value={a._id}>{a.name}</option>
              ))}
            </select>
          </div>

          <div style={{ marginBottom: 12 }}>
            <input type="file" multiple accept="image/*" onChange={handleGalleryFileChange} />
            <button
              onClick={() => handleGalleryUpload(formData.albumId)}
              disabled={galleryUploading}
              style={{ marginLeft: 8 }}
            >
              {galleryUploading ? 'Uploading...' : 'Upload Photos'}
            </button>
          </div>
              
          <div>
            <h4>Photos</h4>
            {formData.albumId ? (
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(120px, 1fr))', gap: 8 }}>
                {(albumsList.find(a => a._id === formData.albumId)?.photos || []).map((p) => {
                  const src = p.url && p.url.startsWith('http') ? p.url : `${API_BASE}${p.url}`;
                  return (
                    <div key={p._id} style={{ position: 'relative' }}>
                      <img
                        src={src}
                        alt={p.filename || p.original_name}
                        style={{ width: '100%', height: 90, objectFit: 'cover', borderRadius: 4 }}
                      />
                      <button
                        type="button"
                        onClick={() => handleDeletePhoto(formData.albumId, p._id)}
                        style={{
                          position: 'absolute',
                          top: 6,
                          right: 6,
                          background: '#dc3545',
                          color: '#fff',
                          border: 'none',
                          borderRadius: 4,
                          padding: '4px 6px',
                          cursor: 'pointer'
                        }}
                      >
                        Delete
                      </button>
                    </div>
                  );
                })}
              </div>
            ) : <div>Select an album to view photos</div>}
          </div>
        </div>
      );

    case 'delete':
      return (
        <div className="form-card">
          <h3>Delete Album</h3>
          <div style={{ marginBottom: 12 }}>
            <label>Select album to delete:</label>
            <select
              name="albumId"
              value={formData.albumId || ''}
              onChange={(e) => setFormData(prev => ({ ...prev, albumId: e.target.value }))}
            >
              <option value="">-- Select --</option>
              {albumsList.map((a) => (
                <option key={a._id} value={a._id}>{a.name}</option>
              ))}
            </select>
          </div>
          <button
            onClick={() => handleDeleteAlbum(formData.albumId)}
            style={{ background: '#dc3545', color: '#fff', border: 'none', padding: '8px 12px', borderRadius: 6 }}
          >
            Delete Album
          </button>
        </div>
      );

    case 'view':
      return (
        <div className="form-card">
          <h3>Albums Preview</h3>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(160px, 1fr))', gap: 12 }}>
            {albumsList.map((a) => (
              <div key={a._id} style={{ padding: 8, border: '1px solid #ddd', borderRadius: 6 }}>
                <strong style={{ display: 'block', marginBottom: 8 }}>{a.name}</strong>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 6 }}>
                  {(a.photos || []).slice(0, 6).map((p, i) => {
                    const src = p.url && p.url.startsWith('http') ? p.url : `${API_BASE}${p.url}`;
                    return (
                      <img
                        key={i}
                        src={src}
                        alt={p.filename || p.original_name}
                        style={{ width: '100%', height: 60, objectFit: 'cover', borderRadius: 4 }}
                      />
                    );
                  })}
                  {(a.photos || []).length === 0 && <div style={{ color: '#666' }}>No Photos</div>}
                </div>
              </div>
            ))}
          </div>
        </div>
      );

    default:
      return <p className="placeholder-text">Select an action to proceed.</p>;
  }
};

export default GalleryTab;
