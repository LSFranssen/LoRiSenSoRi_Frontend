import React, { Component } from "react";
import { Route, Switch, withRouter, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import aSyncComponent from "./hoc/aSyncComponent/aSyncComponent";

import Layout from "./hoc/Layout/Layout";
import Auth from "./containers/Auth/Auth";
import Logout from "./containers/Auth/Logout/Logout";
import PageNotFound from "./components/Error/PageNotFound"
import * as actions from "./store/actions/index";

const aSyncTanks = aSyncComponent(() => {
  return import("./containers/Tanks/Tanks");
});

const aSyncAddTank = aSyncComponent(() => {
  return import("./containers/Tanks/Tank/AddTank/AddTank");
});

const aSyncUsers = aSyncComponent(() => {
  return import("./containers/Users/Users");
});

const aSyncAddUser = aSyncComponent(() => {
  return import("./containers/Users/User/AddUser/AddUser");
});

const aSyncCompanies = aSyncComponent(() => {
  return import("./containers/Companies/Companies");
});

const aSyncAddCompany = aSyncComponent(() => {
  return import("./containers/Companies/Company/AddCompany/AddCompany");
});

const aSyncOverview = aSyncComponent(() => {
  return import("./containers/Tanks/Overview/Overview");
});

const aSyncHome = aSyncComponent(() => {
  return import("./containers/Home/Home");
});

const aSyncContact = aSyncComponent(() => {
  return import("./components/Contact/Contact");
});

class App extends Component {
  componentDidMount() {
    this.props.tryAutoLogin();
  }

  render() {
    let routes = (
      <Switch>
        <Route path="/authenticate"  component={Auth} />
        <Route path="/overige" exact component={aSyncContact} />
        <Route component={PageNotFound} /> 
      </Switch>
      //errorhandler maken
    );
    if (this.props.isAuthenticated) {
      routes = (
        <Switch>
          <Route path="/home" exact component={aSyncHome} />
          <Route path="/logout"  component={Logout} />
          <Route path="/tanks" exact component={aSyncTanks} />
          <Route path="/companies" exact component={aSyncCompanies} />

          <Route path="/users" exact component={aSyncUsers} />
          <Route path="/overige" exact component={aSyncContact} />
          <Route path="/tanks/overview/:tankId" exact component={aSyncOverview} />
          <Route path="/tanks/add-tank" exact component={aSyncAddTank} />
          <Route path="/tanks/edit-tank/:tankId" exact component={aSyncAddTank} />
          <Route path="/users/:userId" component={aSyncAddUser} />
          <Route path="/companies/:companyId" component={aSyncAddCompany} />

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

export default withRouter(connect(mapStateToProps,mapDispatchToProps)(App)
);
