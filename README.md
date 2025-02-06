# React Flow Graph Visualization

This project is a graph visualization application built using **React Flow** for interactive, draggable nodes with connected edges. The project leverages **Redux Toolkit** for efficient state management and **TypeScript** for type safety. The app is set up using **Vite** for a fast development experience.

## Features

### Graph Visualization

- **Initialize Graph**: The graph starts with 10 interconnected, draggable nodes.
- **Smooth Animations**: All graph interactions, including node dragging and edge connections, are smoothly animated.

### Node Customization

- **Color Modification**:
  - Select any node to change its color using a color picker.
  - Changes are reflected immediately.
  - Color history is tracked for undo/redo functionality.
- **Font Size Adjustment**:
  - Adjust node text size between 12px to 24px.
  - All font size changes are tracked for undo/redo.
  - Ensures readability at all sizes.

### Undo/Redo Functionality

- **Undo Button**: Reverts the last action (color change, font size change, or node position adjustment).
- **Redo Button**: Restores reverted actions.
- **Action Tracking**: Maintains a history stack of all modifications.

## Technical Stack

- **React.js**
- **Redux Toolkit** (for state management)
- **React Flow** (for graph visualization)
- **TypeScript** (for type safety)
- **Vite** (for project setup and development)

## Setup Instructions

### Prerequisites

- Node.js (v14 or higher recommended)
- npm or yarn package manager

### Getting Started

1. **Clone the Repository**

   ```bash
   git clone <repo-url>
   cd <repo-folder>
   ```

2. **Install Dependencies**
   Using npm:

   ```bash
   npm install
   ```

   Using yarn:

   ```bash
   yarn install
   ```

3. **Run the Application Locally**
   Using npm:

   ```bash
   npm run dev
   ```

   Using yarn:

   ```bash
   yarn dev
   ```

4. **Open in Browser**
   Visit `http://localhost:5173` in your web browser to see the app in action.

## Available Scripts

- `npm run dev` / `yarn dev`: Start the development server.
- `npm run build` / `yarn build`: Build the project for production.
- `npm run preview` / `yarn preview`: Preview the production build locally.

## Dependencies

- **react**
- **react-dom**
- **react-flow-renderer**
- **@reduxjs/toolkit**
- **react-redux**
- **typescript**
- **vite**

## Third-Party Libraries Used

- `reactflow`: For graph visualization.
- `@reduxjs/toolkit`: For state management.
- `react-redux`: For integrating Redux with React.
- `typescript`: For type safety.
- `vite`: For fast development and build process.
