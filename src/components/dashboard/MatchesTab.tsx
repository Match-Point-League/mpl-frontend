import React from 'react';
import { Match, getUserById, getCourtById } from '@/pages/dashboard/dashboardData';
import { formatDate } from '@/utils/formatUtils';
import { ScoreGrid } from './ScoreGrid';
import { MatchStatus, UserProfile } from '@/types';

interface MatchesTabProps {
  currentUser: UserProfile;
  pastMatches: Match[];
  upcomingMatches: Match[];
  onNotImplemented: (feature: string) => void;
}

export const MatchesTab: React.FC<MatchesTabProps> = ({ 
  currentUser, 
  pastMatches, 
  upcomingMatches, 
  onNotImplemented 
}) => {
  return (
    <div className="matches-tab">
      <section className="matches-section">
        <h2>Upcoming Matches</h2>
        {upcomingMatches.length === 0 ? (
          <p className="no-matches">No upcoming matches</p>
        ) : (
          <div className="matches-list">
            {upcomingMatches.map(match => {
              const opponent = getUserById(
                match.player1_id === currentUser.id ? match.player2_id : match.player1_id
              );
              const court = getCourtById(match.court_id);
              
              return (
                <div key={match.id} className="match-card upcoming">
                  <div className="match-info">
                    <div className="match-header">
                      <h3>vs {opponent?.display_name}</h3>
                      <span className={`status ${match.status}`}>{match.status}</span>
                    </div>
                    <div className="match-details">
                      <p><strong>Date:</strong> {formatDate(match.match_time)}</p>
                      <p><strong>Sport:</strong> {match.sport}</p>
                      <p><strong>Type:</strong> {match.match_type}</p>
                      <p><strong>Court:</strong> {court?.name}</p>
                      <p><strong>Location:</strong> {court?.address_line}, {court?.city}</p>
                    </div>
                  </div>
                  <div className="match-actions">
                    <button 
                      className="confirm-btn"
                      onClick={() => onNotImplemented('Confirm Match')}
                    >
                      Confirm
                    </button>
                    <button 
                      className="reject-btn"
                      onClick={() => onNotImplemented('Reject Match')}
                    >
                      Reject
                    </button>
                    <button 
                      className="reschedule-btn"
                      onClick={() => onNotImplemented('Reschedule Match')}
                    >
                      Reschedule
                    </button>
                    <button 
                      className="cancel-btn"
                      onClick={() => onNotImplemented('Cancel Match')}
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </section>

      <section className="matches-section">
        <h2>Past Match Results</h2>
        {pastMatches.length === 0 ? (
          <p className="no-matches">No past matches</p>
        ) : (
          <div className="matches-list">
            {pastMatches.map(match => {
              const opponent = getUserById(
                match.player1_id === currentUser.id ? match.player2_id : match.player1_id
              );
              const court = getCourtById(match.court_id);
              const isWinner = match.winner_id === currentUser.id;
              
              return (
                <div key={match.id} className={`match-card past ${isWinner ? 'won' : 'lost'}`}>
                  <div className="match-info">
                    <div className="match-header">
                      <h3>vs {opponent?.display_name}</h3>
                      <span className={`result ${isWinner ? 'win' : 'loss'}`}>
                        {isWinner ? 'W' : 'L'}
                      </span>
                    </div>
                    <div className="match-details">
                      <p><strong>Date:</strong> {formatDate(match.match_time)}</p>
                      <p><strong>Sport:</strong> {match.sport}</p>
                      <p><strong>Type:</strong> {match.match_type}</p>
                      {match.status === MatchStatus.SCORE_REPORTED || match.status === MatchStatus.SCORE_VERIFIED ? (
                        <ScoreGrid match={match} />
                      ) : (
                        <div className="score-input-section">
                          <p><strong>Score:</strong> No score reported</p>
                          <button 
                            className="input-score-btn"
                            onClick={() => onNotImplemented('Input Score')}
                          >
                            Input Score
                          </button>
                        </div>
                      )}
                      <p><strong>Court:</strong> {court?.name}</p>
                      <p><strong>Location:</strong> {court?.address_line}, {court?.city}</p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </section>
    </div>
  );
};

export default MatchesTab;