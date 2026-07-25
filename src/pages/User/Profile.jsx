import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import './Profile.css';

const Profile = () => {
  const { user, updateUser } = useAuth();
  const navigate = useNavigate();
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    bio: '',
    location: '',
    website: ''
  });

  useEffect(() => {
    if (user) {
      setFormData({
        name: user.name || '',
        bio: user.bio || '',
        location: user.location || '',
        website: user.website || ''
      });
    }
  }, [user]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSave = (e) => {
    if (e) e.preventDefault();
    updateUser({
      ...user,
      ...formData
    });
    setIsEditing(false);
  };

  const handleCancel = () => {
    if (user) {
      setFormData({
        name: user.name || '',
        bio: user.bio || '',
        location: user.location || '',
        website: user.website || ''
      });
    }
    setIsEditing(false);
  };

  if (!user) {
    return (
      <div className="profile-container">
        <div className="profile-card">
          <p>Please log in to view your profile.</p>
        </div>
      </div>
    );
  }

  const firstInitial = user.name ? user.name.charAt(0).toUpperCase() : 'U';

  return (
    <div className="profile-container">
      <button className="profile-back-btn" onClick={() => navigate('/home')}>
        ← Back to Home
      </button>

      <div className="profile-card">
        <div className="profile-header">
          <div className="profile-avatar-section">
            <div className="profile-avatar">{firstInitial}</div>
          </div>
          <div className="profile-info-section">
            <div className="profile-title-row">
              <h1 className="profile-name">{user.name || 'User'}</h1>
              {!isEditing && (
                <button 
                  className="profile-btn profile-btn-secondary"
                  onClick={() => setIsEditing(true)}
                >
                  ✏️ Edit Profile
                </button>
              )}
            </div>

            {isEditing ? (
              <form onSubmit={handleSave}>
                <div className="profile-fields">
                  <div className="profile-field">
                    <label className="profile-field-label">Email</label>
                    <input
                      type="email"
                      className="profile-form-control"
                      value={user.email || ''}
                      disabled
                      style={{ width: '100%' }}
                    />
                  </div>

                  <div className="profile-field">
                    <label className="profile-field-label">Name</label>
                    <input
                      type="text"
                      name="name"
                      className="profile-form-control"
                      value={formData.name}
                      onChange={handleChange}
                      style={{ width: '100%' }}
                    />
                  </div>

                  <div className="profile-field" style={{ gridColumn: '1 / -1' }}>
                    <label className="profile-field-label">Bio</label>
                    <textarea
                      name="bio"
                      className="profile-form-control"
                      value={formData.bio}
                      onChange={handleChange}
                      style={{ width: '100%', minHeight: '80px' }}
                    />
                  </div>

                  <div className="profile-field">
                    <label className="profile-field-label">Location</label>
                    <input
                      type="text"
                      name="location"
                      className="profile-form-control"
                      value={formData.location}
                      onChange={handleChange}
                      style={{ width: '100%' }}
                    />
                  </div>

                  <div className="profile-field">
                    <label className="profile-field-label">Website</label>
                    <input
                      type="url"
                      name="website"
                      className="profile-form-control"
                      value={formData.website}
                      onChange={handleChange}
                      style={{ width: '100%' }}
                    />
                  </div>
                </div>

                <div className="profile-actions" style={{ marginTop: '24px', display: 'flex', gap: '12px' }}>
                  <button type="submit" className="profile-btn profile-btn-success">
                    Save Changes
                  </button>
                  <button type="button" className="profile-btn profile-btn-secondary" onClick={handleCancel}>
                    Cancel
                  </button>
                </div>
              </form>
            ) : (
              <div className="profile-fields">
                <div className="profile-field">
                  <label className="profile-field-label">Email</label>
                  <input
                    type="email"
                    className="profile-form-control"
                    value={user.email || ''}
                    disabled
                    style={{ width: '100%' }}
                  />
                </div>

                <div className="profile-field">
                  <label className="profile-field-label">Name</label>
                  <p className={`profile-field-value ${!user.name ? 'empty' : ''}`}>
                    {user.name || 'Not set'}
                  </p>
                </div>

                <div className="profile-field" style={{ gridColumn: '1 / -1' }}>
                  <label className="profile-field-label">Bio</label>
                  <p className={`profile-field-value ${!user.bio ? 'empty' : ''}`}>
                    {user.bio || 'No bio yet...'}
                  </p>
                </div>

                <div className="profile-field">
                  <label className="profile-field-label">Location</label>
                  <p className={`profile-field-value ${!user.location ? 'empty' : ''}`}>
                    {user.location || 'Not set'}
                  </p>
                </div>

                <div className="profile-field">
                  <label className="profile-field-label">Website</label>
                  <p className={`profile-field-value ${!user.website ? 'empty' : ''}`}>
                    {user.website ? (
                      <a href={user.website.startsWith('http') ? user.website : `https://${user.website}`} target="_blank" rel="noopener noreferrer">
                        {user.website}
                      </a>
                    ) : 'Not set'}
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
