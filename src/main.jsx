import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import "./index.css";
import { SupabaseProvider } from "./contexts/useSupabaseAuth";
import { UserProvider } from "./contexts/UserContext";
import { MovieListProvider } from "./contexts/MovieListContext.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <SupabaseProvider>
      <UserProvider>
        <MovieListProvider>
          <App />
        </MovieListProvider>
      </UserProvider>
    </SupabaseProvider>
  </BrowserRouter>
);
