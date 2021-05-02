import { BrowserRouter, Route } from "react-router-dom";

import { StationProvider } from "./contexts/StationProvider";
import ProgramsPage from "./pages/ProgramsPage";
import Navbar from "./components/Navbar";
import HomePage from "./pages/HomePage";
import CategoryPage from "./pages/CategoryPage";
import ProgramsByCategoryPage from "./pages/ProgramsByCategoryPage";
import ProgramPage from "./pages/ProgramPage";
import SchedulePage from "./pages/SchedulePage";
import RegisterPage from "./pages/RegisterPage";
import LoginPage from "./pages/LoginPage"
import { UserProvider } from "./contexts/UserContext";


const App = () => {
  return (
    <div className="App">
      <BrowserRouter>
        <StationProvider>
          <UserProvider>
            <Navbar />
            <Route exact path="/" component={HomePage} />
            <Route exact path="/schedule/:channelId" component={SchedulePage} />
            <Route exact path="/categories" component={CategoryPage} />
            <Route exact path="/channel/:channelId" component={ProgramsPage} />
            <Route exact path="/programs/:programId" component={ProgramPage} />
            <Route exact path="/programs/category/:categoryId" component={ProgramsByCategoryPage} />
            <Route exact path="/register" component={RegisterPage} />
            <Route exact path="/login" component={LoginPage} />
          </UserProvider>
        </StationProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;
