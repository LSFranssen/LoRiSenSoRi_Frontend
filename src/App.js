import React, { Component } from "react";
import { Route, Switch, withRouter, Redirect } from "react-router-dom";
import { connect } from "react-redux";

import Layout from "./hoc/Layout/Layout";
import Home from "./containers/Home/Home";
import Users from "./containers/Users/Users";
import AddUser from "./containers/Users/User/AddUser/AddUser";
import Contact from "./components/Contact/Contact";
import Companies from "./containers/Companies/Companies";
import AddCompany from "./containers/Companies/Company/AddCompany/AddCompany";
import Tanks from "./containers/Tanks/Tanks";
import AddTank from "./containers/Tanks/Tank/AddTank/AddTank";
import Overview from "./containers/Tanks/Tank/Overview/Overview";
import Auth from "./containers/Auth/Auth";
import Logout from "./containers/Auth/Logout/Logout";
import PageNotFound from "./components/Error/PageNotFound"
import * as actions from "./store/actions/index";

class App extends Component {
  componentDidMount() {
    this.props.tryAutoLogin();
  }

  render() {
    let routes = (
      <Switch>
        <Route path="/authenticate"  component={Auth} />
        <Route path="/overige" exact component={Contact} />
        <Route component={PageNotFound} /> 
      </Switch>
      //errorhandler maken
    );
    if (this.props.isAuthenticated) {
      routes = (
        <Switch>
          <Route path="/home" exact component={Home} />
          <Route path="/logout"  component={Logout} />
          <Route path="/tanks" exact component={Tanks} />
          <Route path="/companies" exact component={Companies} />
          <Route path="/users" exact component={Users} />
          <Route path="/overige" exact component={Contact} />

          <Route path="/tanks/:id" component={AddTank} />
          <Route path="/users/:id" component={AddUser} />
          <Route path="/companies/:id" component={AddCompany} />
        
          <Route path="/overview" exact component={Overview} />

          <Redirect to="/home" />
        </Switch>
      );
    }
    return (
      <div>
        <Layout>{routes}</Layout>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    isAuthenticated: state.auth.token !== null
  };
};

const mapDispatchToProps = dispatch => {
  return {
    tryAutoLogin: () => dispatch(actions.authCheckState())
  };
};

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(App)
);


          // {/* <Route path="/addTank" component={AddTank} /> */}
          // {/* <Route path="/addUser" component={AddUser} /> */}
          // {/* <Route path="/addCompany" component={AddCompany} /> */}