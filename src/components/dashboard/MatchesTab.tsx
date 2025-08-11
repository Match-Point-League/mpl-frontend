import React from 'react';
import { User, Match, getUserById, getCourtById } from '../../pages/dashboard/dashboardData';
import { formatDate } from '@/utils/formatUtils';

interface MatchesTabProps {
  currentUser: User;
  pastMatches: Match[];
  upcomingMatches: Match[];
  onNotImplemented: (feature: string) => void;
}

const MatchesTab: React.FC<MatchesTabProps> = ({ 
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
                      <div className="score-grid">
                        <strong>Score:</strong>
                        <table className="score-table">
                          <thead>
                            <tr>
                              <th></th>
                              {match.score?.sets.map((_, idx) => (
                                <th key={idx}>Set {idx + 1}</th>
                              ))}
                            </tr>
                          </thead>
                          <tbody>
                            <tr>
                              <td>{getUserById(match.player1_id)?.display_name || 'Player 1'}</td>
                              {match.score?.sets.map((set, idx) => (
                                <td key={idx}>
                                  {set.player1}
                                  {set.tiebreak ? (
                                    <span className="tiebreak"> (TB: {set.tiebreak.player1}-{set.tiebreak.player2})</span>
                                  ) : null}
                                </td>
                              ))}
                            </tr>
                            <tr>
                              <td>{getUserById(match.player2_id)?.display_name || 'Player 2'}</td>
                              {match.score?.sets.map((set, idx) => (
                                <td key={idx}>
                                  {set.player2}
                                  {set.tiebreak ? (
                                    <span className="tiebreak"> (TB: {set.tiebreak.player2}-{set.tiebreak.player1})</span>
                                  ) : null}
                                </td>
                              ))}
                            </tr>
                          </tbody>
                        </table>
                      </div>
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