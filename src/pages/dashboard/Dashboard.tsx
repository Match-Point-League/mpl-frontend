import React, { useState } from 'react';
import { sampleUser, sampleMatches, getUserStats } from './dashboardData';
import ProfileTab from './ProfileTab';
import MatchesTab from './MatchesTab';
import './Dashboard.css';

export const Dashboard: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'profile' | 'matches'>('profile');
  const currentUser = sampleUser;
  const stats = getUserStats();

  const handleNotImplemented = (feature: string) => {
    console.log(`${feature} feature is being implemented`);
    alert(`${feature} feature is being implemented`);
  };

  const pastMatches = sampleMatches.filter(match => 
    match.status === 'completed' && 
    (match.player1_id === currentUser.id || match.player2_id === currentUser.id)
  );

  const upcomingMatches = sampleMatches.filter(match => 
    ['pending', 'confirmed'].includes(match.status) && 
    (match.player1_id === currentUser.id || match.player2_id === currentUser.id)
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
              onNotImplemented={handleNotImplemented} 
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