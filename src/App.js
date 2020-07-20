import React from 'react';
import { createGlobalStyle } from 'styled-components';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import HomePage from './pages/HomePage';
import Stats from './pages/Stats'
import {
  Jumbotron,
  Navbar,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
} from 'reactstrap';

const GlobalStyle = createGlobalStyle`
  @import url('https://fonts.googleapis.com/css?family=Roboto+Mono&display=swap');
  body {
    font-family: 'Roboto Mono' !important;
  }
  .list-group{
    max-height: 500px;
    margin-bottom: 10px;
    overflow-y:scroll;
    -webkit-overflow-scrolling: touch;
}
`;

function App() {
  return (
    <div>
      <GlobalStyle />

      <Router>
        <Jumbotron className="p-0 pb-5 m-0 min-vh-100" >
          <Navbar color="light" light expand="md" >
            <NavbarBrand className="mr-auto" href="/">Titus Ltd Expense Claims</NavbarBrand>
            <Nav className="ml-auto" navbar>
              <NavItem>
                <NavLink href="/">Expenses</NavLink>
              </NavItem>
              <NavItem>
                <NavLink href="/stats">Monthly Statistics</NavLink>
              </NavItem>
            </Nav>
          </Navbar>
          <Switch >
            <Route exact path="/">
              <HomePage />
            </Route>
            <Route path="/stats">
              <Stats />
            </Route>
          </Switch>
        </Jumbotron>
      </Router>
    </div>
  );
}

export default App;
