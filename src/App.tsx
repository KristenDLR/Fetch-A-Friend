import '@mantine/core/styles.css';
import { MantineProvider } from "@mantine/core";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import { AuthProvider } from "./context/AuthContext";
import { Login } from "./pages/Login/Login.page";
import { Search } from "./pages/Search/Search.page";
import { theme } from "./theme";

function App() {
  return (
    <MantineProvider theme={theme}>
      <AuthProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/search" element={<Search />} />
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </MantineProvider>
      );
    }

    export default App;