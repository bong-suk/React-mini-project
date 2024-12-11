import "./App.css";
import AppRoutes from "./routes";
import useAuthSession from "./hooks/useAuthSession";

function App() {
  useAuthSession();

  return <AppRoutes />;
}

export default App;
