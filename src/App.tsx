import { MantineProvider } from "@mantine/core";
import "@mantine/core/styles.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import { AuthProvider } from "./context/AuthContext";
import { LikedDogsProvider } from "./context/LikedDogsContext";
import { Favorites } from "./pages/Favorites/Favorites.page";
import { Login } from "./pages/Login/Login.page";
import { Search } from "./pages/Search/Search.page";
import { theme } from "./theme/theme";

import { AppShellWrapper } from "./components/AppShell/Appshell.components";
import { Match } from "./pages/Match/Match.page";

function App() {
  return (
    <MantineProvider theme={theme}>
      <AuthProvider>
        <LikedDogsProvider>
          <BrowserRouter basename="/Fetch-A-Friend">
            <Routes>
              <Route path="/" element={<Login />} />
              <Route
                path="/search"
                element={<AppShellWrapper page={<Search />} />}
              />
              <Route
                path="/favorites"
                element={<AppShellWrapper page={<Favorites />} />}
              />
              <Route
                path="/match"
                element={<AppShellWrapper page={<Match />} />}
              />
            </Routes>
          </BrowserRouter>
        </LikedDogsProvider>
      </AuthProvider>
    </MantineProvider>
  );
}

export default App;
