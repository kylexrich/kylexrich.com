
# [kylexrich.com](https://kylerich.com)

My personal portfolio website (and MERN stack template for future projects)

Staging: https://kylexrich-staging-d5a9dbd6a715.herokuapp.com/

Production: https://kylerich.com

---

## Features

- **Secure Authentication**: Leverages token-based authentication using JSON Web Tokens (JWT) for secure session management and administrative capabilities.
- **Interactive UI Animations**: Incorporates Framer Motion for fluid and engaging animations within the user interface.
- **Adaptive Responsive Design**: Ensures a uniform and seamless user experience across a variety of device screen sizes.
- **Customizable Themes**: Offers a choice between dark and light modes, along with accent color preferences, for a personalized visual experience.
- **MongoDB Backend Integration**: Employs MongoDB with Mongoose for efficient management of user and configuration data.
- **Live Changelog Updates**: Automatically displays recent website changes by integrating with the GitHub API.
- **Optimized State Management**: Utilizes Redux toolkit for streamlined state handling and implements backend caching to minimize latency and reduce unnecessary API calls.
- **Seamless Continuous Deployment**: Features a fully automated deployment pipeline via Heroku, promoting changes to a staging environment on the `dev` branch and to production on the `main` branch.
- **Enhanced Developer Workflow**: Provides a development environment that instantly reflects changes, reloading and restarting the server and frontend without manual intervention.
- **Coding Standards Enforcement**: Utilizes custom npm scripts alongside ESLint and Prettier configurations for the frontend and backend to ensure code quality and consistent formatting.

Discover future enhancements and planned features by visiting the [GitHub issues](https://github.com/kylexrich/kylexrich.com/issues) page!

---

## Built with

### Frontend
- **Framework**: [React](https://reactjs.org/) (used through [Create React App](https://create-react-app.dev/))
- **Styling**: [Chakra UI](https://chakra-ui.com/)
- **Animations**: [Framer Motion](https://www.framer.com/motion/)
- **State Management**: [Redux Toolkit](https://redux-toolkit.js.org/)
- **Routing**: [React Router](https://reactrouter.com/)
- **API Tooling**: [Axios](https://axios-http.com/) for HTTP requests
- **Markdown Rendering**: [React Markdown](https://github.com/remarkjs/react-markdown)
- **Deployment**: Configured to use environment-specific builds (development/staging/production)

### Backend
- **Server Framework**: [Express](https://expressjs.com/)
- **Database**: [Mongoose](https://mongoosejs.com/) (for MongoDB)
- **Authentication**: [jsonwebtoken](https://www.npmjs.com/package/jsonwebtoken) for token-based authentication
- **File Uploads**: [express-fileupload](https://www.npmjs.com/package/express-fileupload)
- **Logging**: [log4js](https://log4js-node.github.io/log4js-node/) (custom implementation)
- **API Tooling**: [Axios](https://axios-http.com/) for HTTP requests
- **Deployment**: Configured to use environment-specific builds (development/staging/production)

### Deployment and Version Control
- **Version Control**: [GitHub](https://github.com/kylexrich/)
- **Full CD Deployment**: [Heroku](https://www.heroku.com/home) (with custom build scripts)
- **Development**: Concurrently, Nodemon, and React Scripts to allow for automatic server restart & client reload on any backend or frontend changes

---

## Folder Structure

### `./client/src/`
- `api/*` - Axios setup for making backend API calls.
- `assets/*` - References to static files like images used within the application.
- `components/*` - React components used across the application.
  - `app/*` - Components specific to the main application structure.
    - `auth/*` - Authentication-related components.
    - `layout/*` - Components related to the overall page layout.
    - `navigation/*` - Components for navigating within the application.
  - `shared/*` - Generic components reusable in multiple parts of the application.
  - `pages/*` - Page components that correspond to routes in the application.
    - `about/*` - Components for the 'About' page.
    - `changelog/*` - Components for the 'Changelog' page.
    - `home/*` - Components for the 'Home' page.
    - `private/*` - Components for private routes.
    - `techstack/*` - Components for the 'Tech Stack' page.
- `config/*` - Configuration files and constants for the application.
- `hooks/*` - Custom React hooks for state and logic reuse.
- `redux/*` - Redux store configuration, action creators, and reducers.
- `theme/*` - Theme configuration and components for dynamic styling.
- `util/*` - Utility types and helpers.

### `./server/src/`
- `api/*` - Endpoints and related functionalities.
  - `auth/*` - Authentication-related controllers, services, repositories, and router factories.
  - `github/*` - GitHub integration controllers, services, repositories, types, and router factories.
  - `resume/*` - Resume-related controllers, services, repositories, and router factories.
  - `token/*` - Token handling.
- `config/*` - Configuration files for database connection, custom logging configuration, and other settings.
- `errors/*` - Custom error types for handling exceptions.
- `models/*` - Mongoose models for the application.
- `types/*` - Helper type definitions and interfaces.
- `util/*` - Helper classes.
- `server.ts` - Server entry point.
- `DependencyInjector.ts` - Dependency injector class that manages all backend dependencies.

---

## Local Development Setup

**Notes:**
- The development server is intended for testing and development purposes only.
  Feel free to reach out to me to learn how to deploy your version of this project to heroku.
- The below setup was only tested on macOS M1. Windows setup may differ.

**Follow these steps to run the project locally:**

1. Clone the repository and install dependencies:
   1. 
      ```sh
      git clone https://github.com/kylexrich/kylexrich.com
      cd kylexrich.com
      npm install
      ```

2. (Optional) Backend Configuration:
   1. To enable backend functionality, rename `./server/.envExample` to `./server/.env`. 
   2. Update the `.env` file with the required environment variables.

3. Start the development servers:
   1. Execute `npm run start:dev` from the project's root directory (`kylexrich.com`).

4. Confirmation of successful launch:
   1. The following should be printed to the console.
      ```txt
      [0] 12:10:04.434 [INFO] Connected to the database
      [0] 12:10:04.437 [INFO] [[development] Running on port 3001! Server URL: http://localhost:3001, Frontend Origin: http://localhost:3000
      [1] Compiled successfully!
      [1] 
      [1] You can now view client in the browser.
      [1] 
      [1]   Local:            http://localhost:3000
      [1]   On Your Network:  http://10.0.0.87:3000
      [1] 
      [1] Note that the development build is not optimized.
      [1] To create a production build, use npm run build.
      [1] 
      [1] webpack compiled successfully
      ```

5. Access the Application:
  - Frontend: Visit [http://localhost:3000](http://localhost:3000) in your web browser.
  - Backend: If step 2 is completed, the backend API will be accessible for Postman (or similar) testing via [http://localhost:3001](http://localhost:3001).
  - Network Devices: Access the frontend from another device on your network using the `On Your Network` URL displayed in the console.

---

## Cloning / Forking

Please review the [LICENSE](LICENSE.md)
