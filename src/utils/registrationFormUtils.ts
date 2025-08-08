// Generate display name options based on full name
export const generateDisplayNameOptions = (fullName: string): string[] => {
  const trimmedFullName = fullName.trim();
  if (!trimmedFullName) return [];
  
  const names = trimmedFullName.split(' ');
  if (names.length < 2) return [trimmedFullName];
  
  const firstName = names[0];
  const lastName = names[names.length - 1];
  
  // Options for display name dropdown
  const options = [
    trimmedFullName, // "Jane Doe"
    `${firstName} ${lastName}`, // "Jane Doe"
    `${firstName[0]}. ${lastName}`, // "J. Doe"
    `${firstName} ${lastName[0]}.`, // "Jane D."
    firstName // "Jane"
  ];
  
  // Remove duplicates
  return Array.from(new Set(options));
};

// Get skill level description
// TODO: Add tooltip instead?
// TODO: Change descriptions?
export const getSkillLevelDescription = (level: number): string => {
  if (level <= 1.5) return 'Beginner';
  if (level <= 2.5) return 'Advanced Beginner';
  if (level <= 3.5) return 'Intermediate';
  if (level <= 4.5) return 'Advanced';
  return 'Expert';
}; 