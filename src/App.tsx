import { DEFAULT_THEME, MantineProvider } from "@mantine/core";
import "@mantine/core/styles.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import { AuthProvider } from "./context/AuthContext";
import { LikedDogsProvider } from "./context/LikedDogsContext";
import { Favorites } from "./pages/Favorites/Favorites.page";
import { Login } from "./pages/Login/Login.page";
import { Search } from "./pages/Search/Search.page";
// import { theme } from "./theme";
import { Match } from "./pages/Match/Match.page";
import ProtectedRoute from "./components/ProtectedRoutes/ProtectedRoutes.component";

function App() {
  return (
    <MantineProvider theme={DEFAULT_THEME}>
      <AuthProvider>
        <LikedDogsProvider>
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Login />} />
              <Route element={<ProtectedRoute />}>
                <Route path="/search" element={<Search />} />
                <Route path="/favorites" element={<Favorites />} />
                <Route path="/match" element={<Match />} />
              </Route>
            </Routes>
          </BrowserRouter>
        </LikedDogsProvider>
      </AuthProvider>
    </MantineProvider>
  );
}

export default App;
