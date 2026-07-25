# ThreadHive Frontend - AI Agent Guide

Welcome to the ThreadHive frontend repository. This guide helps you navigate the architecture, conventions, and development workflow.

## Quick Start
- **Install**: `npm install`
- **Run dev server**: `npm run dev`
- **Build**: `npm run build`
- **Lint**: `npm run lint`

## Project Structure
- `src/api/`: Base API client (`fetchAPI`).
- `src/config/`: Configuration files (e.g., `apiConfig.js` for endpoints).
- `src/services/`: Business logic and API call abstractions. **Use these instead of calling `fetchAPI` directly in components.**
- `src/context/`: Global state providers (Auth, etc.).
- `src/components/`: Reusable UI components. Organized by feature folder (e.g., `ThreadList/`).
- `src/pages/`: Page-level components associated with routes.
- `src/utils/`: Shared utility functions and error handlers.

## Coding Conventions

### 1. API Interactions
- Define new endpoints in [src/config/apiConfig.js](src/config/apiConfig.js).
- Create a service function in `src/services/`.
- Use the service in your component or context.
- The `API_BASE_URL` is hardcoded in [src/api/apiClient.js](src/api/apiClient.js) for local development (`http://localhost:5000/api`).

### 2. Styling
- Use [react-bootstrap](https://react-bootstrap.github.io/) for layout and common UI elements (Buttons, Cards, Rows, Cols).
- Custom styles should be placed in a `.css` file within the component's folder and imported directly.
- Use Bootstrap Icons (`bi-` classes).

### 3. Authentication
- Managed via [src/context/AuthContext.jsx](src/context/AuthContext.jsx).
- Token and user data are persisted in `localStorage`.
- Use the `useAuth` hook to access `user`, `token`, and auth methods (login, logout).

### 4. Components
- Prefer functional components and hooks.
- Keep components small and focused.
- Place component-specific CSS files in the same directory as the `.jsx` file.

## Common Pitfalls
- **API URL**: Ensure the backend is running on port 5000 or update `API_BASE_URL` in [src/api/apiClient.js](src/api/apiClient.js).
- **State Sync**: When passing props to stateful components, ensure `useEffect` handles prop updates if the component stays mounted (see [src/components/ThreadList/ThreadCard.jsx](src/components/ThreadList/ThreadCard.jsx)).
