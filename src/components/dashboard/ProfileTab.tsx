import React, { useState } from 'react';
import { UserProfile, UpdateUserInput, SportOptions } from '@/types';
import { UsersService } from '@/services/usersService';
import { signOut, resetPassword } from '@/services/authService';
import { useNavigate } from 'react-router-dom';

interface ProfileTabProps {
  currentUser: UserProfile;
  onUserUpdate?: (updatedUser: UserProfile) => void;
}

const ProfileTab: React.FC<ProfileTabProps> = ({ currentUser, onUserUpdate }) => {
  const navigate = useNavigate();
  
  const [profileData, setProfileData] = useState<UpdateUserInput>({
    name: currentUser.name,
    display_name: currentUser.display_name,
  });

  const [privacyData, setPrivacyData] = useState<UpdateUserInput>({
    allow_direct_contact: currentUser.allow_direct_contact,
  });

  const [preferencesData, setPreferencesData] = useState<UpdateUserInput>({
    skill_level: currentUser.skill_level,
    preferred_sport: currentUser.preferred_sport,
    zip_code: currentUser.zip_code,
    is_competitive: currentUser.is_competitive,
  });

  const [isUpdating, setIsUpdating] = useState(false);

  const handleUpdateProfile = async () => {
    if (!profileData.name || !profileData.display_name) {
      alert('Please fill in all profile fields');
      return;
    }

    setIsUpdating(true);
    try {
      const updatedUser = await UsersService.updateUser(profileData);
      onUserUpdate?.(updatedUser);
      alert('Profile updated successfully!');
    } catch (error) {
      console.error('Error updating profile:', error);
      alert('Failed to update profile. Please try again.');
    } finally {
      setIsUpdating(false);
    }
  };

  const handleUpdatePrivacy = async () => {
    setIsUpdating(true);
    try {
      const updatedUser = await UsersService.updateUser(privacyData);
      onUserUpdate?.(updatedUser);
      alert('Privacy settings updated successfully!');
    } catch (error) {
      console.error('Error updating privacy settings:', error);
      alert('Failed to update privacy settings. Please try again.');
    } finally {
      setIsUpdating(false);
    }
  };

  const handleUpdatePreferences = async () => {
    if (!preferencesData.skill_level || !preferencesData.city || !preferencesData.zip_code) {
      alert('Please fill in all preference fields');
      return;
    }

    setIsUpdating(true);
    try {
      const updatedUser = await UsersService.updateUser(preferencesData);
      onUserUpdate?.(updatedUser);
      alert('Preferences updated successfully!');
    } catch (error) {
      console.error('Error updating preferences:', error);
      alert('Failed to update preferences. Please try again.');
    } finally {
      setIsUpdating(false);
    }
  };

  const handleChangePassword = async () => {
    try {
      await resetPassword(currentUser.email);
    } catch (error) {
      console.error('Error resetting password:', error);
      alert('Failed to reset password. Please try again.');
    }
  };

  const handleLogout = async () => {
    try {
      await signOut();
      navigate('/login');
    } catch (error) {
      console.error('Error logging out:', error);
      alert('Failed to logout. Please try again.');
    }
  };

  const handleDeleteAccount = () => {
    console.log('Delete Account');
  };

  return (
    <div className="profile-tab">
      <section className="settings-section">
        <h2>Profile Information</h2>
        <div className="form-group">
          <label>Name</label>
          <input type="text" value={profileData.name} onChange={(e) => setProfileData({ ...profileData, name: e.target.value })} />
        </div>
        <div className="form-group">
          <label>Email</label>
          <input type="email" value={currentUser.email} readOnly />
        </div>
        <div className="form-group">
          <label>Display Name</label>
          <input type="text" value={profileData.display_name} onChange={(e) => setProfileData({ ...profileData, display_name: e.target.value })} />
        </div>
        <button onClick={handleUpdateProfile} disabled={isUpdating}>
          {isUpdating ? 'Updating...' : 'Update Profile'}
        </button>
      </section>

      <section className="settings-section">
        <h2>Privacy Settings</h2>
        <div className="checkbox-group">
          <input 
            type="checkbox" 
            id="allow-contact" 
            checked={privacyData.allow_direct_contact}
            onChange={(e) => setPrivacyData({ ...privacyData, allow_direct_contact: e.target.checked })}
          />
          <label htmlFor="allow-contact">Allow direct contact</label>
        </div>
        <button onClick={handleUpdatePrivacy} disabled={isUpdating}>
          {isUpdating ? 'Updating...' : 'Update Privacy Settings'}
        </button>
      </section>

      <section className="settings-section">
        <h2>Game Preferences</h2>
        <div className="form-group">
          <label>Skill Level</label>
          <input type="number" step="0.5" min="1" max="5.5" value={preferencesData.skill_level} onChange={(e) => setPreferencesData({ ...preferencesData, skill_level: parseFloat(e.target.value) })} />
        </div>
        <div className="form-group">
          <label>Preferred Sport</label>
          <select value={preferencesData.preferred_sport} onChange={(e) => setPreferencesData({ ...preferencesData, preferred_sport: e.target.value as SportOptions })}>
            <option value={SportOptions.TENNIS}>Tennis</option>
            <option value={SportOptions.PICKLEBALL}>Pickleball</option>
            <option value={SportOptions.BOTH}>Both</option>
          </select>
        </div>
        <div className="form-group">
          <label>City</label>
          <input type="text" value={preferencesData.city} />
        </div>
        <div className="form-group">
          <label>Zip Code</label>
          <input type="text" value={preferencesData.zip_code} onChange={(e) => setPreferencesData({ ...preferencesData, zip_code: e.target.value })} />
        </div>
        <div className="checkbox-group">
          <input 
            type="checkbox" 
            id="competitive" 
            checked={preferencesData.is_competitive}
            onChange={(e) => setPreferencesData({ ...preferencesData, is_competitive: e.target.checked })}
          />
          <label htmlFor="competitive">Competitive player</label>
        </div>
        <button onClick={handleUpdatePreferences} disabled={isUpdating}>
          {isUpdating ? 'Updating...' : 'Update Preferences'}
        </button>
      </section>

      <section className="settings-section">
        <h2>Account Security</h2>
        <button onClick={handleChangePassword}>
          Change Password
        </button>
      </section>

      <section className="settings-section danger-zone">
        <h2>Account Management</h2>
        <button 
          className="logout-btn"
          onClick={() => handleLogout()}
        >
          Logout
        </button>
        <button 
          className="delete-btn"
          onClick={() => handleDeleteAccount()}
        >
          Delete Account
        </button>
      </section>
    </div>
  );
};

export default ProfileTab;