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
