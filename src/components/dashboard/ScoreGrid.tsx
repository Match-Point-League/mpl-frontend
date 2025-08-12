import React from 'react';
import { Match } from '@/pages/dashboard/dashboardData';
import { getUserById } from '@/pages/dashboard/dashboardData';

interface ScoreGridProps {
  match: Match;
}

const ScoreGrid: React.FC<ScoreGridProps> = ({ match }) => {
  if (!match.score?.sets || match.score.sets.length === 0) {
    return (
      <div className="score-grid">
        <strong>Score:</strong>
        <p className="no-score">No score available</p>
      </div>
    );
  }

  return (
    <div className="score-grid">
      <strong>Score:</strong>
      <table className="score-table">
        <thead>
          <tr>
            <th></th>
            {match.score.sets.map((_, idx) => (
              <th key={idx}>Set {idx + 1}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>{getUserById(match.player1_id)?.display_name || 'Player 1'}</td>
            {match.score.sets.map((set, idx) => (
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
            {match.score.sets.map((set, idx) => (
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
  );
};

export default ScoreGrid;
