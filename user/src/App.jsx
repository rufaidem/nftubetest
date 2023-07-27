import React, { useContext } from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import { Home } from '../src/pages'
import SignIn from "./pages/SignIn"
import { Navbar, Sidebar } from './components'
import Profile from "./pages/Profile"
import CreatePost from "./pages/CreatePost";
import PostDetails from "./pages/PostDetails";
import { ThemeProvider, ThemeContext } from "./theme";

const AppContent = () => {
  const { theme } = useContext(ThemeContext);
  const location = useLocation();

  // Check if the current page is the SignIn page
  const isSignInPage = location.pathname === "/";

  return (
    <div className={`relative sm:-8 p-4 min-h-screen flex flex-row ${theme}`} id={theme}>
      {/* Conditionally render the Sidebar based on the page */}
      {!isSignInPage && (
        <div className="sm:flex hidden mr-10 relative">
          <Sidebar />
        </div>
      )}

      <div className="flex-1 max-sm:w-full max-w-[1280px] mx-auto sm:pr-5">
        {/* Conditionally render the Navbar based on the page */}
        {!isSignInPage && <Navbar />}

        <Routes>
          {/* Render the SignIn page */}
          <Route path="/" element={<SignIn />} />

          {/* Render other pages */}
          <Route path="/home" element={<Home />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/create-post" element={<CreatePost />} />
          <Route path="/post-details" element={<PostDetails />} />
        </Routes>
      </div>
    </div>
  );
};

const App = () => {
  return (
    <ThemeProvider>
      <AppContent />
    </ThemeProvider>
  );
};

export default App;
