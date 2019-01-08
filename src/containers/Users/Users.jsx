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

  editUserHandler = id => {
    this.props.history.push({pathname: this.props.match.url + "/edit-user/" + id
    });
  };

  removeUserHandler = (id) => {
    this.props.onDeleteUser(id);
    console.log(id);
  };

  render() {
    let users = <Spinner />;
    if (!this.props.loading) {
      users = this.props.users.map(user => {
        return (
          <User
            key={user.id}
            id={user.id}
            voornaam={user.userData.voornaam}
            achternaam={user.userData.achternaam}
            rechten={user.userData.rechten}
            editUser={() => this.editUserHandler(user.id)}
            removeUser={() => this.removeUserHandler(user.id)}
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
    onDeleteUser: (id) => dispatch(actions.deleteUser(id))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(Users, axios));












// import React, { Component } from "react";
// //import { Route, Link } from "react-router-dom";
// // import { connect } from 'react-redux';

// import classes from "./Users.css";
// import Button from "../../components/Common/Button/Button";
// //import AddUser from "./User/AddUser/AddUser";
// import axios from "../../axios-users";
// import withErrorHandler from "../../hoc/withErrorHandler/withErrorHandler";
// import User from "./User/User";
// import Spinner from "../../components/Common/Spinner/Spinner";
// // import * as actionTypes from "../../store/actions/actionTypes";
// import Search from "../../components/Common/Search/Search";

// class Users extends Component {
//   state = {
//     users: [],
//     loading: true,
//     error: false,
//     addingUser: true,
//     // searchUserText: "",
//     // searchResult: []
//   };

//   componentDidMount() {
//     axios
//       .get("/users.json")
//       .then(users => {
//         const fetchedUsers = [];
//         for (let key in users.data) {
//           fetchedUsers.push({
//             ...users.data[key],
//             id: key
//           });
//           console.log("fetched users");
//           console.log(fetchedUsers);
//         }
//         this.setState({ loading: false, users: fetchedUsers });
//         console.log("users.data:");
//         console.log(users.data);
//       })
//       .catch(error => {
//         this.setState({ loading: false });
//       });
//   }

//   addingUserHandler = () => {
//     this.props.history.push({pathname: this.props.match.url + "/add-user"});
//     this.setState({ addingUser: true });
//   };

//   editUserHandler = (id) => {
//     this.props.history.push({pathname: this.props.match.url + "/edit-user/" + id});
//     this.setState({ addingUser: false, });
//   };

//   removeUserHandler = (id) => {
//     axios
//       .delete("users/" + id)
//       .then(response => {
//         console.log(response);
//         this.setState({ loading: false });
//       })
//       .catch(error => {
//         this.setState({ loading: false });
//       });
//   };

//   render() {
//     let users = <Spinner />;
//     if (!this.state.loading) {
//       users = this.state.users.map(user => {
//         return (
//           <User
//             key={user.id}
//             id={user.id}
//             voornaam={user.userData.voornaam}
//             achternaam={user.userData.achternaam}
//             rechten={user.userData.rechten}
//             editUser={() => this.editUserHandler (user.id)}
//             removeUser={() => this.removeUserHandler (user.id)}
//           />
//         );
//       });
//     }

//     return (
//       <div className={classes.Users}>
//         <h3>Gebruikers</h3>
//         <div className={classes.Div}>
//           <Button clicked={this.addingUserHandler} name="Toevoegen">Toevoegen</Button>
//           <Search changed={this.searchResult} />
//         </div>
//         {/* {this.returnUsers().map({ users })} */}
//         {users}
//         {/* <section><EditUser id={this.state.selectedUserId}/></section> */}
//         {/* <Route
//           path={this.props.history.push + "/addUser"}
//           render={() => <AddUser />}
//         /> */}
//       </div>
//     );
//   }
// }

// export default withErrorHandler(Users, axios);

// handleSearch = (event, searchText) => {
//   this.setState({ searchResult: [], searchText: searchText });
//   this.state.users.map(user => {
//     if (searchUser(user, searchText)) {
//       this.setState(prevState => ({
//         searchResult: [...prevState.searchResult, user]
//       }));
//     }
//   });
// }

// handleSearch = (event) => {
//   const foundUsers = {
//     ...this.state.users
//   };
//   const foundUsersElement = {
//     ...foundUsers
//   };
//   foundUsersElement.value = event.target.value;
//   this.setState({ users: foundUsersElement });
// };

// returnUsers() {
//   return this.state.searchText ? this.state.searchResult : this.state.users;
// }

// const searchUser = (user, searchText) =>
//   user.firstName.toLowerCase().search(searchText.toLowerCase()) !== -1 ||
//   user.lastName.toLowerCase().search(searchText.toLowerCase()) !== -1 ||
//   user.rechten.toString().search(searchText) !== -1;

// addingUserHandler = () => {
//   this.props.history.push("/addUser");
//   this.setState({ addingUser: true });
// };

// // wijzigen!
// editUserHandler = () => {
//   this.props.history.push("/addUser");
//   this.setState({ addingUser: false });
// };
