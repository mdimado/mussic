### TateByte Recipes Website

Welcome to the TateByte Recipes website repository! This project is built using React.js for the frontend, Redux Toolkit for state management, and Firebase for backend services, providing a platform for sharing various dish recipes.
![Screenshot 2024-05-06 at 1 49 56 PM-modified](https://github.com/mdimado/TasteBite/assets/123477562/ecedaba1-2d97-4587-9e00-eaeac57b88ce)
<br/>
![Screenshot 2024-05-06 at 1 51 33 PM-modified](https://github.com/mdimado/TasteBite/assets/123477562/c93b7c1f-1620-432f-b4c8-b518d631d051)
<br/>
![Screenshot 2024-05-06 at 1 52 39 PM-modified](https://github.com/mdimado/TasteBite/assets/123477562/e8a9a0a5-b596-4faa-b048-fedc6696f099)


### Getting Started

To get started with this project, follow these steps:

1. **Clone the Repository:**
   ```bash
   git clone https://github.com/mdimado/TasteBite.git
   cd TasteBite
   ```

2. **Install Dependencies:**
   ```bash
   npm install
   ```

3. **Set Up Firebase:**
   - Create a Firebase project at [Firebase Console](https://console.firebase.google.com/).
   - Obtain your Firebase config credentials.
   - Add your Firebase config to `src/firebase.config.js`.

4. **Start the Development Server:**
   ```bash
   npm start
   ```

   This will run the React development server. You can view the website at `http://localhost:3000`.

### Folder Structure

The project folder structure is organized as follows:

- **`assets/`**: Contains static assets such as images, icons, or other media used in the project.

- **`components/`**: Houses reusable React components used throughout the website, such as `Header`, `RecipeCard`, `RecipeForm`, etc.

- **`custom-hooks/`**: Holds custom React hooks that encapsulate reusable logic, such as fetching data from Firebase or handling form state.

- **`pages/`**: Contains React components representing different website pages, such as `Home`, `Recipes`, `AddRecipe`, `RecipeDetails`, etc.

- **`redux/`**: Includes Redux-related files for state management using Redux Toolkit.
  - **`reducers/`**: Redux reducers for managing specific slices of state.
  - **`actions/`**: Action creators for dispatching actions to update state.
  - **`store.js`**: Configures the Redux store and middleware.

- **`routers/`**: Holds React Router configuration and routing components for navigation within the app.

- **`styles/`**: Contains CSS or SCSS files for styling components and layout.

- **`App.css`**: Global CSS file for styling the main application layout.

- **`App.js`**: Main component where routing and layout structure are defined. This component likely renders other components based on the current route.

- **`firebase.config.js`**: Configuration file for Firebase, including initialization and Firebase project settings.

- **`index.js`**: Entry point of the React application, where the React app is rendered into the HTML root element (`<div id="root"></div>`).

### Available Scripts

In the project directory, you can run the following scripts:

- **`npm start`**: Runs the app in development mode.
- **`npm test`**: Launches the test runner in interactive watch mode.
- **`npm run build`**: Builds the app for production to the `build` folder.

### Additional Topics

Explore these related topics to understand more about this project:

- React and Redux Toolkit for managing complex state in a recipe-sharing application.
- Firebase Firestore for storing recipe data and user authentication.
- Integrating Firebase Storage for recipe images.
- CSS or SCSS styling techniques for creating an appealing recipe website.

### Learn More

For more information about the technologies used in this project, refer to the following documentation:

- [React.js Documentation](https://reactjs.org/docs/getting-started.html)
- [Redux Toolkit Documentation](https://redux-toolkit.js.org/)
- [Firebase Documentation](https://firebase.google.com/docs)

Feel free to reach out with any questions or issues related to this project. Enjoy building your recipe-sharing platform!
