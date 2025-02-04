import { MantineProvider } from "@mantine/core";
import "@mantine/core/styles.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import { AuthProvider } from "./context/AuthContext";
import { LikedDogsProvider } from "./context/LikedDogsContext";
import { Login } from "./pages/Login/Login.page";
import { Search } from "./pages/Search/Search.page";
import { theme } from "./theme";
import { Favorites } from "./pages/Favorites/Favorites.page";


function App() {
  return (
    <MantineProvider theme={theme}>
      <AuthProvider>
        <LikedDogsProvider>
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Login />} />
              <Route path="/search" element={<Search />} />
              <Route path="/favorites" element={<Favorites />} />
              <Route path="/match" element={<div> match</div>} />
            </Routes>
          </BrowserRouter>
        </LikedDogsProvider>
      </AuthProvider>
    </MantineProvider>
  );
}

export default App;
