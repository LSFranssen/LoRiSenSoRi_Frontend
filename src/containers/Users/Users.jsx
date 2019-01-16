import React, { Component } from "react";
import { connect } from "react-redux";

import classes from "./Users.css";
import Button from "../../components/Common/Button/Button";
import axios from "../../axios-users";
import withErrorHandler from "../../hoc/withErrorHandler/withErrorHandler";
import User from "./User/User";
import Spinner from "../../components/Common/Spinner/Spinner";
import * as actions from "../../store/actions/index";
import Search from "../../components/Common/Search/Search";

class Users extends Component {

  componentDidMount() {
    this.props.onFetchUsers();
  }

  addingUserHandler = () => {
    this.props.history.push({ pathname: this.props.match.url + "/add-user" });
  };

  editUserHandler = (userId) => {
    this.props.history.push({pathname: this.props.match.url + "/edit-user/" + userId
    });
  };

  removeUserHandler = (userId) => {
    this.props.onDeleteUser(userId);
    console.log(userId);
  };

  render() {
    let users = <Spinner />;
    if (!this.props.loading) {
      users = this.props.users.map(user => {
        return (
          <User
            key={user.userId}
            userId={user.userId}
            voornaam={user.userData.voornaam}
            achternaam={user.userData.achternaam}
            rechten={user.userData.rechten}
            editUser={() => this.editUserHandler(user.userId)}
            removeUser={() => this.removeUserHandler(user.userId)}
          />
        );
      });
    }

    return (
      <div className={classes.Users}>
        <h3>Gebruikers</h3>
        <div className={classes.Div}>
          <Button clicked={this.addingUserHandler} name="Toevoegen">
            Toevoegen
          </Button>
          <Search changed={this.searchResult} />
        </div>
        {users}
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    users: state.users.users,
    loading: state.users.loading
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onFetchUsers: () => dispatch(actions.fetchUsers()),
    onDeleteUser: (userId) => dispatch(actions.deleteUser(userId))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(Users, axios));