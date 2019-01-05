// import React, { Component } from "react";
// import axios from "axios";

// class EditUser extends Component {
//     state = {
//         loadedUser: null
//     }

//     componentDidUpdate () {
//         if (this.props.id) {
//             if (!this.state.loadedUser || (this.state.loadedUser && this.state.loadedUser.id !== this.props.id)) {
//                 axios.get ("https://test-lori-backend.firebaseio.com/users/-LUGpNczvVCNWtFohQHN")
//                 .then (response => {
//                     console.log("response");
//                     console.log(response);
//                     this.setState ({loadedUser: response.data});
//                 })
//             }
//         }
//     }

//     render() {
//         let user = <p>User</p>
//         if (this.props.id) {
//             user = <p>Loading</p>
//         }
//         if (this.state.loadedUser) {
//             user = (
//                 <div>{this.state.loadedUser.data}</div>
//             );
            
//         }
//         return user;
//     }
// }

// export default EditUser;