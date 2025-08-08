export interface User {
  id: string;
  email: string;
  name: string;
  display_name: string;
  skill_level: number;
  preferred_sport: 'tennis' | 'pickleball' | 'both';
  is_competitive: boolean;
  city: string;
  zip_code: string;
  allow_direct_contact: boolean;
  created_at: string;
  updated_at: string;
}

export interface Match {
  id: string;
  player1_id: string;
  player2_id: string;
  match_type: 'friendly' | 'league';
  sport: 'tennis' | 'pickleball';
  match_time: string;
  court_id: string;
  status: 'pending' | 'confirmed' | 'score reported' | 'score verified' | 'completed' | 'cancelled';
  score?: {
    sets: Array<{
      player1: number;
      player2: number;
      tiebreak?: { player1: number; player2: number };
    }>;
  };
  winner_id?: string;
  created_by: string;
  score_submitter_id?: string;
  score_verified: boolean;
  created_at: string;
  updated_at: string;
}

export interface Court {
  id: string;
  name: string;
  address_line: string;
  city: string;
  state: string;
  zip_code: string;
  is_indoor: boolean;
  lights?: boolean;
  sport: 'tennis' | 'pickleball' | 'both';
  verified: boolean;
  created_by: string;
  created_at: string;
  updated_at: string;
}

// Sample data
export const sampleUser: User = {
  id: 'user-1',
  email: 'alex.johnson@email.com',
  name: 'Alex Johnson',
  display_name: 'Alex J.',
  skill_level: 3.5,
  preferred_sport: 'tennis',
  is_competitive: true,
  city: 'San Francisco',
  zip_code: '94102',
  allow_direct_contact: true,
  created_at: '2024-01-15T10:00:00Z',
  updated_at: '2024-01-15T10:00:00Z'
};

export const sampleCourts: Court[] = [
  {
    id: 'court-1',
    name: 'Golden Gate Park Tennis Courts',
    address_line: '501 Stanyan St',
    city: 'San Francisco',
    state: 'CA',
    zip_code: '94117',
    is_indoor: false,
    lights: true,
    sport: 'tennis',
    verified: true,
    created_by: 'admin-1',
    created_at: '2024-01-01T00:00:00Z',
    updated_at: '2024-01-01T00:00:00Z'
  },
  {
    id: 'court-2',
    name: 'Mission Bay Recreation Center',
    address_line: '540 Mission Bay Blvd N',
    city: 'San Francisco',
    state: 'CA',
    zip_code: '94158',
    is_indoor: true,
    sport: 'both',
    verified: true,
    created_by: 'admin-1',
    created_at: '2024-01-01T00:00:00Z',
    updated_at: '2024-01-01T00:00:00Z'
  }
];

export const sampleUsers: User[] = [
  sampleUser,
  {
    id: 'user-2',
    email: 'sarah.wilson@email.com',
    name: 'Sarah Wilson',
    display_name: 'Sarah W.',
    skill_level: 4.0,
    preferred_sport: 'tennis',
    is_competitive: false,
    city: 'San Francisco',
    zip_code: '94103',
    allow_direct_contact: false,
    created_at: '2024-01-10T10:00:00Z',
    updated_at: '2024-01-10T10:00:00Z'
  },
  {
    id: 'user-3',
    email: 'mike.chen@email.com',
    name: 'Mike Chen',
    display_name: 'Mike C.',
    skill_level: 3.0,
    preferred_sport: 'pickleball',
    is_competitive: true,
    city: 'San Francisco',
    zip_code: '94110',
    allow_direct_contact: true,
    created_at: '2024-01-05T10:00:00Z',
    updated_at: '2024-01-05T10:00:00Z'
  }
];

export const sampleMatches: Match[] = [
  // Past matches
  {
    id: 'match-1',
    player1_id: 'user-1',
    player2_id: 'user-2',
    match_type: 'friendly',
    sport: 'tennis',
    match_time: '2024-07-15T14:00:00Z',
    court_id: 'court-1',
    status: 'completed',
    score: {
      sets: [
        { player1: 6, player2: 4 },
        { player1: 3, player2: 6 },
        { player1: 7, player2: 6, tiebreak: { player1: 10, player2: 8 } }
      ]
    },
    winner_id: 'user-1',
    created_by: 'user-1',
    score_submitter_id: 'user-1',
    score_verified: true,
    created_at: '2024-07-10T10:00:00Z',
    updated_at: '2024-07-15T16:00:00Z'
  },
  {
    id: 'match-2',
    player1_id: 'user-1',
    player2_id: 'user-3',
    match_type: 'league',
    sport: 'tennis',
    match_time: '2024-07-20T10:00:00Z',
    court_id: 'court-2',
    status: 'completed',
    score: {
      sets: [
        { player1: 4, player2: 6 },
        { player1: 6, player2: 2 },
        { player1: 4, player2: 6 }
      ]
    },
    winner_id: 'user-3',
    created_by: 'user-3',
    score_submitter_id: 'user-3',
    score_verified: true,
    created_at: '2024-07-18T10:00:00Z',
    updated_at: '2024-07-20T12:00:00Z'
  },
  // Upcoming matches
  {
    id: 'match-3',
    player1_id: 'user-1',
    player2_id: 'user-2',
    match_type: 'friendly',
    sport: 'tennis',
    match_time: '2025-08-10T15:00:00Z',
    court_id: 'court-1',
    status: 'confirmed',
    created_by: 'user-1',
    score_verified: false,
    created_at: '2025-08-05T10:00:00Z',
    updated_at: '2025-08-05T10:00:00Z'
  },
  {
    id: 'match-4',
    player1_id: 'user-1',
    player2_id: 'user-3',
    match_type: 'league',
    sport: 'tennis',
    match_time: '2025-08-15T18:00:00Z',
    court_id: 'court-2',
    status: 'pending',
    created_by: 'user-3',
    score_verified: false,
    created_at: '2025-08-06T09:00:00Z',
    updated_at: '2025-08-06T09:00:00Z'
  }
];

// Helper functions to get display data
export const getUserById = (id: string) => sampleUsers.find(user => user.id === id);
export const getCourtById = (id: string) => sampleCourts.find(court => court.id === id);

export const getUserStats = () => ({
  matchesPlayed: sampleMatches.filter(m => m.status === 'completed' && (m.player1_id === sampleUser.id || m.player2_id === sampleUser.id)).length,
  wins: sampleMatches.filter(m => m.status === 'completed' && m.winner_id === sampleUser.id).length,
  winRate: 0.5, // 50%
  currentStreak: 2
});