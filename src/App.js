import { StrictMode, useState } from "react";
import ReactDOM from "react-dom";
// import Pet from "./Pet";
import SearchParams from "./SearchParams";
import Details from "./Details";
import ThemeContext from "./ThemeContext";
import { BrowserRouter as Router, Route, Switch, Link } from "react-router-dom";

const App = () => {
  const theme = useState('darkblue');
  return(
    <ThemeContext.Provider value={theme}>
      <div
        className="p-0 m-0"
        style={{
          background: "url(http://pets-images.dev-apis.com/pets/wallpaperA.jpg)"
        }}
      >
        <Router>
          <header
            className="w-full pt-10 mb-10 text-center p-7 "
          >
            <Link to="/" 
              className="text-7xl text-transparent bg-no-repeat"
              style={{
                backgroundImage: "url(http://static.frontendmasters.com/resources/2019-05-02-complete-intro-react-v5/image-logo.png)",
                backgroundSize: "100%"
              }}
            > Adopt Me! </Link>
          </header>
          <Switch>
            <Route path="/details/:id">
              <Details />
            </Route>
            <Route path="/">
              <SearchParams />
            </Route>
          </Switch>
        </Router>
      </div>
    </ThemeContext.Provider>
  );
};

ReactDOM.render(
  <StrictMode>
    <App />
  </StrictMode>, 
  document.getElementById("root"));
