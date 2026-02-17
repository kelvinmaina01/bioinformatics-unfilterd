# Project Audit: Bioinformatics Unfiltered 🧬

## 📋 Project Overview
**Bioinformatics Unfiltered** is a React-based hub for the bioinformatics community in Kenya, utilizing Firebase for authentication and data storage. The project is in a late-stage development phase with many core components implemented but several key features still relying on mock data or local storage.

---

## ✅ Implemented Features
The following features are fully implemented and connected to Firebase:

1.  **Authentication & Onboarding**:
    *   Google Sign-in integrated.
    *   Multi-step onboarding wizard for role selection (Researcher, Student, Developer).
    *   Profile initialization and persistence in Firestore `users` collection.
2.  **University Map**:
    *   Interactive map showing Kenyan universities and biomedical institutions.
3.  **Events Management**:
    *   Events listing and detailed single-event view.
    *   Data fetched from Firestore `events` collection.
4.  **Community Directory**:
    *   Searchable list of community members from Firestore.
5.  **Admin Dashboard**:
    *   Basic layout and controllers for managing events and blog posts.
6.  **Database Seeder**:
    *   utility to populate Firebase with mock data for testing.

---

## 🏗️ Remaining Parts (Gaps & Opportunities)
These components require further development to be production-ready:

### 1. 💬 Missing Forum Feature
*   **Status**: Not Implemented.
*   **Detail**: The `README.md` mentions a "Reddit-style forum with upvoting," but no code exists for this feature in the current repository. This is the largest missing piece of the MVP.

### 2. 📰 Stories/Blog Logic Synchronization
*   **Status**: Partial/Disconnected.
*   **Detail**: The main `Blogs.tsx` page currently uses `localStorage` for persisting new posts and falls back to hardcoded mock data. While there is a `BlogController` in the Admin section that uses Firebase, it is not yet integrated with the public-facing blog page.

### 3. 🗨️ Community Chat Persistence
*   **Status**: Mocked/Local.
*   **Detail**: The `CommunityChat.tsx` component persists messages to `localStorage` instead of a realtime Firebase Firestore collection. This means users cannot see each other's messages.

### 4. 📈 Leaderboard & Gamification
*   **Status**: Mocked.
*   *Detail**: The contribution scores shown on the Community page are generated using `Math.random()`. Real logic needs to be implemented to calculate scores based on community involvement.

### 5. 📅 RSVP Logic
*   **Status**: UI Only.
*   **Detail**: The "RSVP" button on event pages does not yet record the user's intent in the database. A `rsvps` collection and associated logic are needed.

### 6. 📄 Research Papers & Projects
*   **Status**: Static/Frontend Only.
*   **Detail**: Uploading and Managing papers/projects are currently limited to mock data. Real CRUD functionality for researchers to share their work is missing.

---

## 🚀 Recommendation & Next Steps
1.  **Implement the Forum**: Build the Firestore collection and UI for community discussions.
2.  **Sync Firebase with Blogs & Chat**: Migrate away from `localStorage` to Firestore for realtime collaboration.
3.  **Implement RSVP Flow**: Connect the RSVP button to a database action.
4.  **Gamification**: Define and implement the `contributionScore` logic.
