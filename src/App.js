import React from 'react';
import Details from './component/Details';
import Main from './component/Main';
import NotFound from './component/NotFound';
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

function App() {
  return (
    <div>
      <Router>
        <Link to="/" onClick={() => {if(window.location.pathname=="/"){window.location.reload()}}}><button>Home</button></Link>
        <Switch>
          <Route path="/Details/:name">
            <Details />
          </Route>
          <Route exact path="/">
            <Main />
          </Route>
          <Route path="*" >
            <NotFound />
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
