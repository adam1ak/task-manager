# Task Manager

A modern task management web application built with React, Firebase, and Tailwind CSS.

## Features

- User authentication (sign up, log in, log out) with Firebase Auth
- Create, edit, and delete tasks
- Mark tasks as completed or important
- Filter tasks: All, Important, Completed, ASAP (due soon)
- Responsive and clean UI with Tailwind CSS
- Persistent storage with Firebase Firestore
- Toast notifications for user feedback

## Frameworks & Libraries Used

- **React** – The main JavaScript library for building user interfaces.
- **React Router** – For client-side routing between pages like All Tasks, Important, Completed, and ASAP tasks.
- **Firebase** – Used for authentication and Firestore database to store user and task data.
- **Tailwind CSS** – Utility-first CSS framework for fast and responsive UI styling.
- **React Hook Form** – For flexible and performant form handling and validation.
- **React Icons** – Provides icon components (e.g., plus, edit, trash icons).
- **React DatePicker** – For selecting dates in task forms.
- **React Toastify** – For showing toast notifications to users.
- **React Spinners** – For loading indicators.

## Getting Started

### Prerequisites

- Node.js (v16 or higher recommended)
- npm


### Installation

1. **Clone the repository:**
   ```sh
   git clone https://github.com/your-username/task-manager.git
   cd task-manager
   ```

2. **Install dependencies:**
   ```sh
   npm install
   ```

3. **Set up Firebase:**
   - Create a Firebase project at [Firebase Console](https://console.firebase.google.com/)
   - Enable Authentication and Firestore Database
   - Copy your Firebase config and add it to a `.env` file in the root:
     ```
     REACT_APP_FIREBASE_API_KEY=your_api_key
     REACT_APP_FIREBASE_AUTH_DOMAIN=your_auth_domain
     REACT_APP_FIREBASE_PROJECT_ID=your_project_id
     REACT_APP_FIREBASE_STORAGE_BUCKET=your_storage_bucket
     REACT_APP_FIREBASE_MESSAGING_SENDER_ID=your_messaging_sender_id
     REACT_APP_FIREBASE_APP_ID=your_app_id
     REACT_APP_FIREBASE_MEASURMENT_ID=your_measurement_id
     ```

4. **Start the development server:**
   ```sh
   npm start
   ```
   The app will be available at [http://localhost:3000](http://localhost:3000).

## Scripts

- `npm start` – Run the app in development mode
- `npm run build` – Build the app for production
- `npm test` – Run tests

## Folder Structure

- `src/` – Main source code
  - `components/` – Reusable UI components
  - `pages/` – Page components for routing
  - `styles/` – CSS and Tailwind styles
  - `utils/` – Utility files and assets

## License

This project is licensed under the MIT License.

---
