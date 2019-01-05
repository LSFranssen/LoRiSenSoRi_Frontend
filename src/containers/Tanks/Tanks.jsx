import React, { Component } from "react";
// import { Route } from "react-router-dom";

import classes from "./Tanks.css";
import Button from "../../components/Common/Button/Button";
// import AddTank from "./Tank/AddTank/AddTank";
import axios from "../../axios-users";
import withErrorHandler from "../../hoc/withErrorHandler/withErrorHandler";
import Tank from "./Tank/Tank";
import Spinner from "../../components/Common/Spinner/Spinner";
import Search from "../../components/Common/Search/Search";

class Tanks extends Component {
  state = {
    tanks: [],
    loading: true,
    error: false,
  };

  componentDidMount() {
    axios
      .get("/tanks.json")
      .then(tanks => {
        const fetchedTanks = [];
        for (let key in tanks.data) {
          fetchedTanks.push({
            ...tanks.data[key],
            id: key
          });
        }
        this.setState({ loading: false, tanks: fetchedTanks });
      })
      .catch(error => {
        this.setState({ loading: false });
      });
  }

  overviewHandler = () => {
    this.props.history.push("/overzicht");
  }

  addingTankHandler = () => {
    this.props.history.push({pathname: this.props.match.url + "/add-tank"});
  };

  editTankHandler = (id) => {
    this.props.history.push({pathname: this.props.match.url + "/edit-tank/" + id});
  }

  removeTankHandler = (id) => {
    axios
      .delete("tanks/" + id)
      .then(response => {
        console.log(response);
        this.setState({ loading: false });
      })
      .catch(error => {
        this.setState({ loading: false });
      });
  };

  render() {
    let tanks = <Spinner />;
    if (!this.state.loading) {
      tanks = this.state.tanks.map(tank => {
        return (
          <Tank
            key={tank.id}
            id={tank.id}
            tanknaam={tank.tankData.tanknaam}
            status={tank.tankData.status}
            overview={this.overviewHandler}
            editTank={() => this.editTankHandler(tank.id)}
            removeTank={()=> this.removeTankHandler(tank.id)}
          />
        );
      });
    }

    return (
      <div className={classes.Tanks}>
        <h3>Tanks</h3>
        <div className={classes.Div}>
          <Button clicked={this.addingTankHandler} name="Toevoegen">
            Toevoegen
          </Button>
          <Search />
          </div>
          {tanks}
          {/* <Route
            path={this.props.history.push + "/addTank"}
            render={() => <AddTank />}
          /> */}
        </div>
    );
  }
}

export default withErrorHandler(Tanks, axios);

