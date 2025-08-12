# User Dashboard

The user dashboard with three tabs: **matches** and **settings**.

## Tab Structure

### 1. Matches Tab
- **Past Match Results** - Display historical match outcomes with detailed statistics including:
  - Match date, time, and location
  - Opponent information and final score
- **Upcoming Matches** - Show scheduled future matches with:
  - Match details (date, time, location, opponent)
  - Match type (league, friendly, tournament)
  - Confirmation status and any pending actions
  - Quick action buttons (confirm, reject (option to propose alternative on reject), reschedule, cancel)

### 2. Profile Settings Tab
- **Settings Section** - Manage user preferences and data including:
  - Profile information (name, email, display name)
  - Privacy settings (allow direct contact)
  - Game preferences (skill level, zip code, city, preferred sport, competitiveness)
  - Account security settings (password change)
- **Logout Option** - User logout functionality with session management
- **Delete Account Option** - Account deletion capability with confirmation dialog and data export option

## User Experience

- The **profile tab** should be the first thing the user sees when accessing the dashboard
- Implement smooth transitions between tabs with loading states
- Provide real-time updates for notifications and match status changes
- Include search and filter functionality for matches and notifications

## Additional Features to Integrate

### Core Components
- **Welcome Banner** - Personalized greeting for users displaying:
  - Greeting with display name
  - Current skill level
  - Quick stats (matches played, win rate, current streak)
- **Action Buttons** - Quick access to key features:
  - **Join League** - Browse available leagues, view requirements, and join with one click
  - **Schedule Friendly Match** - Quick match scheduling with player search and availability checking
  - **View Available Players** - Browse players in the area with filtering by skill level, availability, and distance

### Implementation Notes

- Add handler functions for all actions (action buttons linking to other pages, fetching user data, and modifying user data) that execute a simple logging statement notifying the user that this feature is being implemented
- Create a new file that contains sample data for matches and profile including:
  - Mock user profiles with realistic data
  - Sample match history with various outcomes
  - Notification examples for different scenarios
  - League and player availability data
- Keep the styling clean and simple—only add necessary styling
- Implement responsive design for mobile and tablet compatibility
- Add accessibility features (ARIA labels, keyboard navigation, screen reader support)
- Reference DATABASES.md for sample data structure (located in backend/migrations)