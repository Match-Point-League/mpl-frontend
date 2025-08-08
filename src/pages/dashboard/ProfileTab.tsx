import React from 'react';
import { User } from './dashboardData';

interface ProfileTabProps {
  currentUser: User;
  onNotImplemented: (feature: string) => void;
}

const ProfileTab: React.FC<ProfileTabProps> = ({ currentUser, onNotImplemented }) => {
  return (
    <div className="profile-tab">
      <section className="settings-section">
        <h2>Profile Information</h2>
        <div className="form-group">
          <label>Name</label>
          <input type="text" value={currentUser.name} readOnly />
        </div>
        <div className="form-group">
          <label>Email</label>
          <input type="email" value={currentUser.email} readOnly />
        </div>
        <div className="form-group">
          <label>Display Name</label>
          <input type="text" value={currentUser.display_name} readOnly />
        </div>
        <button onClick={() => onNotImplemented('Update Profile')}>
          Update Profile
        </button>
      </section>

      <section className="settings-section">
        <h2>Privacy Settings</h2>
        <div className="checkbox-group">
          <input 
            type="checkbox" 
            id="allow-contact" 
            checked={currentUser.allow_direct_contact}
            readOnly
          />
          <label htmlFor="allow-contact">Allow direct contact</label>
        </div>
        <button onClick={() => onNotImplemented('Update Privacy')}>
          Update Privacy Settings
        </button>
      </section>

      <section className="settings-section">
        <h2>Game Preferences</h2>
        <div className="form-group">
          <label>Skill Level</label>
          <input type="number" step="0.5" min="1" max="5.5" value={currentUser.skill_level} readOnly />
        </div>
        <div className="form-group">
          <label>Preferred Sport</label>
          <select value={currentUser.preferred_sport} disabled>
            <option value="tennis">Tennis</option>
            <option value="pickleball">Pickleball</option>
            <option value="both">Both</option>
          </select>
        </div>
        <div className="form-group">
          <label>City</label>
          <input type="text" value={currentUser.city} readOnly />
        </div>
        <div className="form-group">
          <label>Zip Code</label>
          <input type="text" value={currentUser.zip_code} readOnly />
        </div>
        <div className="checkbox-group">
          <input 
            type="checkbox" 
            id="competitive" 
            checked={currentUser.is_competitive}
            readOnly
          />
          <label htmlFor="competitive">Competitive player</label>
        </div>
        <button onClick={() => onNotImplemented('Update Preferences')}>
          Update Preferences
        </button>
      </section>

      <section className="settings-section">
        <h2>Account Security</h2>
        <button onClick={() => onNotImplemented('Change Password')}>
          Change Password
        </button>
      </section>

      <section className="settings-section danger-zone">
        <h2>Account Management</h2>
        <button 
          className="logout-btn"
          onClick={() => onNotImplemented('Logout')}
        >
          Logout
        </button>
        <button 
          className="delete-btn"
          onClick={() => onNotImplemented('Delete Account')}
        >
          Delete Account
        </button>
      </section>
    </div>
  );
};

export default ProfileTab;