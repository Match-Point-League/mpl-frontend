import { Match } from "@/pages/dashboard/dashboardData";

/**
 * Formats a date string into a human-readable format.
 * Example output: "Jul 15, 2024, 02:00 PM"
 *
 * @param {string} dateString - The date string to format (ISO 8601 or similar).
 * @returns {string} The formatted date string in "MMM DD, YYYY, HH:MM AM/PM" format.
 */
export const formatDate = (dateString: string): string => {
  return new Date(dateString).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });
};

/**
 * Formats a match score into a human-readable format.
 * Example output: "6-4, 7-6 (4-3)"
 *
 * @param {Match} match - The match to format.
 * @returns {string} The formatted match score string.
 */
export const formatMatchScore = (match: Match) => {
  if (!match.score) return 'No score';
  return match.score.sets.map((set) => 
    `${set.player1}-${set.player2}${set.tiebreak ? ` (${set.tiebreak.player1}-${set.tiebreak.player2})` : ''}`
  ).join(', ');
};