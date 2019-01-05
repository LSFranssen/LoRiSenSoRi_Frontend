import React, { Component } from "react";
import { connect } from "react-redux";
import classes from "./Layout.css";
import Toolbar from "../../components/Navigation/Toolbar/Toolbar";
//import Footer from '../Layout/Footer/Footer';
import Sidebar from "../../components/Navigation/Sidebar/Sidebar";

class Layout extends Component {
  state = {
    showSidebar: false
  };

  SidebarClosedHandler = () => {
    this.setState({ showSidebar: false });
  };

  ToggleHandler = () => {
    this.setState(prevState => {
      return { showSidebar: !prevState.showSidebar };
    });
  };

  render() {
    return (
      <>
        <Toolbar
          isAuth={this.props.isAuthenticated}
          togglerClicked={this.ToggleHandler}
        />
        <Sidebar
          isAuth={this.props.isAuthenticated}
          open={this.state.showSidebar}
          closed={this.SidebarClosedHandler}
        />
        <main className={classes.Content}>{this.props.children}</main>
      </>
    );
  }
}

const mapStateToProps = state => {
  return {
    isAuthenticated: state.auth.token !== null
  };
};

export default connect(mapStateToProps)(Layout);
