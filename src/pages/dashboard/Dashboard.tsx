import React, { useState, useEffect } from 'react';
import { sampleUser, sampleMatches, getUserStats } from './dashboardData';
import { ProfileTab, MatchesTab } from '@/components/dashboard';
import '@/styles/dashboard.css';
import { MatchStatus, UserProfile } from '@/types';
import { UsersService } from '@/services/usersService';

export const Dashboard: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'profile' | 'matches'>('profile');
  const [currentUser, setCurrentUser] = useState<UserProfile>(sampleUser);
  const stats = getUserStats();
  const matches = sampleMatches;

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const userProfile = await UsersService.getProfile();
        setCurrentUser(userProfile);
      } catch (error) {
        console.error('Error fetching user profile:', error);
      }
    };
    fetchUserProfile();
  }, []);
  
  useEffect(() => {
    console.log('Fetching user matches');
  }, []);

  const handleNotImplemented = (feature: string) => {
    console.log(`${feature} feature is being implemented`);
    alert(`${feature} feature is being implemented`);
  };

  const handleUserUpdate = (updatedUser: UserProfile) => {
    setCurrentUser(updatedUser);
  };

  const pastMatches = matches.filter(match => 
    ![MatchStatus.PENDING, MatchStatus.CANCELLED].includes(match.status as MatchStatus) && 
    (match.player1_id === currentUser.id || match.player2_id === currentUser.id) &&
    new Date(match.match_time) < new Date()
  );

  const upcomingMatches = matches.filter(match => 
    [MatchStatus.PENDING, MatchStatus.CONFIRMED].includes(match.status as MatchStatus) && 
    (match.player1_id === currentUser.id || match.player2_id === currentUser.id) &&
    new Date(match.match_time) >= new Date()
  );

  return (
    <div className="dashboard">
      <div className="welcome-banner">
        <h1>Welcome back, {currentUser.display_name}!</h1>
        <div className="user-info">
          <span className="skill-level">Skill Level: {currentUser.skill_level}</span>
          <div className="stats">
            <span>Matches: {stats.matchesPlayed}</span>
            <span>Win Rate: {Math.round(stats.winRate * 100)}%</span>
            <span>Current Streak: {stats.currentStreak}</span>
          </div>
        </div>
      </div>

      <div className="action-buttons">
        <button 
          className="action-btn primary"
          onClick={() => handleNotImplemented('Join League')}
        >
          Join League
        </button>
        <button 
          className="action-btn secondary"
          onClick={() => handleNotImplemented('Schedule Friendly Match')}
        >
          Schedule Friendly Match
        </button>
        <button 
          className="action-btn secondary"
          onClick={() => handleNotImplemented('View Available Players')}
        >
          View Available Players
        </button>
      </div>

      <div className="tab-container">
        <div className="tab-header">
          <button 
            className={`tab-btn ${activeTab === 'profile' ? 'active' : ''}`}
            onClick={() => setActiveTab('profile')}
          >
            Profile Settings
          </button>
          <button 
            className={`tab-btn ${activeTab === 'matches' ? 'active' : ''}`}
            onClick={() => setActiveTab('matches')}
          >
            Matches
          </button>
        </div>

        <div className="tab-content">
          {activeTab === 'profile' && (
            <ProfileTab 
              currentUser={currentUser} 
              onUserUpdate={handleUserUpdate}
            />
          )}

          {activeTab === 'matches' && (
            <MatchesTab
              currentUser={currentUser}
              pastMatches={pastMatches}
              upcomingMatches={upcomingMatches}
              onNotImplemented={handleNotImplemented}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;